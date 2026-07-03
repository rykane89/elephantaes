"use client";

import { motion, useReducedMotion } from "framer-motion";

const items = [
  "Made by hand",
  "Tiramisu Sundays",
  "Custom celebration cakes",
  "Now booking weddings",
  "Korean Dohl 1st birthdays",
  "Holiday cookie boxes",
  "Philadelphia",
];

export function Marquee() {
  const reduce = useReducedMotion();

  // Duplicate the strip so the loop is seamless.
  const strip = (
    <div className="flex shrink-0 items-center gap-12 px-6">
      {items.map((label, i) => (
        <span key={`${label}-${i}`} className="flex items-center gap-12">
          <Star />
          <span className="font-display text-3xl md:text-5xl tracking-tight whitespace-nowrap">
            <em className="not-italic font-light italic text-cream-200/80">{label}</em>
          </span>
        </span>
      ))}
      <Star />
    </div>
  );

  return (
    <section
      aria-hidden
      className="relative bg-forest-800 text-cream-100 overflow-hidden border-y border-cream-100/10"
    >
      <div className="flex w-max whitespace-nowrap py-7 md:py-9">
        <motion.div
          className="flex"
          animate={reduce ? undefined : { x: ["0%", "-50%"] }}
          transition={{
            duration: 38,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {strip}
          {strip}
        </motion.div>
      </div>
      {/* edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-forest-800 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-forest-800 to-transparent" />
    </section>
  );
}

function Star() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      className="shrink-0 text-honey"
      aria-hidden
    >
      <path d="M12 2 L 13.5 10.5 L 22 12 L 13.5 13.5 L 12 22 L 10.5 13.5 L 2 12 L 10.5 10.5 Z" />
    </svg>
  );
}
