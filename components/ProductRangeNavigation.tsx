import Link from "next/link";
import { getProductCategoryBySlug } from "@/data/productCategories";

const groups = [
  { title: "Car organizers & storage", slugs: ["tesla-storage-organization", "rivian-storage-organization"] },
  { title: "Interior protection & comfort", slugs: ["tesla-interior-protection", "rivian-interior-protection", "automotive-interior-accessories"] },
  { title: "Hooks & holders", slugs: ["tesla-hooks-holders"] },
  { title: "Charging accessories", slugs: ["vehicle-charging-accessories"] },
  { title: "Exterior & Cybertruck", slugs: ["tesla-exterior-protection", "tesla-cybertruck-accessories"] },
  { title: "Screen protection", slugs: ["automotive-screen-protectors"] },
];

export default function ProductRangeNavigation() {
  return (
    <nav className="range-nav" aria-label="Product categories">
      {groups.map(({ title, slugs }) => (
        <div className="range-group" key={title}>
          <p>{title}</p>
          <ul>
            {slugs.map((slug) => {
              const category = getProductCategoryBySlug(slug);
              return category && <li key={slug}><Link href={`/products/category/${slug}`}>{category.name}<span aria-hidden="true">↗</span></Link></li>;
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
