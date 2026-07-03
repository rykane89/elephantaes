"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { brand } from "@/lib/content";
import type { CollabContent } from "@/lib/cms";
import { Reveal } from "./reveal";
import { WaxSeal } from "./wax-seal";

export function Collab({ collab }: { collab: CollabContent }) {
  const reduce = useReducedMotion();
  if (!collab.active) return null;

  return (
    <section
      id="collab"
      aria-label="Current collaboration"
      className="relative isolate py-16 md:py-24 overflow-hidden"
    >
      {/* warm ambient background */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(700px 400px at 85% 20%, rgba(201,152,92,0.18), transparent 60%)," +
            "radial-gradient(600px 360px at 10% 90%, rgba(46,74,42,0.12), transparent 60%)," +
            "var(--color-cream-100)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Image */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 relative"
          >
            <div className="relative aspect-[4/5] w-full max-w-[520px] mx-auto rounded-3xl overflow-hidden ring-1 ring-forest-700/15 shadow-[0_30px_80px_-30px_rgba(46,74,42,0.45)]">
              <Image
                src={collab.image}
                alt={`${brand.name} × ${collab.partnerName} ${collab.title}`}
                fill
                sizes="(min-width: 1024px) 520px, 90vw"
                className="object-cover"
              />
            </div>

            {/* Floating wax-seal stamp */}
            <div className="absolute -top-4 -right-2 md:-top-6 md:-right-6 z-10">
              <WaxSeal
                superLabel="Limited"
                label="This"
                subLabel="Weekend"
                size={108}
                rotation={-14}
              />
            </div>
          </motion.div>

          {/* Copy */}
          <Reveal delay={0.05} className="lg:col-span-6">
            <span className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.32em] text-forest-700/80">
              <span className="h-px w-10 bg-forest-700/40" />
              Now showing
            </span>

            {/* Collaboration mark */}
            <div className="mt-6 flex items-center gap-4 md:gap-5 flex-wrap">
              <span className="font-display text-3xl md:text-4xl text-forest-800 leading-none">
                {brand.name}
              </span>
              <span aria-hidden className="font-display text-2xl md:text-3xl text-honey italic">
                ×
              </span>
              <a
                href={collab.partnerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 font-display text-3xl md:text-4xl text-forest-800 leading-none hover:text-honey transition-colors"
              >
                {collab.partnerName}
                <ArrowUpRight className="h-5 w-5 text-forest-700/50 group-hover:text-honey transition-colors" />
              </a>
            </div>

            <h2
              className="mt-7 font-display text-4xl md:text-5xl tracking-tight text-forest-800 text-balance"
              style={{ fontVariationSettings: '"opsz" 144, "SOFT" 100' }}
            >
              {collab.title}
              <span className="block italic font-light text-honey text-3xl md:text-4xl mt-1">
                {collab.window}.
              </span>
            </h2>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft text-pretty">
              {collab.blurb}
            </p>

            {/* Flavors */}
            <ul className="mt-8 space-y-3 max-w-xl">
              {collab.flavors.map((f, i) => (
                <motion.li
                  key={f.name}
                  initial={reduce ? false : { opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-baseline gap-3 border-b border-forest-700/10 pb-3"
                >
                  <span className="text-[10px] font-mono text-forest-700/50 tracking-[0.22em] tabular-nums">
                    0{i + 1}
                  </span>
                  <span className="font-display text-lg text-forest-800 flex-shrink-0">
                    {f.name}
                  </span>
                  <span className="text-sm text-ink-soft italic ml-auto text-right">
                    {f.note}
                  </span>
                </motion.li>
              ))}
            </ul>

            <div className="mt-9 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <a
                href={collab.orderHref}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-forest-700 px-7 py-3.5 text-sm tracking-wide text-cream-100 hover:bg-forest-800 transition-colors shadow-card"
              >
                {collab.orderLabel}
                <span aria-hidden className="inline-block transition-transform group-hover:translate-x-0.5">→</span>
              </a>
              <a
                href={collab.partnerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-forest-700/80 hover:text-forest-800 transition-colors"
              >
                <span className="text-[10px] uppercase tracking-[0.32em]">Visit</span>
                <span className="font-display text-base">@{collab.partnerHandle}</span>
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
