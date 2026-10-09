export type ProductCategoryInfo = {
  name: string;
  slug: string;
  title: string;
  metaDescription: string;
  intro: string;
  sourcingNotes: string[];
};

export const productCategories: ProductCategoryInfo[] = [
  {
    name: "Tesla Storage & Organization",
    slug: "tesla-storage-organization",
    title: "Wholesale Tesla Storage & Organization Accessories",
    metaDescription:
      "Browse TINKON wholesale Tesla storage organizers, console trays, under-seat boxes and interior storage accessories with OEM and ODM support.",
    intro:
      "Build a model-focused Tesla storage range with organizers for consoles, dashboards, door pockets, seats and other usable cabin spaces. Each product is reviewed by vehicle version before quotation so distributors can plan a clearer assortment and reduce fitment uncertainty.",
    sourcingNotes: [
      "Vehicle and console version reviewed before sampling",
      "Material, color and set configuration confirmed by SKU",
      "Private-label logo, instructions and packaging available on request",
    ],
  },
  {
    name: "Tesla Interior Protection",
    slug: "tesla-interior-protection",
    title: "Wholesale Tesla Interior Protection Accessories",
    metaDescription:
      "Source wholesale Tesla floor mats, console covers, screen frames, sill protectors and cabin protection accessories from TINKON.",
    intro:
      "Create a coordinated Tesla interior protection program across floor, console, display, sill, seat and cargo areas. TINKON presents compatible options conservatively and confirms the selected vehicle, material and coverage before sampling or bulk quotation.",
    sourcingNotes: [
      "Coverage and vehicle generation confirmed for each application",
      "Surface finish, material and color options reviewed before order",
      "OEM branding and retail-ready packaging can be developed",
    ],
  },
  {
    name: "Tesla Cybertruck Accessories",
    slug: "tesla-cybertruck-accessories",
    title: "Wholesale Tesla Cybertruck Accessories",
    metaDescription:
      "Explore TINKON wholesale Tesla Cybertruck storage, protection and utility accessories for distributors and private-label programs.",
    intro:
      "Plan a focused Cybertruck accessory range for storage, bed utility and vehicle protection. Product pages separate each accessory so buyers can review the relevant application, package scope and fitment questions before requesting samples or a wholesale quotation.",
    sourcingNotes: [
      "Each accessory is quoted as a separate product and configuration",
      "Installation method and included hardware confirmed before order",
      "Custom labels, instructions and packaging available on request",
    ],
  },
  {
    name: "Automotive Interior Accessories",
    slug: "automotive-interior-accessories",
    title: "Wholesale Automotive Interior Accessories",
    metaDescription:
      "Browse TINKON wholesale automotive interior accessories including vehicle-specific sunshades and practical cabin products.",
    intro:
      "Source practical interior accessories for selected vehicles and overseas sales channels. TINKON reviews the target vehicle, use position and set configuration before quotation, with OEM presentation and packaging support for wholesale programs.",
    sourcingNotes: [
      "Vehicle-specific dimensions and mounting method require confirmation",
      "Set contents and material options are matched to the selected SKU",
      "OEM labels, manuals and packaging can be prepared for the channel",
    ],
  },
  {
    name: "Tesla Exterior Protection",
    slug: "tesla-exterior-protection",
    title: "Wholesale Tesla Exterior Protection Accessories",
    metaDescription:
      "Source wholesale Tesla mud flaps, trim protectors and exterior protection accessories with model-specific review and OEM support.",
    intro:
      "Develop a Tesla exterior protection assortment covering selected splash, trim and surface-protection applications. Exact model year, market version, mounting points and package contents are confirmed before bulk production.",
    sourcingNotes: [
      "Model-specific mounting and clearance checked before sampling",
      "Finish, material and included fittings confirmed by version",
      "Private-label packaging and instruction support available",
    ],
  },
  {
    name: "Rivian Interior Protection",
    slug: "rivian-interior-protection",
    title: "Wholesale Rivian Interior Protection Accessories",
    metaDescription:
      "Review TINKON wholesale Rivian interior protection accessories with application-specific fitment and OEM packaging support.",
    intro:
      "Review selected Rivian interior protection products prepared for the TINKON wholesale catalog. Vehicle fitment, coverage, material and installation details remain subject to sample confirmation before quotation and production.",
    sourcingNotes: [
      "Exact Rivian model and vehicle version confirmed before order",
      "Coverage, material and retention method reviewed by sample",
      "Publication is limited to the products shown in this catalog",
    ],
  },
  {
    name: "Rivian Storage & Organization",
    slug: "rivian-storage-organization",
    title: "Wholesale Rivian Storage & Organization Accessories",
    metaDescription:
      "Explore selected TINKON wholesale Rivian storage organizers with model-specific review and private-label packaging support.",
    intro:
      "Explore selected Rivian storage and organization products for wholesale programs. TINKON confirms the vehicle, installation location, dimensions and package contents before sampling or bulk quotation.",
    sourcingNotes: [
      "Vehicle and storage location verified before sampling",
      "Dimensions, material and set contents confirmed by SKU",
      "Publication is limited to the products shown in this catalog",
    ],
  },
  {
    name: "Automotive Screen Protectors",
    slug: "automotive-screen-protectors",
    title: "Wholesale Automotive Screen Protectors",
    metaDescription:
      "Browse TINKON wholesale automotive tempered-glass screen protectors for selected Tesla, BMW, BYD, Geely and other vehicle displays.",
    intro:
      "Build a vehicle-specific automotive screen protector range for selected center, instrument and rear displays. Screen size, outline, model year, finish and installation-kit requirements are confirmed before quotation to reduce fitment risk.",
    sourcingNotes: [
      "Display size and outline matched to the exact vehicle version",
      "Clear, matte and other finishes require SKU confirmation",
      "Private-label packaging and installation kits can be developed",
    ],
  },
  {
    name: "Tesla Hooks & Holders",
    slug: "tesla-hooks-holders",
    title: "Wholesale Tesla Hooks, Holders & Mounts",
    metaDescription:
      "Source wholesale Tesla hooks, phone holders, device mounts and practical cabin holders with OEM and ODM support from TINKON.",
    intro:
      "Offer practical hooks, phone holders and device mounts designed around selected Tesla cabin locations. Buyers can compare mounting positions and use cases, then confirm the exact vehicle, attachment method and package configuration before order.",
    sourcingNotes: [
      "Mounting position and vehicle trim checked before sampling",
      "Load, device size and included parts confirmed where applicable",
      "OEM logo, color and packaging requests are supported",
    ],
  },
  {
    name: "Vehicle Charging & Accessories",
    slug: "vehicle-charging-accessories",
    title: "Wholesale Vehicle Charging Accessories & USB Hubs",
    metaDescription:
      "Browse TINKON wholesale vehicle USB hubs, charging accessories, cable organizers and Tesla-compatible charging solutions.",
    intro:
      "Review in-vehicle USB hubs, charging accessories and cable-management products for selected Tesla and automotive applications. Electrical ratings, connector options, vehicle fitment and simultaneous-output claims are confirmed before final quotation.",
    sourcingNotes: [
      "Connector type, input and output requirements verified by version",
      "Vehicle fitment and installation method confirmed before sampling",
      "Custom cable combinations, labels and packaging require review",
    ],
  },
];

export function getProductCategoryByName(name: string) {
  return productCategories.find((category) => category.name === name);
}

export function getProductCategoryBySlug(slug: string) {
  return productCategories.find((category) => category.slug === slug);
}
