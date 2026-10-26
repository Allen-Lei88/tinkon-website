import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const origin = "https://tinkontech.com";
const root = new URL("../", import.meta.url);
const target = process.env.TEST_TARGET ?? "next";
assert.ok(["next", "sites"].includes(target), `Unknown TEST_TARGET: ${target}`);
const pages = new Map();
let worker;

function decodeHtml(value) {
  return value.replace(/&(#x[\da-f]+|#\d+|amp|quot|apos|lt|gt);/gi, (_, entity) => {
    if (entity.startsWith("#")) {
      return String.fromCodePoint(entity[1].toLowerCase() === "x"
        ? Number.parseInt(entity.slice(2), 16)
        : Number.parseInt(entity.slice(1), 10));
    }
    return { amp: "&", quot: '"', apos: "'", lt: "<", gt: ">" }[entity.toLowerCase()];
  });
}

// Parse the attributes/tags needed by these tests without inspecting React's
// embedded flight payload, which also contains serialized markup strings.
function attributes(source) {
  return Object.fromEntries([...source.matchAll(/([^\s=/>]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g)]
    .map((match) => [match[1].toLowerCase(), decodeHtml(match[2] ?? match[3] ?? match[4] ?? "")]));
}

function tags(html) {
  const markup = html.replace(/(<(?:script|style)\b[^>]*>)[\s\S]*?<\/(?:script|style)>/gi, "$1");
  return [...markup.matchAll(/<([a-z][\w:-]*)\b([^<>]*?)>/gi)]
    .map((match) => ({ name: match[1].toLowerCase(), attrs: attributes(match[2]) }));
}

function elementByClass(html, tag, className) {
  return [...html.matchAll(new RegExp(`<${tag}\\b([^>]*)>([\\s\\S]*?)<\\/${tag}>`, "gi"))]
    .find((match) => (attributes(match[1]).class ?? "").split(/\s+/).includes(className))?.[2];
}

function structuredData(html) {
  return [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)]
    .filter((match) => attributes(match[1]).type === "application/ld+json")
    .map((match) => JSON.parse(match[2]));
}

function schemaNodes(html) {
  return structuredData(html).flatMap((schema) => schema["@graph"] ?? [schema]);
}

function pathOf(url) {
  const parsed = new URL(url, origin);
  assert.equal(parsed.origin, origin, `Unexpected catalog origin: ${url}`);
  return parsed.pathname;
}

