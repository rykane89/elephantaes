// Build-time CMS bridge.
//
// When NEXT_PUBLIC_SANITY_PROJECT_ID is set, published content is fetched
// from Sanity during `next build`. When it's missing, or a fetch fails, we
// fall back to the hardcoded defaults in content.ts, so the site always
// builds and never ships a half-empty page.

import {
  galleryPhotos as fallbackGalleryPhotos,
  tiramisuMenu as fallbackTiramisuMenu,
  collab as fallbackCollab,
  signatures as fallbackSignatures,
  testimonials as fallbackTestimonials,
  latestNewsletter as fallbackNewsletter,
  journalArchive as fallbackArchive,
  pickupHours as fallbackPickupHours,
  brand,
} from "./content";

export type GalleryPhoto = {
  src: string;
  alt: string;
  ratio: "tall" | "square" | "wide";
};

export type TiramisuItem = {
  name: string;
  description: string;
  image: string;
  imageAlt: string;
  sizes: { label: string; price: string }[];
  accent: boolean;
};

export type CollabContent = typeof fallbackCollab;

export type SignatureCard = {
  title: string;
  description: string;
  detail: string;
};

export type Testimonial = { quote: string; attribution: string };

export type StoryContent = {
  subline: string;
  paragraphs: string[];
  photo: string;
  photoAlt: string;
  testimonials: Testimonial[];
};

export type JournalContent = {
  issue: string;
  date: string;
  title: string;
  excerpt: string;
  readingTime: string;
  cover: string;
  coverAlt: string;
  link: string;
  archive: { title: string; date: string }[];
};

export type SiteSettings = {
  bakerName: string;
  phone: string;
  phoneTel: string;
  inquiryEmail: string;
  city: string;
  instagramHandle: string;
  instagramUrl: string;
  shopUrl: string;
  pickupLine: string;
  pickupHours: { day: string; hours: string }[];
};

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const apiVersion = "2025-01-01";

async function sanityQuery<T>(groq: string): Promise<T | null> {
  if (!projectId) return null;
  const url =
    `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}` +
    `?query=${encodeURIComponent(groq)}&perspective=published`;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.warn(`[cms] Sanity responded ${res.status}; using fallback content.`);
      return null;
    }
    const body = (await res.json()) as { result?: T };
    return body.result ?? null;
  } catch (err) {
    console.warn("[cms] Sanity unreachable; using fallback content.", err);
    return null;
  }
}

export async function getGalleryPhotos(): Promise<GalleryPhoto[]> {
  const result = await sanityQuery<GalleryPhoto[]>(
    `*[_type == "galleryPhoto" && defined(image.asset)] | order(order asc) {
      "src": image.asset->url,
      alt,
      ratio
    }`
  );
  if (!result || result.length === 0) return fallbackGalleryPhotos;
  return result.map((p) => ({
    src: p.src,
    alt: p.alt ?? "",
    ratio: p.ratio ?? "tall",
  }));
}

export async function getTiramisuMenu(): Promise<TiramisuItem[]> {
  const result = await sanityQuery<TiramisuItem[]>(
    `*[_type == "tiramisuFlavor" && defined(image.asset)] | order(order asc) {
      name,
      description,
      "image": image.asset->url,
      imageAlt,
      sizes[]{ label, price },
      "accent": coalesce(accent, false)
    }`
  );
  if (!result || result.length === 0) return fallbackTiramisuMenu;
  return result.map((t) => ({
    name: t.name ?? "",
    description: t.description ?? "",
    image: t.image,
    imageAlt: t.imageAlt ?? t.name ?? "",
    sizes: (t.sizes ?? []).filter((s) => s.label && s.price),
    accent: t.accent,
  }));
}

export async function getCollab(): Promise<CollabContent> {
  const result = await sanityQuery<Partial<CollabContent> & { image?: string | null }>(
    `*[_type == "collabBanner"][0] {
      "active": coalesce(active, false),
      partnerName,
      partnerHandle,
      partnerUrl,
      title,
      "window": timeWindow,
      blurb,
      flavors[]{ name, note },
      "image": image.asset->url,
      orderHref,
      orderLabel
    }`
  );
  if (!result) return fallbackCollab;
  // Merge over the fallback so a half-filled document never breaks the layout.
  const merged = { ...fallbackCollab } as CollabContent;
  for (const [k, v] of Object.entries(result)) {
    if (v !== null && v !== undefined) {
      (merged as Record<string, unknown>)[k] = v;
    }
  }
  if (Array.isArray(merged.flavors)) {
    merged.flavors = merged.flavors.filter((f) => f?.name);
  }
  return merged;
}

export async function getSignatures(): Promise<SignatureCard[]> {
  const result = await sanityQuery<SignatureCard[]>(
    `*[_type == "signatureCard"] | order(order asc) {
      title, description, detail
    }`
  );
  if (!result || result.length === 0) return fallbackSignatures;
  return result.map((s) => ({
    title: s.title ?? "",
    description: s.description ?? "",
    detail: s.detail ?? "",
  }));
}

