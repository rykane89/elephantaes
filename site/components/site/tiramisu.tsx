"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { brand } from "@/lib/content";
import type { TiramisuItem } from "@/lib/cms";
import { Reveal } from "./reveal";
import { RevealText } from "./reveal-text";
import { WaxSeal } from "./wax-seal";

export function Tiramisu({ menu }: { menu: TiramisuItem[] }) {
  const reduce = useReducedMotion();

  return (
    <section
      id="tiramisu"
      className="relative py-28 md:py-36 bg-forest-800 text-cream-200 overflow-hidden"
    >
      <BgPattern />
      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <Reveal className="text-center max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.32em] text-cream-200/70">
            <span className="h-px w-10 bg-honey/50" />
            The signature
            <span className="h-px w-10 bg-honey/50" />
          </span>
          <h2 className="mt-7 font-display text-4xl md:text-6xl tracking-tight text-cream-100 text-balance">
            <RevealText as="span" className="block">Tiramisu, taken</RevealText>
            <RevealText as="span" delay={0.2} className="block italic font-light text-honey">
              unreasonably seriously.
            </RevealText>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-cream-200/80 text-pretty">
            Soaked ladyfingers, honey-mascarpone cream, layers all the way down.
            Three flavours on rotation. Pick a size, order online,
            collect from the studio at the weekend.
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-5">
          {menu.map((item, i) => (
            <motion.article
              key={item.name}
              initial={reduce ? false : { opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={reduce ? undefined : { y: -4 }}
              className="group relative flex flex-col"
            >
              {item.accent && (
                <div className="absolute -top-7 -right-3 md:-right-5 z-20">
                  <WaxSeal
                    superLabel="Limited"
                    label="Spring"
                    subLabel="Release"
                    size={92}
                    rotation={-12}
                  />
                </div>
              )}

              <div
                className={`flex flex-col flex-1 rounded-3xl overflow-hidden backdrop-blur ${
                  item.accent
                    ? "bg-honey/15 border border-honey/40"
                    : "bg-cream-100/5 border border-cream-100/15"
                }`}
              >
                {/* Photo */}
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                  />
                  {/* subtle bottom vignette so type below feels anchored */}
                  <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-forest-800/40 to-transparent" />
                </div>

                {/* Text */}
                <div className="flex flex-col flex-1 p-7 md:p-8">
                  <h3 className="font-display text-2xl md:text-3xl text-cream-100 leading-tight">
                    {item.name}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-cream-200/80 text-pretty">
                    {item.description}
                  </p>
                  <div className="mt-auto pt-6">
                    <div className="pt-5 border-t border-cream-100/15 space-y-2.5">
                      {item.sizes.map((s) => (
                        <div
                          key={s.label}
                          className="flex items-baseline justify-between"
                        >
                          <span className="text-[11px] uppercase tracking-[0.22em] text-cream-200/60">
                            {s.label}
                          </span>
                          <span className="font-display text-2xl text-cream-100">
                            {s.price}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <Reveal delay={0.1} className="mt-16">
          <div className="flex flex-col items-center text-center gap-6">
            <motion.a
              href={brand.shopUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={reduce ? undefined : { scale: 1.03 }}
              whileTap={reduce ? undefined : { scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="group inline-flex items-center justify-center gap-3 rounded-full bg-honey px-12 py-5 font-display text-lg md:text-xl text-forest-900 shadow-[0_18px_40px_-12px_rgba(201,152,92,0.55)] hover:bg-honey-soft hover:shadow-[0_22px_48px_-12px_rgba(224,185,123,0.65)] transition-[background-color,box-shadow] focus:outline-none focus:ring-2 focus:ring-honey-soft focus:ring-offset-4 focus:ring-offset-forest-800"
            >
              <span className="tracking-tight">Order online</span>
              <span
                aria-hidden
                className="text-xl transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </motion.a>

            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-5 text-[11px] uppercase tracking-[0.32em] text-cream-200/65">
              <span className="inline-flex items-center gap-2">
                <span className="h-px w-6 bg-honey/50" />
                Pickup · Sat 9–12 · Sun 2–5
                <span className="h-px w-6 bg-honey/50" />
              </span>
            </div>

            <a
              href={brand.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-cream-200/70 underline-offset-4 hover:text-cream-100 hover:underline transition-colors"
            >
              or DM @{brand.instagramHandle} for off-menu
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function BgPattern() {
  return (
    <svg
      aria-hidden
      className="absolute -right-20 -top-20 w-[480px] h-[480px] text-honey/10"
      viewBox="0 0 200 200"
      fill="none"
    >
      <g stroke="currentColor" strokeWidth="0.5">
        {Array.from({ length: 12 }).map((_, i) => (
          <circle key={i} cx="100" cy="100" r={20 + i * 8} />
        ))}
      </g>
    </svg>
  );
}
