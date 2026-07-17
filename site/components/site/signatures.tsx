"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { SignatureCard } from "@/lib/cms";
import { Reveal } from "./reveal";

export function Signatures({ cards }: { cards: SignatureCard[] }) {
  const reduce = useReducedMotion();

  return (
    <section id="signatures" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <Reveal className="text-center">
          <span className="divider-leaf text-[11px] uppercase tracking-[0.32em]">
            What we bake
          </span>
          <h2 className="mt-6 font-display text-4xl md:text-6xl text-forest-800 tracking-tight text-balance">
            Four kinds of love letter,
            <span className="block italic font-light text-forest-700/80">written in butter.</span>
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {cards.map((s, i) => (
            <motion.article
              key={s.title}
              initial={reduce ? false : { opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={reduce ? undefined : { y: -4 }}
              className="group relative flex flex-col rounded-3xl border border-forest-700/10 bg-cream-50/70 backdrop-blur p-7 shadow-card overflow-hidden"
            >
              <span
                aria-hidden
                className="absolute -top-12 -right-12 h-40 w-40 rounded-full bg-honey/15 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              />
              <span className="font-display text-5xl text-forest-700/30">
                0{i + 1}
              </span>
              <h3 className="mt-6 font-display text-2xl text-forest-800">
                {s.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft text-pretty">
                {s.description}
              </p>
              <div className="mt-8 pt-5 border-t border-forest-700/10 flex items-center justify-between">
                <span className="text-[11px] uppercase tracking-[0.22em] text-forest-700/70">
                  {s.detail}
                </span>
                <a
                  href="#order"
                  className="text-xs text-forest-700 underline decoration-forest-700/30 underline-offset-4 hover:decoration-forest-700"
                >
                  Enquire
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
