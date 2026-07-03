"use client";

import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { useRef, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  /** Max pixels of pull at the edge of the magnetic field. */
  strength?: number;
  /** Multiplier on the element bounding box for the active region. */
  range?: number;
};

/**
 * Wraps a child element so it gently follows the cursor while inside its
 * "magnetic" region, then springs back to rest. Honors prefers-reduced-motion.
 */
export function Magnetic({
  children,
  className,
  strength = 14,
  range = 1.6,
}: Props) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  if (reduce) {
    return <span className={`inline-block ${className ?? ""}`}>{children}</span>;
  }

  function onMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const radius = (Math.max(rect.width, rect.height) / 2) * range;
    const dist = Math.hypot(dx, dy);
    if (dist > radius) {
      x.set(0);
      y.set(0);
      return;
    }
    const t = 1 - dist / radius;
    x.set((dx / radius) * strength * (1 + t));
    y.set((dy / radius) * strength * (1 + t));
  }
  function onLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <span
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={className ?? "inline-block"}
    >
      <motion.span style={{ x: sx, y: sy }} className="inline-block">
        {children}
      </motion.span>
    </span>
  );
}
