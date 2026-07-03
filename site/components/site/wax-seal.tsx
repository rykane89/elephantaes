"use client";

import { motion, useReducedMotion } from "framer-motion";

type Props = {
  label: string;
  /** A small word above the main label, like "Spring" or "New". */
  superLabel?: string;
  /** A small word below, like "release" or "edition". */
  subLabel?: string;
  className?: string;
  size?: number;
  rotation?: number;
};

/**
 * A vintage wax-seal stamp. Animates with a "stamp down" feel —
 * scales down and rotates from a slightly off angle, with a brief
 * over-press settle.
 */
export function WaxSeal({
  label,
  superLabel,
  subLabel,
  className,
  size = 110,
  rotation = -10,
}: Props) {
  const reduce = useReducedMotion();
  const id = `wax-${label.replace(/\s+/g, "-")}`;
  const halfCirc = Math.PI * (size / 2 - 12);
  const charSpacing = halfCirc / Math.max(label.length + 4, 8);

  return (
    <motion.div
      initial={
        reduce
          ? false
          : { opacity: 0, scale: 1.4, rotate: rotation - 24 }
      }
      whileInView={{ opacity: 1, scale: 1, rotate: rotation }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{
        duration: 0.7,
        ease: [0.34, 1.56, 0.64, 1], // back-ease for the stamp settle
      }}
      className={`relative inline-grid place-items-center ${className ?? ""}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox={`0 0 ${size} ${size}`}
        width={size}
        height={size}
        className="absolute inset-0 text-honey drop-shadow-[0_2px_6px_rgba(46,74,42,0.25)]"
      >
        <defs>
          <radialGradient id={`${id}-fill`} cx="50%" cy="38%" r="68%">
            <stop offset="0%" stopColor="#e0b97b" />
            <stop offset="55%" stopColor="#c9985c" />
            <stop offset="100%" stopColor="#a47940" />
          </radialGradient>
          <path
            id={`${id}-arc`}
            d={`M${size / 2 - (size / 2 - 12)},${size / 2} a${size / 2 - 12},${
              size / 2 - 12
            } 0 1,1 ${(size / 2 - 12) * 2},0`}
          />
        </defs>
        {/* Outer scallop ring */}
        <g>
          {Array.from({ length: 24 }).map((_, i) => {
            const angle = (i / 24) * Math.PI * 2;
            const r = size / 2 - 4;
            const cx = (size / 2 + Math.cos(angle) * r).toFixed(2);
            const cy = (size / 2 + Math.sin(angle) * r).toFixed(2);
            return <circle key={i} cx={cx} cy={cy} r="3" fill="#a47940" />;
          })}
        </g>
        {/* Body */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={size / 2 - 8}
          fill={`url(#${id}-fill)`}
          stroke="#7a5a30"
          strokeWidth="0.6"
        />
        {/* Inner ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={size / 2 - 16}
          fill="none"
          stroke="rgba(255,255,255,0.4)"
          strokeWidth="0.6"
        />
        {/* Curved super label along top */}
        {superLabel && (
          <text
            fill="#3a2515"
            fontFamily="var(--font-fraunces)"
            fontSize="8"
            letterSpacing={charSpacing * 0.04}
            textAnchor="middle"
            style={{ textTransform: "uppercase" }}
          >
            <textPath
              href={`#${id}-arc`}
              startOffset="50%"
            >
              {superLabel}
            </textPath>
          </text>
        )}
        {/* Center label */}
        <text
          x={size / 2}
          y={size / 2}
          textAnchor="middle"
          dominantBaseline="middle"
          fontFamily="var(--font-fraunces)"
          fontSize={Math.max(11, size * 0.16)}
          fill="#3a2515"
          fontStyle="italic"
        >
          {label}
        </text>
        {subLabel && (
          <text
            x={size / 2}
            y={size / 2 + size * 0.18}
            textAnchor="middle"
            fontFamily="var(--font-fraunces)"
            fontSize="7"
            letterSpacing="2"
            fill="#3a2515"
            style={{ textTransform: "uppercase" }}
          >
            {subLabel}
          </text>
        )}
      </svg>
    </motion.div>
  );
}
