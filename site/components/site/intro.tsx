"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { brand } from "@/lib/content";

const STORAGE_KEY = "elephantaes:introSeen";

export function Intro() {
  const reduce = useReducedMotion();
  // Start `true` so the curtain renders during SSR and the static HTML
  // ships with it on top — no flash of page before curtain. The CSS rule
  // in globals.css (driven by the inline <head> script) hides it instantly
  // for returning visitors / reduced-motion users before paint.
  const [show, setShow] = useState<boolean>(true);

  // After hydration, decide whether to dismiss.
  useEffect(() => {
    if (reduce) {
      setShow(false);
      return;
    }
    const seen = sessionStorage.getItem(STORAGE_KEY);
    if (seen) setShow(false);
  }, [reduce]);

  // Lock body scroll while the curtain is up.
  useEffect(() => {
    if (!show) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [show]);

  // Auto-finish after the choreography ends, plus skip on click / Escape.
  useEffect(() => {
    if (!show) return;
    const t = window.setTimeout(() => finish(), 3400);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") finish();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  function finish() {
    sessionStorage.setItem(STORAGE_KEY, "1");
    setShow(false);
  }

  if (show === false) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="intro"
          aria-hidden
          data-intro-curtain
          onClick={finish}
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] cursor-pointer overflow-hidden bg-cream-100"
          style={{
            backgroundImage:
              "radial-gradient(900px 500px at 80% -10%, rgba(201,152,92,0.22), transparent 60%), radial-gradient(700px 400px at -10% 110%, rgba(46,74,42,0.10), transparent 60%)",
          }}
        >
          {/* paper grain */}
          <div
            className="pointer-events-none absolute inset-0 opacity-60 mix-blend-multiply"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.18 0 0 0 0 0.29 0 0 0 0 0.16 0 0 0 0.06 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
            }}
          />

          {/* corner ornaments */}
          <CornerOrnament className="top-6 left-6" />
          <CornerOrnament className="top-6 right-6" flip />
          <CornerOrnament className="bottom-6 left-6" flipY />
          <CornerOrnament className="bottom-6 right-6" flip flipY />

          {/* "Est." top hairline */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-12 left-1/2 -translate-x-1/2 flex items-center gap-3 text-[11px] uppercase tracking-[0.4em] text-forest-700/70"
          >
            <span className="h-px w-8 bg-forest-700/40" />
            Est. 2020 · Philadelphia
            <span className="h-px w-8 bg-forest-700/40" />
          </motion.div>

          {/* center stack — the real logo */}
          <div className="relative h-full w-full grid place-items-center px-6">
            <div className="flex flex-col items-center text-center">
              {/* growing hairline above */}
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="h-px w-32 md:w-56 origin-center bg-forest-700/35"
              />

              {/* the actual brand logo — elephant, script, and tagline all in one */}
              <motion.div
                initial={{ opacity: 0, scale: 0.94, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="relative my-6 w-[min(78vw,520px)]"
                style={{ aspectRatio: "851 / 626" }}
              >
                <Image
                  src="/logo-mark.png"
                  alt="Elephantaes — Cakes & Delicacies"
                  fill
                  sizes="(min-width: 768px) 520px, 78vw"
                  priority
                  className="object-contain"
                />
              </motion.div>

              {/* growing hairline below */}
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="h-px w-32 md:w-56 origin-center bg-forest-700/35"
              />

              <motion.span
                initial={{ opacity: 0, letterSpacing: "0.18em" }}
                animate={{ opacity: 1, letterSpacing: "0.42em" }}
                transition={{ duration: 1.4, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="mt-6 text-[10px] md:text-[11px] uppercase text-forest-700/70"
              >
                A Philadelphia Studio Bakery
              </motion.span>
            </div>
          </div>

          {/* skip / progress */}
          <motion.button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              finish();
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="absolute bottom-10 right-8 text-[10px] uppercase tracking-[0.32em] text-forest-700/60 hover:text-forest-800 transition-colors"
          >
            Skip
          </motion.button>

          {/* loader hairline at bottom */}
          <div className="absolute bottom-10 left-8 right-24 max-w-[260px] h-px bg-forest-700/15 overflow-hidden">
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ duration: 2.6, ease: [0.65, 0, 0.35, 1] }}
              className="h-full w-1/2 bg-forest-700/60"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function CornerOrnament({
  className,
  flip,
  flipY,
}: {
  className?: string;
  flip?: boolean;
  flipY?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={`absolute pointer-events-none text-forest-700/35 ${className ?? ""}`}
      style={{
        transform: `${flip ? "scaleX(-1)" : ""} ${flipY ? "scaleY(-1)" : ""}`.trim() || undefined,
      }}
    >
      <svg width="56" height="56" viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round">
        <path d="M2 2 L 22 2" />
        <path d="M2 2 L 2 22" />
        <path d="M2 2 Q 16 4, 22 18" />
        <circle cx="2" cy="2" r="1.6" fill="currentColor" stroke="none" />
      </svg>
    </motion.div>
  );
}
