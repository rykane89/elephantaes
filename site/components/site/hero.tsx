"use client";

import Image from "next/image";
import { motion, useReducedMotion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useRef } from "react";
import { brand } from "@/lib/content";
import { Magnetic } from "./magnetic";
import { RevealText } from "./reveal-text";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1.1, delay: 0.25 + i * 0.18, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export function Hero() {
  const reduce = useReducedMotion();
  const medallionRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 110, damping: 15, mass: 0.5 });
  const sy = useSpring(my, { stiffness: 110, damping: 15, mass: 0.5 });
  const rotateX = useTransform(sy, [-0.5, 0.5], reduce ? [0, 0] : [8, -8]);
  const rotateY = useTransform(sx, [-0.5, 0.5], reduce ? [0, 0] : [-8, 8]);

  // Scroll-driven hero exit — medallion lifts and fades as you scroll past.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, -120]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6, 1], reduce ? [1, 1, 1] : [1, 0.6, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1, 0.9]);

  function onMedallionMove(e: React.MouseEvent) {
    if (reduce) return;
    const el = medallionRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  }
  function onMedallionLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative isolate min-h-[100svh] overflow-hidden pt-28 pb-20 md:pt-36 md:pb-32"
    >
      {/* soft ambient warmth */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute -top-32 -right-24 h-[520px] w-[520px] rounded-full bg-honey/15 blur-3xl" />
        <div className="absolute top-1/2 -left-40 h-[480px] w-[480px] rounded-full bg-forest-300/15 blur-3xl" />
      </div>

      <motion.div
        style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
        className="relative mx-auto max-w-7xl px-6 md:px-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Copy */}
          <div className="lg:col-span-7 text-center lg:text-left">
            <motion.div
              custom={0}
              initial={reduce ? false : "hidden"}
              animate="visible"
              variants={fadeUp}
              className="inline-flex items-center gap-3"
            >
              <span className="h-px w-10 bg-forest-700/40" />
              <span className="text-[11px] uppercase tracking-[0.32em] text-forest-700/80">
                Philadelphia · Custom Cakes · Tiramisu
              </span>
            </motion.div>

            <motion.h1
              custom={1}
              initial={reduce ? false : "hidden"}
              animate="visible"
              variants={fadeUp}
              className="mt-7 font-display text-[clamp(2.75rem,7vw,6.25rem)] leading-[0.98] tracking-tight text-forest-800 text-balance"
              style={{ fontVariationSettings: '"opsz" 144, "SOFT" 100, "WONK" 1' }}
            >
              Cakes that taste like
              <span className="block">
                <em className="not-italic font-script text-honey text-[1.25em] leading-[0.7] align-baseline">
                  the good part
                </em>
              </span>
              <span className="block">of the day.</span>
            </motion.h1>

            <motion.p
              custom={2}
              initial={reduce ? false : "hidden"}
              animate="visible"
              variants={fadeUp}
              className="mt-8 max-w-xl mx-auto lg:mx-0 text-lg leading-relaxed text-ink-soft text-pretty"
            >
              A Philly studio bakery building custom cakes, gourmet pastries and
              the city's most over-engineered tiramisu. Stunning designs,
              unforgettable flavours — art you can eat, made one weekend at a
              time.
            </motion.p>

            <motion.div
              custom={3}
              initial={reduce ? false : "hidden"}
              animate="visible"
              variants={fadeUp}
              className="mt-10 flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
            >
              <Magnetic strength={18}>
                <a
                  href="#order"
                  className="group inline-flex items-center gap-2 rounded-full bg-forest-700 px-7 py-3.5 text-sm tracking-wide text-cream-100 hover:bg-forest-800 transition-colors shadow-card"
                >
                  Enquire about a cake
                  <span aria-hidden className="inline-block transition-transform group-hover:translate-x-0.5">→</span>
                </a>
              </Magnetic>
              <a
                href="#gallery"
                className="inline-flex items-center gap-2 rounded-full border border-forest-700/25 px-7 py-3.5 text-sm tracking-wide text-forest-800 hover:bg-forest-700/5 transition-colors"
              >
                See the work
              </a>
            </motion.div>

            <motion.div
              custom={4}
              initial={reduce ? false : "hidden"}
              animate="visible"
              variants={fadeUp}
              className="mt-12 flex flex-wrap items-center gap-x-4 gap-y-2 sm:gap-x-6 justify-center lg:justify-start text-[10px] sm:text-xs uppercase tracking-[0.18em] sm:tracking-[0.22em] text-forest-700/70"
            >
              <span>Weddings</span>
              <span className="h-1 w-1 rounded-full bg-forest-700/30" />
              <span>Custom cakes</span>
              <span className="h-1 w-1 rounded-full bg-forest-700/30" />
              <span>Tiramisu</span>
              <span className="h-1 w-1 rounded-full bg-forest-700/30" />
              <span>Cookie boxes</span>
            </motion.div>
          </div>

          {/* Centerpiece — logo medallion */}
          <div className="lg:col-span-5 relative">
            <motion.div
              ref={medallionRef}
              onMouseMove={onMedallionMove}
              onMouseLeave={onMedallionLeave}
              initial={reduce ? false : { opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.4, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 1200 }}
              className="relative mx-auto aspect-square w-[min(78vw,520px)]"
            >
              {/* slow-spinning ring */}
              <motion.div
                aria-hidden
                animate={reduce ? undefined : { rotate: 360 }}
                transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0"
              >
                <RingText />
              </motion.div>

              {/* concentric subtle rings */}
              <div className="absolute inset-[10%] rounded-full border border-forest-700/15" />
              <div className="absolute inset-[18%] rounded-full border border-forest-700/10" />

              {/* logo plate */}
              <div className="absolute inset-[12%] rounded-full overflow-hidden ring-1 ring-forest-700/15 shadow-[0_30px_80px_-30px_rgba(46,74,42,0.45)]">
                <Image
                  src="/logo.jpg"
                  alt={`${brand.name} ${brand.tagline}`}
                  fill
                  sizes="(min-width: 1024px) 520px, 78vw"
                  priority
                  className="object-cover scale-[1.05]"
                />
                {/* subtle vignette */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_55%,rgba(46,74,42,0.18)_100%)]" />
              </div>

            </motion.div>
          </div>
        </div>

        {/* scroll cue */}
        <motion.a
          href="#signatures"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="mt-16 mx-auto flex w-fit flex-col items-center gap-2 text-[11px] uppercase tracking-[0.32em] text-forest-700/70 hover:text-forest-800 transition-colors"
        >
          <span>Scroll</span>
          <motion.span
            animate={reduce ? undefined : { y: [0, 6, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown className="h-4 w-4" />
          </motion.span>
        </motion.a>
      </motion.div>
    </section>
  );
}

function RingText() {
  // Curved circular text using SVG textPath
  const text =
    " · ELEPHANTAES · CAKES & DELICACIES · MADE BY HAND · SINCE 2020 ";
  return (
    <svg viewBox="0 0 400 400" className="w-full h-full text-forest-700/55">
      <defs>
        <path
          id="ring-path"
          d="M200,200 m-185,0 a185,185 0 1,1 370,0 a185,185 0 1,1 -370,0"
        />
      </defs>
      <text
        fontFamily="var(--font-fraunces)"
        fontSize="14"
        letterSpacing="6"
        fill="currentColor"
      >
        <textPath href="#ring-path" startOffset="0">
          {text}
          {text}
        </textPath>
      </text>
    </svg>
  );
}

