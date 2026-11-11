export type ProductCategoryInfo = {
  name: string;
  slug: string;
  title: string;
  metaDescription: string;
  intro: string;
  sourcingNotes: string[];
  buyerQuestions: Array<{
    question: string;
    answer: string;
  }>;
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
    buyerQuestions: [
      {
        question: "Which Tesla model and interior version does the organizer fit?",
        answer:
          "Fitment is reviewed by vehicle model, model year, market version and installation location. Buyers should provide the exact vehicle details before sampling or quotation.",
      },
      {
        question: "Can storage organizers be supplied as a coordinated range?",
        answer:
          "Yes. Console, dashboard, door-pocket, under-seat and other cabin organizers can be reviewed as a model-focused assortment, subject to the available SKUs and confirmed fitment.",
      },
      {
        question: "What can be customized for a private-label program?",
        answer:
          "Logo application, color, instructions, set configuration and retail packaging can be reviewed. Final options depend on the selected product and order requirements.",
      },
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
    buyerQuestions: [
      {
        question: "How should buyers compare Tesla interior protection products?",
        answer:
          "Compare the protected area, vehicle generation, material, surface finish, color and set contents. These details should be confirmed against the selected SKU before ordering.",
      },
      {
        question: "Are the products sold as complete interior kits?",
        answer:
          "Some items are individual protectors while others may be supplied as sets. The exact coverage and included pieces are stated and confirmed for each product quotation.",
      },
      {
        question: "Can packaging be prepared for retail distribution?",
        answer:
          "Private-label packaging, labels and instructions can be reviewed for the chosen products. Packaging specifications and commercial terms are confirmed before production.",
      },
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
    buyerQuestions: [
      {
        question: "Are Cybertruck accessories reviewed separately by product?",
        answer:
          "Yes. Storage, protection and utility accessories have different installation points and package contents, so each item is reviewed and quoted as a separate product.",
      },
      {
        question: "What fitment information is needed before sampling?",
        answer:
          "Buyers should identify the target Cybertruck version, sales market and accessory location. Installation method, hardware and included parts are then confirmed for the selected SKU.",
      },
      {
        question: "Can TINKON support a private-label Cybertruck range?",
        answer:
          "Logo, label, instruction and packaging requirements can be evaluated across selected products. Available customization depends on the product and confirmed order plan.",
      },
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
    buyerQuestions: [
      {
        question: "What vehicle information is required for interior accessories?",
        answer:
          "Provide the make, model, model year, market version and intended installation position. Vehicle-specific dimensions and mounting details are confirmed before quotation.",
      },
      {
        question: "Can buyers combine products for different vehicle models?",
        answer:
          "A mixed wholesale range can be reviewed, but each SKU keeps its own fitment, material, set contents and packaging requirements to avoid product confusion.",
      },
      {
        question: "Which sales-channel details help prepare a quotation?",
        answer:
          "Target country, retail or online channel, expected volume, packaging format and required branding help define the appropriate product and quotation scope.",
      },
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
    buyerQuestions: [
      {
        question: "How is Tesla exterior accessory fitment confirmed?",
        answer:
          "Model year, market version, mounting points and surrounding clearance are reviewed for the selected product. Sample verification may be required before bulk production.",
      },
      {
        question: "What should a buyer check in the package contents?",
        answer:
          "Confirm the number of pieces, left- and right-side parts where applicable, mounting fittings and instructions. The final set is defined by SKU.",
      },
      {
        question: "Are finish and material options the same for every item?",
        answer:
          "No. Material, texture, color and finish options vary by product and version. Available choices are reviewed against the requested SKU before quotation.",
      },
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
    buyerQuestions: [
      {
        question: "Which Rivian vehicles are covered by this category?",
        answer:
          "Only the Rivian products displayed in the current catalog are offered here. The exact model, vehicle version and protected area must be confirmed for each enquiry.",
      },
      {
        question: "How are coverage and retention checked?",
        answer:
          "Coverage area, material and the way the protector stays in position are reviewed by product and may require sample fitment before production approval.",
      },
      {
        question: "Can these products use private-label packaging?",
        answer:
          "Branding, instructions and packaging can be discussed for the selected catalog products. Availability and requirements are confirmed during quotation.",
      },
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
    buyerQuestions: [
      {
        question: "What should be confirmed for a Rivian storage organizer?",
        answer:
          "Confirm the Rivian model, vehicle version, storage location, organizer dimensions and package contents. These details are reviewed before sampling.",
      },
      {
        question: "Are all Rivian storage products available for every model?",
        answer:
          "No. Availability and fitment are limited to the products shown and their verified applications. TINKON does not generalize one organizer across unrelated vehicles.",
      },
      {
        question: "What information helps prepare a wholesale offer?",
        answer:
          "Share the target market, selected SKU, expected volume, packaging needs and branding request. Final specifications and commercial terms follow product review.",
      },
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
    buyerQuestions: [
      {
        question: "How do buyers confirm an automotive screen protector fit?",
        answer:
          "Provide the vehicle make, model, model year, market version, display position and screen size. The glass outline and cutouts are matched to the exact display before quotation.",
      },
      {
        question: "Are clear and matte finishes interchangeable?",
        answer:
          "Finish options are SKU-specific and may differ by display application. Buyers should confirm the required finish, installation kit and packaging for each vehicle version.",
      },
      {
        question: "Can TINKON prepare private-label installation kits?",
        answer:
          "Private-label packaging, instructions and installation-kit configurations can be reviewed. Final contents depend on the chosen protector and channel requirements.",
      },
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
    buyerQuestions: [
      {
        question: "How is the mounting position confirmed for Tesla holders?",
        answer:
          "The vehicle model, interior trim and intended mounting position are reviewed before sampling. Attachment method and surrounding clearance are confirmed by product.",
      },
      {
        question: "What usage details should buyers provide?",
        answer:
          "For phone or device holders, share the intended device size and use position. For hooks, describe the expected application so the relevant product can be reviewed.",
      },
      {
        question: "Can holders be supplied with custom branding?",
        answer:
          "Logo, color, set configuration and packaging requests can be evaluated. The available customization scope depends on the selected product.",
      },
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
    buyerQuestions: [
      {
        question: "What electrical information is needed for a vehicle USB hub?",
        answer:
          "Confirm the connector type, input source, required ports and target device use. Electrical ratings and output behavior must be verified for the selected version before quotation.",
      },
      {
        question: "How is vehicle compatibility checked for charging accessories?",
        answer:
          "The target vehicle, model year, market version, installation location and connection interface are reviewed. Similar-looking interiors may use different connections.",
      },
      {
        question: "Can cable and packaging configurations be customized?",
        answer:
          "Cable combinations, labels, instructions and packaging can be reviewed for wholesale programs. Final options require technical and commercial confirmation.",
      },
    ],
  },
];

export function getProductCategoryByName(name: string) {
  return productCategories.find((category) => category.name === name);
}

export function getProductCategoryBySlug(slug: string) {
  return productCategories.find((category) => category.slug === slug);
}
