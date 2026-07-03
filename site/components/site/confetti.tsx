"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useMemo } from "react";

type Props = {
  show: boolean;
  /** Number of particles. Mobile defaults to fewer. */
  count?: number;
};

/**
 * "Sugar dust" celebratory burst — small motes in honey/cream/forest fly out
 * from the center, gently settle, and fade. Used after form submissions.
 */
export function Confetti({ show, count = 28 }: Props) {
  const reduce = useReducedMotion();
  const particles = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => {
        const angle = Math.random() * Math.PI * 2;
        const distance = 80 + Math.random() * 180;
        const dx = Math.cos(angle) * distance;
        const dy = Math.sin(angle) * distance - 30; // slight upward bias
        const palette = ["#c9985c", "#e0b97b", "#f5ebc8", "#3a5538", "#8aa685"];
        return {
          id: i,
          dx,
          dy,
          color: palette[i % palette.length],
          size: 4 + Math.random() * 7,
          rot: (Math.random() - 0.5) * 360,
          delay: Math.random() * 0.12,
          shape: Math.random() < 0.4 ? "ring" : "dot",
        };
      }),
    [count]
  );

  if (reduce) return null;

  return (
    <AnimatePresence>
      {show && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 grid place-items-center overflow-visible z-10"
        >
          {particles.map((p) => (
            <motion.span
              key={p.id}
              initial={{ x: 0, y: 0, opacity: 0, scale: 0.4, rotate: 0 }}
              animate={{
                x: p.dx,
                y: p.dy,
                opacity: [0, 1, 1, 0],
                scale: [0.4, 1.1, 1, 0.6],
                rotate: p.rot,
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 1.8,
                delay: p.delay,
                ease: [0.22, 1, 0.36, 1],
                times: [0, 0.12, 0.65, 1],
              }}
              style={{
                width: p.size,
                height: p.size,
                background: p.shape === "dot" ? p.color : "transparent",
                border: p.shape === "ring" ? `1.5px solid ${p.color}` : "none",
                borderRadius: 999,
              }}
              className="absolute"
            />
          ))}
        </div>
      )}
    </AnimatePresence>
  );
}
