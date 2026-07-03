"use client";

import { motion, useReducedMotion } from "framer-motion";
import { brand, testimonials } from "@/lib/content";
import { Reveal } from "./reveal";

// Torn-paper mask SVGs: a black rectangle whose edges get displaced by
// fractalNoise, used as a CSS mask-image so the photo (and the card behind it)
// inherit irregular hand-torn edges.
const TORN_MASK_PHOTO = `url("data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 500' preserveAspectRatio='none'>
    <filter id='t' x='-10%' y='-10%' width='120%' height='120%'>
      <feTurbulence type='fractalNoise' baseFrequency='0.022' numOctaves='3' seed='11'/>
      <feDisplacementMap in='SourceGraphic' scale='18'/>
    </filter>
    <rect x='14' y='14' width='372' height='472' fill='black' filter='url(#t)'/>
  </svg>`
)}")`;

const TORN_MASK_BG = `url("data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 500' preserveAspectRatio='none'>
    <filter id='t' x='-12%' y='-12%' width='124%' height='124%'>
      <feTurbulence type='fractalNoise' baseFrequency='0.015' numOctaves='2' seed='4'/>
      <feDisplacementMap in='SourceGraphic' scale='24'/>
    </filter>
    <rect x='18' y='18' width='364' height='464' fill='black' filter='url(#t)'/>
  </svg>`
)}")`;

// Fine paper grain — small high-frequency noise, multiplied into the photo
const PAPER_GRAIN = `url("data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'>
    <filter id='n'>
      <feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/>
      <feColorMatrix values='0 0 0 0 0.18  0 0 0 0 0.29  0 0 0 0 0.16  0 0 0 0.5 0'/>
    </filter>
    <rect width='100%' height='100%' filter='url(#n)'/>
  </svg>`
)}")`;

// Broader crinkle — large low-frequency noise, overlaid for paper-fold effect
const PAPER_CRINKLE = `url("data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400'>
    <filter id='c'>
      <feTurbulence type='fractalNoise' baseFrequency='0.012' numOctaves='3' stitchTiles='stitch'/>
      <feColorMatrix values='0 0 0 0 1  0 0 0 0 0.95  0 0 0 0 0.78  0 0 0 0.7 0'/>
    </filter>
    <rect width='100%' height='100%' filter='url(#c)'/>
  </svg>`
)}")`;

export function Story() {
  const reduce = useReducedMotion();

  return (
    <section id="story" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-center">
          <Reveal className="lg:col-span-5">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-md">
              {/* honey-tinted card behind, with matching torn edges */}
              <motion.div
                aria-hidden
                animate={reduce ? undefined : { rotate: [-3, -1.5, -3] }}
                transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-3 bg-honey/30"
                style={{
                  WebkitMaskImage: TORN_MASK_BG,
                  maskImage: TORN_MASK_BG,
                  WebkitMaskSize: "100% 100%",
                  maskSize: "100% 100%",
                  WebkitMaskRepeat: "no-repeat",
                  maskRepeat: "no-repeat",
                }}
              />

              {/* the photo, torn edges + paper grain + soft shadow */}
              <div
                className="absolute inset-0"
                style={{
                  filter:
                    "drop-shadow(0 22px 36px rgba(46,74,42,0.28)) drop-shadow(0 2px 6px rgba(20,32,16,0.18))",
                  transform: "rotate(-1.2deg)",
                }}
              >
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{
                    WebkitMaskImage: TORN_MASK_PHOTO,
                    maskImage: TORN_MASK_PHOTO,
                    WebkitMaskSize: "100% 100%",
                    maskSize: "100% 100%",
                    WebkitMaskRepeat: "no-repeat",
                    maskRepeat: "no-repeat",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/gallery/alex-portrait.jpg"
                    alt="Alex, founder and baker behind Elephantaes Cakes & Delicacies"
                    className="absolute inset-0 h-full w-full object-cover"
                    style={{ objectPosition: "center 25%" }}
                  />
                  {/* paper grain (multiply) */}
                  <div
                    aria-hidden
                    className="absolute inset-0 mix-blend-multiply opacity-35 pointer-events-none"
                    style={{ backgroundImage: PAPER_GRAIN }}
                  />
                  {/* broad crinkle (overlay) — large soft texture pretending to be paper folds */}
                  <div
                    aria-hidden
                    className="absolute inset-0 mix-blend-overlay opacity-25 pointer-events-none"
                    style={{ backgroundImage: PAPER_CRINKLE }}
                  />
                  {/* warm bottom vignette so type below it feels anchored */}
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-900/30 via-transparent to-transparent" />
                </div>
              </div>

              {/* signature badge — stays clean and round, sitting on top */}
              <div className="absolute -bottom-6 -right-6 rounded-full bg-cream-100 ring-1 ring-forest-700/15 shadow-card px-5 py-4 text-center z-10">
                <span className="block font-script text-3xl text-forest-700 leading-none">
                  {brand.bakerName ?? "hello."}
                </span>
                <span className="mt-1 block text-[10px] uppercase tracking-[0.22em] text-forest-700/70">
                  the baker
                </span>
              </div>
            </div>
          </Reveal>

          <div className="lg:col-span-7">
            <Reveal>
              <span className="divider-leaf text-[11px] uppercase tracking-[0.32em]">
                The story
              </span>
              <h2 className="mt-6 font-display text-4xl md:text-5xl text-forest-800 tracking-tight text-balance">
                Hi, I'm {brand.bakerName}.
                <span className="block italic font-light text-forest-700/85">
                  One pair of hands, a lot of butter.
                </span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-8 space-y-5 text-lg leading-relaxed text-ink-soft text-pretty">
                <p>
                  Elephantaes started, like most good things, with a stubborn
                  recipe and a kitchen too small for it. I bake the way I was
                  taught — slowly, with both hands, and with a cup of strong
                  coffee on the counter.
                </p>
                <p>
                  Every order is built from real butter, seasonal fruit and
                  flour I can trace by name. No shortcuts, no fillers, no
                  fondant cement. Just cake that tastes the way you remember
                  cake tasting before you grew up.
                </p>
              </div>
            </Reveal>

            <div className="mt-12 grid sm:grid-cols-2 gap-5">
              {testimonials.map((t, i) => (
                <motion.figure
                  key={t.attribution}
                  initial={reduce ? false : { opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.8, delay: i * 0.12 }}
                  className="rounded-2xl border border-forest-700/10 bg-cream-50/70 p-6"
                >
                  <span aria-hidden className="font-display text-5xl leading-none text-forest-700/30">
                    “
                  </span>
                  <blockquote className="mt-1 text-sm leading-relaxed text-ink-soft text-pretty">
                    {t.quote}
                  </blockquote>
                  <figcaption className="mt-4 text-[11px] uppercase tracking-[0.22em] text-forest-700/70">
                    {t.attribution}
                  </figcaption>
                </motion.figure>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
