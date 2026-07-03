// One-time seed: uploads the site's current photos to Sanity and creates
// documents matching lib/content.ts, so the studio starts pre-populated.
//
// Usage (from /studio, after npm install):
//   SANITY_STUDIO_PROJECT_ID=xxxx SANITY_WRITE_TOKEN=sk... node seed.mjs
//
// Get a write token at sanity.io/manage → your project → API → Tokens →
// Add token (Editor permissions). Delete the token after seeding if you like.

import { createClient } from "@sanity/client";
import { createReadStream, existsSync } from "node:fs";
import { basename, join } from "node:path";

const projectId = process.env.SANITY_STUDIO_PROJECT_ID;
const dataset = process.env.SANITY_STUDIO_DATASET || "production";
const token = process.env.SANITY_WRITE_TOKEN;

if (!projectId || !token) {
  console.error("Set SANITY_STUDIO_PROJECT_ID and SANITY_WRITE_TOKEN first.");
  process.exit(1);
}

const client = createClient({ projectId, dataset, token, apiVersion: "2025-01-01", useCdn: false });

const GALLERY_DIR = join(process.cwd(), "..", "site", "public", "gallery");

const galleryPhotos = [
  { src: "tiramisu-layers.jpg", alt: "Passion fruit honeycomb tiramisu cross-section showing layered mascarpone cream and ladyfingers", ratio: "tall" },
  { src: "vintage-piping-candles.jpg", alt: "Vintage piped birthday cake with gold candles", ratio: "tall" },
  { src: "tiramisu-duo-branded.jpg", alt: "Strawberry and Classic tiramisu side by side with Elephantaes branded packaging", ratio: "tall" },
  { src: "naked-cake-peach-florals.jpg", alt: "Naked tier cake with peach garden florals on a wood slice", ratio: "tall" },
  { src: "baby-shower-cookies.jpg", alt: "Hand-iced baby shower cookies", ratio: "wide" },
  { src: "tiramisu-trio-honey.jpg", alt: "Three passion fruit honeycomb tiramisus in warm light", ratio: "wide" },
  { src: "holiday-cookie-box-open.jpg", alt: "Open holiday cookie box with festive sugar cookies", ratio: "tall" },
  { src: "blueberry-cheesecake.jpg", alt: "Blueberry top-down cheesecake with edible flowers", ratio: "tall" },
  { src: "koala-tier-cake.jpg", alt: "Koala-themed two-tier birthday cake", ratio: "square" },
  { src: "feather-pearl-cake-pops.jpg", alt: "Feather and pearl petite cake pops", ratio: "tall" },
  { src: "pink-rose-gold-leaf-cake.jpg", alt: "Naked cake with gold leaf and pink garden roses", ratio: "tall" },
  { src: "mouse-ballerina-cake.jpg", alt: "Buttercream meadow cake with sugar mouse ballerina", ratio: "tall" },
  { src: "winter-forest-cake.jpg", alt: "Winter forest cake with gold ornaments and a deer", ratio: "tall" },
  { src: "encanto-cake.jpg", alt: "Encanto-themed character birthday cake", ratio: "square" },
  { src: "sugar-flowers-macro.jpg", alt: "Macro of hand-piped sugar flowers", ratio: "square" },
];

const tiramisuMenu = [
  {
    name: "Classic Italian",
    description: "The original. Espresso-soaked ladyfingers, mascarpone cream, dusted dark cocoa.",
    image: "tiramisu-classic.jpg",
    imageAlt: "Classic Italian tiramisu with cocoa-dusted Elephantaes branded top",
    sizes: [
      { label: "10 oz", price: "$8" },
      { label: "20 oz", price: "$14" },
    ],
    accent: false,
  },
  {
    name: "Strawberry",
    description: "Strawberry purée swap for the espresso. Light, bright, surprisingly summery.",
    image: "tiramisu-strawberry.jpg",
    imageAlt: "Strawberry tiramisu with strawberry slice and Elephantaes branded top",
    sizes: [
      { label: "10 oz", price: "$9" },
      { label: "20 oz", price: "$16" },
    ],
    accent: false,
  },
  {
    name: "Passion Fruit Honeycomb",
    description: "Spring release. Passion-fruit-soaked ladyfingers, honey mascarpone, raw honeycomb on top.",
    image: "tiramisu-passionfruit.jpg",
    imageAlt: "Passion fruit honeycomb tiramisu with golden honeycomb texture",
    sizes: [
      { label: "10 oz", price: "$12" },
      { label: "20 oz", price: "$18" },
    ],
    accent: true,
  },
];

const collabBanner = {
  active: true,
  partnerName: "Mr Rabbit",
  partnerHandle: "mrrabbitphilly",
  partnerUrl: "https://www.instagram.com/mrrabbitphilly/",
  title: "Tiramisu Collab",
  timeWindow: "This weekend only",
  blurb:
    "Three flavours, hand-built into Mr Rabbit's coffee bar. Walk in for a cup, walk out with a cup of layered honey-mascarpone something.",
  flavors: [
    { name: "Classic", note: "Espresso × Mr Rabbit espresso" },
    { name: "Strawberry", note: "Bright, summery, surprise pick" },
    { name: "Passion Fruit Honeycomb", note: "Spring release, one more weekend" },
  ],
  image: "mr-rabbit-collab.jpg",
  orderHref: "https://www.instagram.com/elephantaes.cakes/",
  orderLabel: "DM to reserve",
};

async function uploadImage(filename) {
  const path = join(GALLERY_DIR, filename);
  if (!existsSync(path)) {
    console.warn(`  ! Missing ${path}, skipping image`);
    return null;
  }
  const asset = await client.assets.upload("image", createReadStream(path), {
    filename: basename(path),
  });
  return { _type: "image", asset: { _type: "reference", _ref: asset._id } };
}

function key(prefix, i) {
  return `${prefix}-${i}`;
}

async function run() {
  console.log("Seeding gallery photos...");
  for (const [i, p] of galleryPhotos.entries()) {
    const image = await uploadImage(p.src);
    await client.createOrReplace({
      _id: `galleryPhoto-${p.src.replace(/\.[a-z]+$/, "")}`,
      _type: "galleryPhoto",
      alt: p.alt,
      ratio: p.ratio,
      order: (i + 1) * 10,
      ...(image ? { image } : {}),
    });
    console.log(`  ✓ ${p.src}`);
  }

  console.log("Seeding tiramisu menu...");
  for (const [i, t] of tiramisuMenu.entries()) {
    const image = await uploadImage(t.image);
    await client.createOrReplace({
      _id: `tiramisuFlavor-${i + 1}`,
      _type: "tiramisuFlavor",
      name: t.name,
      description: t.description,
      imageAlt: t.imageAlt,
      sizes: t.sizes.map((s, j) => ({ _key: key("size", j), _type: "object", ...s })),
      accent: t.accent,
      order: (i + 1) * 10,
      ...(image ? { image } : {}),
    });
    console.log(`  ✓ ${t.name}`);
  }

  console.log("Seeding collab banner...");
  const collabImage = await uploadImage(collabBanner.image);
  await client.createOrReplace({
    _id: "collabBanner",
    _type: "collabBanner",
    ...collabBanner,
    flavors: collabBanner.flavors.map((f, j) => ({ _key: key("flavor", j), _type: "object", ...f })),
    image: collabImage ?? undefined,
  });
  console.log("  ✓ collab banner");

  console.log("\nDone. Open the studio and everything should be there.");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
