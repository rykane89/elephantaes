// Second seed: creates the new content types (bio, journal, signature cards,
// site settings) pre-filled with the site's current hardcoded content.
// Safe to run more than once (createOrReplace), but note it will overwrite
// any edits made to these specific documents in the studio.
//
// Usage (from /studio, PowerShell):
//   $env:SANITY_STUDIO_PROJECT_ID="yxd68kno"
//   $env:SANITY_WRITE_TOKEN="sk..."
//   node seed-round2.mjs

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

const signatures = [
  {
    title: "Custom Celebration Cakes",
    description:
      "Birthdays, Korean Dohl 1st birthdays, anniversaries — designed around the story, not a stock catalogue. Vintage piping, modern minimal, themed builds (yes, even Avatar).",
    detail: "From $85 · 2 weeks notice",
  },
  {
    title: "Signature Tiramisu",
    description:
      "Classic Italian, Strawberry, and rotating seasonal flavours like Passion Fruit Honeycomb. Soaked ladyfingers, honey mascarpone, layers all the way down.",
    detail: "From $8 · weekend pickup",
  },
  {
    title: "Weddings & Bridal",
    description:
      "Now booking. Vegan buttercream, multi-flavour tiers, sugar work — designed with you over a tasting and a long talk about the day.",
    detail: "Bespoke quote · book early",
  },
  {
    title: "Cookie Boxes & Minis",
    description:
      'Holiday cookie boxes with menu cards, 4" mini celebration cakes for Valentine\'s and showers, gourmet pastries for gifting.',
    detail: "Seasonal · DM to preorder",
  },
];

const story = {
  subline: "One pair of hands, a lot of butter.",
  bio:
    "Elephantaes started, like most good things, with a stubborn recipe and a kitchen too small for it. I bake the way I was taught — slowly, with both hands, and with a cup of strong coffee on the counter.\n\n" +
    "Every order is built from real butter, seasonal fruit and flour I can trace by name. No shortcuts, no fillers, no fondant cement. Just cake that tastes the way you remember cake tasting before you grew up.",
  photo: "alex-portrait.jpg",
  photoAlt: "Alex, founder and baker behind Elephantaes Cakes & Delicacies",
  testimonials: [
    {
      quote:
        "Honored doesn't cover it. She walked me through every detail of our daughter's Dohl — colour, symbolism, flavour — and made something my whole family is still talking about.",
      attribution: "Ji-won, Dohl 1st birthday · Philly",
    },
    {
      quote:
        "She nailed a vegan buttercream tier for our wedding when three other bakers said it couldn't be done. The cake tasted better than anything I expected.",
      attribution: "Maya & Theo, wedding 2025",
    },
  ],
};

const journal = {
  issue: "Issue 14",
  date: "April 2026",
  title: "On tiramisu, restraint, and the perfect mascarpone cream",
  excerpt:
    "The OGs are back this weekend — Classic Italian and Strawberry on the menu, plus the spring Passion Fruit Honeycomb. Notes from the test kitchen on how I finally got the cream to set without going grainy, and why I stopped over-soaking the ladyfingers.",
  readingTime: "6 min read",
  cover: "holiday-cookie-box-closed.jpg",
  archive: [
    { title: "Designing the Korean Dohl: a first birthday, a thousand small choices", date: "Mar 2026" },
    { title: "Vegan buttercream, finally — the bridal version", date: "Feb 2026" },
    { title: "Vintage piping, and the cake I keep redoing on my birthday", date: "Jan 2026" },
  ],
};

const settings = {
  bakerName: "Alex",
  phone: "(267) 414-7861",
  inquiryEmail: "hello@elephantaes.com",
  city: "Philadelphia, PA",
  instagramHandle: "elephantaes.cakes",
  shopUrl: "https://elephantaes.square.site",
  pickupLine: "Pickup · Sat 9–12 · Sun 2–5",
  pickupHours: [
    { day: "Saturday", hours: "9 AM — 12 PM" },
    { day: "Sunday", hours: "2 PM — 5 PM" },
  ],
};

function key(prefix, i) {
  return `${prefix}-${i}`;
}

async function run() {
  console.log("Seeding signature cards...");
  for (const [i, s] of signatures.entries()) {
    await client.createOrReplace({
      _id: `signatureCard-${i + 1}`,
      _type: "signatureCard",
      ...s,
      order: (i + 1) * 10,
    });
    console.log(`  ✓ ${s.title}`);
  }

  console.log("Seeding bio (story section)...");
  const storyPhoto = await uploadImage(story.photo);
  await client.createOrReplace({
    _id: "storySection",
    _type: "storySection",
    subline: story.subline,
    bio: story.bio,
    photoAlt: story.photoAlt,
    testimonials: story.testimonials.map((t, j) => ({ _key: key("t", j), _type: "object", ...t })),
    ...(storyPhoto ? { photo: storyPhoto } : {}),
  });
  console.log("  ✓ bio");

  console.log("Seeding journal...");
  const cover = await uploadImage(journal.cover);
  await client.createOrReplace({
    _id: "journalSection",
    _type: "journalSection",
    issue: journal.issue,
    date: journal.date,
    title: journal.title,
    excerpt: journal.excerpt,
    readingTime: journal.readingTime,
    archive: journal.archive.map((a, j) => ({ _key: key("a", j), _type: "object", ...a })),
    ...(cover ? { cover } : {}),
  });
  console.log("  ✓ journal");

  console.log("Seeding site settings...");
  await client.createOrReplace({
    _id: "siteSettings",
    _type: "siteSettings",
    ...settings,
    pickupHours: settings.pickupHours.map((h, j) => ({ _key: key("h", j), _type: "object", ...h })),
  });
  console.log("  ✓ site settings");

  console.log("\nDone. Refresh the studio — four new sections should be filled in.");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
