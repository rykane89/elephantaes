"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  children: string;
  className?: string;
  /** word | char — char is more dramatic, word is faster and feels editorial */
  by?: "word" | "char";
  delay?: number;
  stagger?: number;
  /** Use entrance trigger when in viewport vs immediately on mount. */
  inView?: boolean;
  as?: "span" | "div" | "h1" | "h2" | "h3";
  ariaLabel?: string;
};

export function RevealText({
  children,
  className,
  by = "word",
  delay = 0,
  stagger = 0.04,
  inView = true,
  as = "span",
  ariaLabel,
}: Props) {
  const reduce = useReducedMotion();
  const tokens = by === "word" ? children.split(" ") : Array.from(children);

  const Wrapper = motion[as];
  const motionProps = inView
    ? {
        initial: reduce ? false : "hidden",
        whileInView: "visible",
        viewport: { once: true, amount: 0.3 },
      }
    : {
        initial: reduce ? false : "hidden",
        animate: "visible",
      };

  if (reduce) {
    const Tag = as as keyof React.JSX.IntrinsicElements;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <Wrapper
      aria-label={ariaLabel ?? children}
      className={className}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
      {...motionProps}
    >
      {tokens.map((token, i) => (
        <Token key={i} by={by} isLast={i === tokens.length - 1}>
          {token}
        </Token>
      ))}
    </Wrapper>
  );
}

function Token({
  children,
  by,
  isLast,
}: {
  children: ReactNode;
  by: "word" | "char";
  isLast: boolean;
}) {
  return (
    <span aria-hidden className="inline-block overflow-hidden align-baseline">
      <motion.span
        className="inline-block"
        variants={{
          hidden: { y: "110%", opacity: 0 },
          visible: {
            y: "0%",
            opacity: 1,
            transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
          },
        }}
      >
        {children}
        {by === "word" && !isLast ? " " : ""}
      </motion.span>
    </span>
  );
}
