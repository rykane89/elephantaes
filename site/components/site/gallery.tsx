"use client";

import { motion, useReducedMotion } from "framer-motion";
import { brand } from "@/lib/content";
import type { GalleryPhoto } from "@/lib/cms";
import { Reveal } from "./reveal";
import { InstagramIcon } from "./icons";

const ratioClass: Record<"tall" | "square" | "wide", string> = {
  tall: "aspect-[4/5]",
  square: "aspect-square",
  wide: "aspect-[5/4]",
};

export function Gallery({ photos }: { photos: GalleryPhoto[] }) {
  const reduce = useReducedMotion();

  return (
    <section id="gallery" className="relative py-28 md:py-36 bg-cream-50/50">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <Reveal className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <span className="divider-leaf text-[11px] uppercase tracking-[0.32em]">
              The portfolio
            </span>
            <h2 className="mt-6 font-display text-4xl md:text-6xl text-forest-800 tracking-tight text-balance">
              Recent work,
              <span className="italic font-light"> one slice at a time.</span>
            </h2>
          </div>
          <a
            href={brand.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-forest-700 hover:text-forest-800 transition-colors group"
          >
            <InstagramIcon className="h-4 w-4" />
            <span className="underline decoration-forest-700/30 underline-offset-4 group-hover:decoration-forest-700">
              @{brand.instagramHandle}
            </span>
          </a>
        </Reveal>

        <div className="mt-14 columns-2 md:columns-3 lg:columns-3 gap-5 [column-fill:_balance]">
          {photos.map((p, i) => (
            <motion.figure
              key={p.src}
              initial={reduce ? false : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.9, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="group relative mb-5 break-inside-avoid overflow-hidden rounded-2xl shadow-card ring-1 ring-forest-700/10"
            >
              <div className={`relative ${ratioClass[p.ratio]} overflow-hidden bg-cream-200`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.src}
                  alt={p.alt}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-900/60 via-forest-900/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <figcaption className="absolute inset-x-0 bottom-0 p-4 text-xs text-cream-100 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                  {p.alt}
                </figcaption>
              </div>
            </motion.figure>
          ))}
        </div>

        <Reveal delay={0.1} className="mt-12 flex justify-center">
          <a
            href={brand.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-forest-700/25 px-6 py-3 text-sm text-forest-800 hover:bg-forest-700/5 transition-colors"
          >
            <InstagramIcon className="h-4 w-4" />
            See more on Instagram
          </a>
        </Reveal>
      </div>
    </section>
  );
}
