"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Mail, ArrowRight, Check } from "lucide-react";
import { latestNewsletter, journalArchive } from "@/lib/content";
import { Reveal } from "./reveal";

export function Journal() {
  const reduce = useReducedMotion();
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || state === "loading") return;
    setState("loading");
    // Stubbed: swap with Mailchimp / Kit / Buttondown endpoint when chosen.
    try {
      await new Promise((r) => setTimeout(r, 700));
      setState("done");
      setEmail("");
    } catch {
      setState("error");
    }
  }

  return (
    <section id="journal" className="relative py-28 md:py-36 bg-cream-50/50">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-stretch">
          {/* Featured newsletter */}
          <Reveal className="lg:col-span-7">
            <span className="divider-leaf text-[11px] uppercase tracking-[0.32em]">
              The journal
            </span>
            <h2 className="mt-6 font-display text-4xl md:text-5xl text-forest-800 tracking-tight text-balance">
              Recipes, ramblings,
              <span className="block italic font-light text-forest-700/85">
                a little kitchen gossip.
              </span>
            </h2>

            <motion.article
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 group relative overflow-hidden rounded-3xl border border-forest-700/10 bg-cream-100 shadow-card"
            >
              <div className="grid md:grid-cols-5">
                <div className="md:col-span-2 relative aspect-[4/5] md:aspect-auto overflow-hidden bg-cream-200">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/gallery/holiday-cookie-box-closed.jpg"
                    alt="Latest issue cover — holiday cookie box"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-900/55 to-transparent" />
                  <div className="absolute bottom-4 left-5 text-cream-100">
                    <span className="font-script text-2xl leading-none">latest</span>
                    <span className="block text-[10px] uppercase tracking-[0.22em] mt-1">
                      {latestNewsletter.issue} · {latestNewsletter.date}
                    </span>
                  </div>
                </div>
                <div className="md:col-span-3 p-7 md:p-10 flex flex-col">
                  <h3 className="font-display text-2xl md:text-3xl text-forest-800 leading-snug text-balance">
                    {latestNewsletter.title}
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-ink-soft text-pretty">
                    {latestNewsletter.excerpt}
                  </p>
                  <div className="mt-auto pt-8 flex items-center justify-between">
                    <span className="text-[11px] uppercase tracking-[0.22em] text-forest-700/70">
                      {latestNewsletter.readingTime}
                    </span>
                    <a
                      href={latestNewsletter.link}
                      className="inline-flex items-center gap-2 text-sm text-forest-700 hover:text-forest-800 transition-colors group/link"
                    >
                      Read the issue
                      <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-0.5" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.article>

            <div className="mt-10">
              <h4 className="text-[11px] uppercase tracking-[0.32em] text-forest-700/70">
                From the archive
              </h4>
              <ul className="mt-5 divide-y divide-forest-700/10 border-t border-b border-forest-700/10">
                {journalArchive.map((a) => (
                  <li key={a.title}>
                    <a
                      href="#"
                      className="flex items-baseline justify-between gap-6 py-4 group hover:text-forest-800 transition-colors"
                    >
                      <span className="font-display text-lg md:text-xl text-forest-800 group-hover:underline decoration-forest-700/40 underline-offset-4">
                        {a.title}
                      </span>
                      <span className="shrink-0 text-[11px] uppercase tracking-[0.22em] text-forest-700/60">
                        {a.date}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Signup card */}
          <Reveal delay={0.15} className="lg:col-span-5">
            <div className="sticky top-28 rounded-3xl bg-forest-700 text-cream-100 p-8 md:p-10 shadow-glow overflow-hidden relative">
              <BgPattern />
              <div className="relative">
                <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.32em] text-cream-200/80">
                  <Mail className="h-3.5 w-3.5" />
                  The newsletter
                </span>
                <h3 className="mt-5 font-display text-3xl md:text-4xl leading-tight text-balance">
                  Slow recipes,
                  <span className="block italic font-light">in your inbox.</span>
                </h3>
                <p className="mt-4 text-cream-200/80 text-sm leading-relaxed text-pretty">
                  One thoughtful letter a month. New bakes, behind-the-scenes
                  notes, the occasional confession from the oven. Unsubscribe
                  any time, no hard feelings.
                </p>

                <form onSubmit={onSubmit} className="mt-7">
                  <label htmlFor="newsletter-email" className="sr-only">Email</label>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      id="newsletter-email"
                      type="email"
                      required
                      placeholder="you@goodtaste.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1 rounded-full bg-cream-100/10 border border-cream-100/20 px-5 py-3 text-sm text-cream-100 placeholder:text-cream-200/50 focus:outline-none focus:ring-2 focus:ring-honey/60"
                    />
                    <button
                      type="submit"
                      disabled={state === "loading"}
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-honey px-6 py-3 text-sm text-forest-900 hover:bg-honey-soft disabled:opacity-60 transition-colors"
                    >
                      {state === "done" ? (
                        <>
                          <Check className="h-4 w-4" />
                          Subscribed
                        </>
                      ) : state === "loading" ? (
                        "Saving…"
                      ) : (
                        <>
                          Subscribe
                          <ArrowRight className="h-4 w-4" />
                        </>
                      )}
                    </button>
                  </div>
                  {state === "done" && (
                    <p className="mt-4 text-xs text-cream-200/80">
                      Lovely. Look out for the next letter — and welcome.
                    </p>
                  )}
                  {state === "error" && (
                    <p className="mt-4 text-xs text-rose">
                      Something went wrong. Try again, or email directly.
                    </p>
                  )}
                </form>

                <ul className="mt-8 space-y-2 text-xs text-cream-200/70">
                  <li className="flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-honey" />
                    One letter a month — never spam
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-honey" />
                    First dibs on seasonal collections
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-honey" />
                    Recipes you can actually bake
                  </li>
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function BgPattern() {
  return (
    <svg
      aria-hidden
      className="absolute -right-12 -top-12 w-80 h-80 text-cream-100/8"
      viewBox="0 0 200 200"
      fill="none"
    >
      <g stroke="currentColor" strokeWidth="0.6">
        {Array.from({ length: 8 }).map((_, i) => (
          <circle key={i} cx="100" cy="100" r={20 + i * 10} />
        ))}
      </g>
    </svg>
  );
}
