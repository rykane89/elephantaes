"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { brand, navLinks } from "@/lib/content";
import { cn } from "@/lib/utils";
import { Magnetic } from "./magnetic";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "backdrop-blur-md bg-cream-100/75 border-b border-forest-700/10"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
        <Link href="#top" className="flex items-center gap-3 group">
          <span
            className={cn(
              "relative inline-block transition-all duration-500 overflow-hidden rounded-full ring-1 ring-forest-700/10",
              scrolled ? "h-9 w-9" : "h-11 w-11"
            )}
          >
            <Image
              src="/logo.jpg"
              alt="Elephantaes"
              fill
              sizes="44px"
              className="object-cover scale-[1.6]"
              priority
            />
          </span>
          <span className="leading-none">
            <span className="font-display text-lg text-forest-800 tracking-tight">
              {brand.name}
            </span>
            <span className="block text-[10px] uppercase tracking-[0.22em] text-forest-700/70">
              {brand.tagline}
            </span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-9">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-ink-soft hover:text-forest-800 transition-colors relative group"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-forest-700 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <Magnetic className="hidden md:inline-block">
          <a
            href="#order"
            className="inline-flex items-center gap-2 rounded-full bg-forest-700 px-5 py-2.5 text-sm text-cream-100 hover:bg-forest-800 transition-colors shadow-card"
          >
            Order a cake
          </a>
        </Magnetic>

        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden p-2 -mr-2 text-forest-800"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-forest-700/10 bg-cream-100/95 backdrop-blur"
          >
            <nav className="flex flex-col px-6 py-6 gap-4">
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-base font-display text-forest-800"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#order"
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-forest-700 px-5 py-2.5 text-sm text-cream-100"
              >
                Order a cake
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
