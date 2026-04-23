import { CategoryInfo, Product } from "@/lib/types";

export const CATEGORY_INFO: CategoryInfo[] = [
  {
    key: "hfd-duty",
    label: "HFD Duty",
    description: "Uniform-adjacent duty gear built for station-ready comfort and durability.",
  },
  {
    key: "hfd-explorers",
    label: "HFD Explorers",
    description: "Training and mentorship apparel for the next generation of first responders.",
  },
  {
    key: "off-duty-fire",
    label: "Off Duty Fire",
    description: "Lifestyle-first designs for fire service pride beyond the shift.",
  },
  {
    key: "gba-baseball",
    label: "GBA Baseball",
    description: "Team-inspired game day merch with bold, athletic styling.",
  },
  {
    key: "flow-iv",
    label: "Flow IV",
    description: "Tactical hydration and medic-inspired graphics for EMS-focused crews.",
  },
  {
    key: "patriot-essentials",
    label: "Patriot Essentials",
    description: "Flag-forward staples for military and first responder supporters.",
  },
];

export const DEMO_PRODUCTS: Product[] = [
  {
    id: "demo-001",
    slug: "hfd-duty-heavyweight-hoodie",
    title: "HFD Duty Heavyweight Hoodie",
    description:
      "Midweight fleece hoodie with reinforced seams and station-ready comfort for long shifts.",
    priceCents: 6200,
    currency: "USD",
    category: "hfd-duty",
    badge: "Best Seller",
    tags: ["hoodie", "duty", "firefighter"],
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80",
    ],
    featured: true,
    inStock: true,
    source: "demo",
  },
  {
    id: "demo-002",
    slug: "hfd-duty-structured-hat",
    title: "HFD Duty Structured Hat",
    description: "Curved-bill performance cap with embroidered DEFEND FREEDOM crest.",
    priceCents: 3400,
    currency: "USD",
    category: "hfd-duty",
    tags: ["hat", "embroidery", "duty"],
    image:
      "https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=1200&q=80",
    ],
    inStock: true,
    source: "demo",
  },
  {
    id: "demo-003",
    slug: "hfd-explorers-starter-tee",
    title: "HFD Explorers Starter Tee",
    description: "Soft cotton blend tee designed for recruit training days and drills.",
    priceCents: 2900,
    currency: "USD",
    category: "hfd-explorers",
    tags: ["tee", "youth", "explorers"],
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=80",
    ],
    inStock: true,
    source: "demo",
  },
  {
    id: "demo-004",
    slug: "hfd-explorers-training-pack",
    title: "HFD Explorers Training Pack",
    description:
      "Three-piece training bundle with tee, lanyard, and zip pouch for academy readiness.",
    priceCents: 5400,
    currency: "USD",
    category: "hfd-explorers",
    badge: "Bundle",
    tags: ["bundle", "academy", "explorers"],
    image:
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=1200&q=80",
    ],
    inStock: true,
    source: "demo",
  },
  {
    id: "demo-005",
    slug: "off-duty-fire-premium-crew",
    title: "Off Duty Fire Premium Crew",
    description: "Relaxed-fit crewneck with distressed graphic honoring engine company life.",
    priceCents: 5600,
    currency: "USD",
    category: "off-duty-fire",
    tags: ["crewneck", "off-duty", "fire"],
    image:
      "https://images.unsplash.com/photo-1618354691321-e851c56960d1?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1618354691321-e851c56960d1?auto=format&fit=crop&w=1200&q=80",
    ],
    featured: true,
    inStock: true,
    source: "demo",
  },
  {
    id: "demo-006",
    slug: "off-duty-fire-camo-patch-cap",
    title: "Off Duty Fire Camo Patch Cap",
    description: "Field-style cap with woven patch and breathable back mesh.",
    priceCents: 3600,
    currency: "USD",
    category: "off-duty-fire",
    tags: ["hat", "camo", "off-duty"],
    image:
      "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?auto=format&fit=crop&w=1200&q=80",
    ],
    inStock: true,
    source: "demo",
  },
  {
    id: "demo-007",
    slug: "gba-game-day-performance-tee",
    title: "GBA Game Day Performance Tee",
    description: "Athletic moisture-wicking jersey tee for game day and practice sessions.",
    priceCents: 3200,
    currency: "USD",
    category: "gba-baseball",
    tags: ["athletic", "baseball", "performance"],
    image:
      "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=1200&q=80",
    ],
    inStock: true,
    source: "demo",
  },
  {
    id: "demo-008",
    slug: "gba-diamond-duffel",
    title: "GBA Diamond Duffel",
    description: "Large-capacity duffel with reinforced straps and ventilated shoe compartment.",
    priceCents: 6900,
    currency: "USD",
    category: "gba-baseball",
    badge: "New",
    tags: ["bag", "baseball", "travel"],
    image:
      "https://images.unsplash.com/photo-1515396804471-54a6b7b2f3f8?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1515396804471-54a6b7b2f3f8?auto=format&fit=crop&w=1200&q=80",
    ],
    inStock: true,
    source: "demo",
  },
  {
    id: "demo-009",
    slug: "flow-iv-medic-ops-hoodie",
    title: "Flow IV Medic Ops Hoodie",
    description: "Warm, low-profile hoodie featuring reflective trim and IV line icon art.",
    priceCents: 6400,
    currency: "USD",
    category: "flow-iv",
    tags: ["hoodie", "ems", "medic"],
    image:
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=1200&q=80",
    ],
    featured: true,
    inStock: true,
    source: "demo",
  },
  {
    id: "demo-010",
    slug: "flow-iv-response-tee",
    title: "Flow IV Response Tee",
    description: "Soft ring-spun cotton tee with modern fit and EMS-inspired linework.",
    priceCents: 2800,
    currency: "USD",
    category: "flow-iv",
    tags: ["tee", "ems", "response"],
    image:
      "https://images.unsplash.com/photo-1583744946564-b52d01a7b321?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1583744946564-b52d01a7b321?auto=format&fit=crop&w=1200&q=80",
    ],
    inStock: true,
    source: "demo",
  },
  {
    id: "demo-011",
    slug: "patriot-flag-legacy-tee",
    title: "Patriot Flag Legacy Tee",
    description: "Classic fit tee honoring first responders and military families.",
    priceCents: 3000,
    currency: "USD",
    category: "patriot-essentials",
    tags: ["flag", "patriot", "classic"],
    image:
      "https://images.unsplash.com/photo-1622470953794-aa9c70b0fb9d?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1622470953794-aa9c70b0fb9d?auto=format&fit=crop&w=1200&q=80",
    ],
    inStock: true,
    source: "demo",
  },
  {
    id: "demo-012",
    slug: "patriot-responder-bundle",
    title: "Patriot Responder Bundle",
    description: "Value bundle with tee, hat, and decal pack for supporters and crews.",
    priceCents: 7400,
    currency: "USD",
    category: "patriot-essentials",
    badge: "Bundle",
    tags: ["bundle", "supporter", "patriot"],
    image:
      "https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?auto=format&fit=crop&w=1200&q=80",
    ],
    inStock: true,
    source: "demo",
  },
];
