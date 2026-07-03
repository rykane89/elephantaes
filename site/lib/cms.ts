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