const fallbackStory: StoryContent = {
  subline: "One pair of hands, a lot of butter.",
  paragraphs: [
    "Elephantaes started, like most good things, with a stubborn recipe and a kitchen too small for it. I bake the way I was taught — slowly, with both hands, and with a cup of strong coffee on the counter.",
    "Every order is built from real butter, seasonal fruit and flour I can trace by name. No shortcuts, no fillers, no fondant cement. Just cake that tastes the way you remember cake tasting before you grew up.",
  ],
  photo: "/gallery/alex-portrait.jpg",
  photoAlt: "Alex, founder and baker behind Elephantaes Cakes & Delicacies",
  testimonials: fallbackTestimonials,
};

export async function getStory(): Promise<StoryContent> {
  const result = await sanityQuery<{
    subline?: string | null;
    bio?: string | null;
    photo?: string | null;
    photoAlt?: string | null;
    testimonials?: Testimonial[] | null;
  }>(
    `*[_type == "storySection"][0] {
      subline,
      bio,
      "photo": photo.asset->url,
      photoAlt,
      testimonials[]{ quote, attribution }
    }`
  );
  if (!result) return fallbackStory;
  const paragraphs = result.bio
    ? result.bio.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean)
    : fallbackStory.paragraphs;
  return {
    subline: result.subline ?? fallbackStory.subline,
    paragraphs,
    photo: result.photo ?? fallbackStory.photo,
    photoAlt: result.photoAlt ?? fallbackStory.photoAlt,
    testimonials:
      result.testimonials?.filter((t) => t?.quote) ?? fallbackStory.testimonials,
  };
}

const fallbackJournal: JournalContent = {
  issue: fallbackNewsletter.issue,
  date: fallbackNewsletter.date,
  title: fallbackNewsletter.title,
  excerpt: fallbackNewsletter.excerpt,
  readingTime: fallbackNewsletter.readingTime,
  cover: "/gallery/holiday-cookie-box-closed.jpg",
  coverAlt: "Latest issue cover — holiday cookie box",
  link: fallbackNewsletter.link,
  archive: fallbackArchive,
};

export async function getJournal(): Promise<JournalContent> {
  const result = await sanityQuery<Partial<JournalContent> & { cover?: string | null }>(
    `*[_type == "journalSection"][0] {
      issue, date, title, excerpt, readingTime,
      "cover": cover.asset->url,
      archive[]{ title, date }
    }`
  );
  if (!result) return fallbackJournal;
  return {
    issue: result.issue ?? fallbackJournal.issue,
    date: result.date ?? fallbackJournal.date,
    title: result.title ?? fallbackJournal.title,
    excerpt: result.excerpt ?? fallbackJournal.excerpt,
    readingTime: result.readingTime ?? fallbackJournal.readingTime,
    cover: result.cover ?? fallbackJournal.cover,
    coverAlt: result.title ? `Latest issue cover — ${result.title}` : fallbackJournal.coverAlt,
    link: fallbackJournal.link,
    archive: result.archive?.filter((a) => a?.title) ?? fallbackJournal.archive,
  };
}

const fallbackSettings: SiteSettings = {
  bakerName: brand.bakerName,
  phone: brand.phone,
  phoneTel: brand.phoneTel,
  inquiryEmail: brand.inquiryEmail,
  city: brand.city,
  instagramHandle: brand.instagramHandle,
  instagramUrl: brand.instagramUrl,
  shopUrl: brand.shopUrl,
  pickupLine: brand.pickup,
  pickupHours: fallbackPickupHours,
};

function toTel(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
  return `+${digits}`;
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const result = await sanityQuery<Partial<SiteSettings>>(
    `*[_type == "siteSettings"][0] {
      bakerName, phone, inquiryEmail, city,
      instagramHandle, shopUrl, pickupLine,
      pickupHours[]{ day, hours }
    }`
  );
  if (!result) return fallbackSettings;
  const phone = result.phone ?? fallbackSettings.phone;
  const handle = result.instagramHandle ?? fallbackSettings.instagramHandle;
  return {
    bakerName: result.bakerName ?? fallbackSettings.bakerName,
    phone,
    phoneTel: toTel(phone),
    inquiryEmail: result.inquiryEmail ?? fallbackSettings.inquiryEmail,
    city: result.city ?? fallbackSettings.city,
    instagramHandle: handle,
    instagramUrl: `https://www.instagram.com/${handle.replace(/^@/, "")}/`,
    shopUrl: result.shopUrl ?? fallbackSettings.shopUrl,
    pickupLine: result.pickupLine ?? fallbackSettings.pickupLine,
    pickupHours:
      result.pickupHours?.filter((h) => h?.day) ?? fallbackSettings.pickupHours,
  };
}