async function render(path) {
  if (!pages.has(path)) {
    pages.set(path, (async () => {
      if (target === "next") {
        return readFile(new URL(`.next/server/app/${path === "/" ? "index" : path.slice(1)}.html`, root), "utf8");
      }
      worker ??= import(new URL("dist/server/index.js", root).href).then((module) => module.default);
      const response = await (await worker).fetch(
        new Request(`${origin}${path}`, { headers: { accept: "text/html" } }),
        { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
        { waitUntil() {}, passThroughOnException() {} },
      );
      assert.equal(response.status, 200, `${path} should render successfully`);
      assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
      return response.text();
    })());
  }
  return pages.get(path);
}

const catalogHtml = await render("/products");
const collection = schemaNodes(catalogHtml).find((node) => node["@type"] === "CollectionPage");
assert.ok(collection, "Catalog must have CollectionPage structured data");
const productItems = collection.mainEntity.itemListElement;
const productPaths = productItems.map((item) => pathOf(item.url));
const categoryNavigation = elementByClass(catalogHtml, "section", "catalog-category-nav");
assert.ok(categoryNavigation, "Catalog category navigation must exist");
const categoryPaths = tags(categoryNavigation).filter((tag) => tag.name === "a").map((tag) => pathOf(tag.attrs.href));
const allPaths = ["/", "/products", ...categoryPaths, ...productPaths];
const routeSet = new Set(allPaths);

function assertItemList(list, label) {
  assert.equal(list["@type"], "ItemList", label);
  assert.ok(list.itemListElement.length > 0, `${label} cannot be empty`);
  if (list.numberOfItems !== undefined) {
    assert.equal(list.numberOfItems, list.itemListElement.length, `${label} count`);
  }
  assert.deepEqual(list.itemListElement.map((item) => item.position),
    list.itemListElement.map((_, index) => index + 1), `${label} positions`);
  const urls = list.itemListElement.map((item) => item.url);
  assert.equal(new Set(urls).size, urls.length, `${label} URLs must be unique`);
}

test("catalog and homepage list the same unique, populated product range", async () => {
  assertItemList(collection.mainEntity, "Catalog");
  assert.equal(new Set(categoryPaths).size, categoryPaths.length, "Category links must be unique");
  assert.ok(categoryPaths.length > 0, "Catalog needs category links");
  assert.ok(categoryPaths.every((path) => /^\/products\/category\/[^/]+$/.test(path)));
  assert.ok(productPaths.every((path) => /^\/products\/(?!category\/)[^/]+$/.test(path)));
  const homeList = schemaNodes(await render("/")).find((node) => node["@type"] === "ItemList");
  assert.ok(homeList, "Homepage product list must exist");
  assertItemList(homeList, "Homepage");
  assert.deepEqual(homeList.itemListElement.map((item) => item.url), productItems.map((item) => item.url));
});

test("all product categories partition the catalog without missing or repeated products", async () => {
  const categorized = [];
  for (const path of categoryPaths) {
    const nodes = schemaNodes(await render(path));
    const category = nodes.find((node) => node["@type"] === "CollectionPage");
    assert.ok(category, `${path} needs CollectionPage data`);
    assert.equal(pathOf(category.url), path);
    assertItemList(category.mainEntity, path);
    const paths = category.mainEntity.itemListElement.map((item) => pathOf(item.url));
    assert.ok(paths.every((productPath) => productPaths.includes(productPath)), `${path} references unknown products`);
    categorized.push(...paths);
    const breadcrumbs = nodes.find((node) => node["@type"] === "BreadcrumbList");
    assert.equal(breadcrumbs.itemListElement.at(-1).item, `${origin}${path}`);
  }
  assert.deepEqual(categorized.sort(), [...productPaths].sort());
});

test("all product pages retain quote-only WebPage and matching breadcrumb schema", async () => {
  for (const path of productPaths) {
    const nodes = schemaNodes(await render(path));
    const page = nodes.find((node) => node["@type"] === "WebPage");
    const breadcrumb = nodes.find((node) => node["@type"] === "BreadcrumbList");
    assert.ok(page, `${path} needs WebPage data, not unsupported Product rich results`);
    assert.ok(breadcrumb, `${path} needs breadcrumbs`);
    assert.equal(page.url, `${origin}${path}`);
    assert.equal(page.breadcrumb["@id"], breadcrumb["@id"]);
    assert.deepEqual(breadcrumb.itemListElement.map((item) => item.position), [1, 2, 3, 4]);
    assert.equal(breadcrumb.itemListElement.at(-1).item, page.url);
    assert.ok(categoryPaths.includes(pathOf(breadcrumb.itemListElement[2].item)), `${path} category breadcrumb`);
  }
});

test("every generated page has one heading, canonical URL, accessible navigation and unique IDs", async () => {
  for (const path of allPaths) {
    const html = await render(path);
    const pageTags = tags(html);
    assert.equal(pageTags.filter((tag) => tag.name === "h1").length, 1, `${path}: one h1`);
    const canonicals = pageTags.filter((tag) => tag.name === "link" && tag.attrs.rel === "canonical");
    assert.equal(canonicals.length, 1, `${path}: one canonical`);
    assert.equal(pathOf(canonicals[0].attrs.href), path, `${path}: canonical target`);
    const ids = pageTags.filter((tag) => tag.attrs.id !== undefined).map((tag) => tag.attrs.id);
    assert.equal(new Set(ids).size, ids.length, `${path}: duplicate IDs`);
    const menu = elementByClass(html, "details", "mobile-nav");
    assert.ok(menu, `${path}: mobile navigation is missing`);
    assert.match(menu, /<summary\b[^>]*>Menu<\/summary>/);
    assert.ok(tags(menu).some((tag) => tag.name === "nav" && tag.attrs["aria-label"]), `${path}: labelled mobile navigation`);
    const navigationTarget = path === "/products" ? "/" : "/products";
    assert.ok(tags(menu).some((tag) => tag.name === "a" && tag.attrs.href === navigationTarget), `${path}: primary navigation link`);
    for (const image of pageTags.filter((tag) => tag.name === "img")) {
      assert.ok("alt" in image.attrs, `${path}: image needs alt attribute`);
      assert.ok(Number(image.attrs.width) > 0 && Number(image.attrs.height) > 0, `${path}: image dimensions`);
    }
    assert.doesNotMatch(JSON.stringify(structuredData(html)), /"@type":"Product"/, `${path}: do not restore unsupported Product rich results`);
    assert.doesNotMatch(html, /Your site is taking shape|Building your site|codex-preview/, `${path}: starter placeholder`);
  }
});

const assetCache = new Map();
async function exists(relativePath) {
  if (!assetCache.has(relativePath)) {
    assetCache.set(relativePath, access(new URL(relativePath, root)).then(() => true, () => false));
  }
  return assetCache.get(relativePath);
}

async function validateUrl(value, sourcePath, assetOnly = false) {
  if (!value || /^(?:data|mailto|tel):/i.test(value)) return;
  const url = new URL(value, `${origin}${sourcePath}`);
  if (url.origin !== origin) return; // External services are not contacted by these tests.
  if (["/_next/image", "/_vinext/image"].includes(url.pathname)) {
    const source = url.searchParams.get("url");
    assert.ok(source, `${sourcePath}: optimized image has no source URL`);
    return validateUrl(source, sourcePath, true);
  }
  const path = decodeURIComponent(url.pathname);
  if (!assetOnly && routeSet.has(path)) {
    if (url.hash) {
      const id = decodeURIComponent(url.hash.slice(1));
      assert.ok(tags(await render(path)).some((tag) => tag.attrs.id === id), `${sourcePath}: broken anchor ${value}`);
    }
    return;
  }
  const candidates = [`public${path}`];
  if (path.startsWith("/_next/static/")) candidates.push(`.next/static/${path.slice("/_next/static/".length)}`);
  if (target === "sites") candidates.push(`dist/client${path}`);
  assert.ok((await Promise.all(candidates.map(exists))).some(Boolean), `${sourcePath}: missing local target ${value}`);
}

test("local navigation, anchor links, image sources and build assets resolve on every page", async () => {
  for (const path of allPaths) {
    for (const tag of tags(await render(path))) {
      if (tag.name === "a" && tag.attrs.href) await validateUrl(tag.attrs.href, path);
      if (["img", "script", "source"].includes(tag.name) && tag.attrs.src) await validateUrl(tag.attrs.src, path, true);
      if (tag.name === "link" && tag.attrs.href && tag.attrs.rel !== "canonical") await validateUrl(tag.attrs.href, path, true);
      if (tag.attrs.srcset) {
        for (const candidate of tag.attrs.srcset.split(",")) {
          await validateUrl(candidate.trim().split(/\s+/)[0], path, true);
        }
      }
    }
  }
});

test("wholesale enquiry explains the email-app handoff without claiming website delivery", async () => {
  const html = await render("/");
  const form = [...html.matchAll(/<form\b([^>]*)>([\s\S]*?)<\/form>/gi)]
    .find((match) => (attributes(match[1]).class ?? "").split(/\s+/).includes("inquiry-form"));
  assert.ok(form, "Wholesale enquiry form must exist");
  assert.match(attributes(form[1]).action, /^mailto:allen@tinkontech\.com\?/);
  const text = decodeHtml(form[2].replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ");
  assert.match(text, /opens your email app/i);
  assert.match(text, /review and send the email there/i);
  assert.match(text, /email or WhatsApp/i);
});
