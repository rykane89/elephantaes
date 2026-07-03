"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check, Send } from "lucide-react";
import { Reveal } from "./reveal";
import { Confetti } from "./confetti";

const occasions = [
  "Wedding",
  "Birthday",
  "Anniversary",
  "Christening",
  "Supper club",
  "Just because",
];

export function Inquiry() {
  const reduce = useReducedMotion();
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    occasion: "Wedding",
    date: "",
    servings: "",
    message: "",
  });

  function set<K extends keyof typeof form>(k: K, v: (typeof form)[K]) {
    setForm((s) => ({ ...s, [k]: v }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (state === "loading") return;
    setState("loading");
    try {
      // Stubbed — replace with a real endpoint (Formspree, /api/inquiry, etc).
      await new Promise((r) => setTimeout(r, 800));
      setState("done");
      setForm({
        name: "",
        email: "",
        occasion: "Wedding",
        date: "",
        servings: "",
        message: "",
      });
    } catch {
      setState("error");
    }
  }

  return (
    <section id="order" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-start">
          <Reveal className="lg:col-span-5">
            <span className="divider-leaf text-[11px] uppercase tracking-[0.32em]">
              Order a cake
            </span>
            <h2 className="mt-6 font-display text-4xl md:text-5xl text-forest-800 tracking-tight text-balance">
              Tell me about your
              <span className="block italic font-light text-forest-700/85">
                celebration.
              </span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-ink-soft text-pretty">
              The more you can share — the date, the people, the flavours you
              love — the better the cake will be. I reply within two working
              days, usually with cake on my hands.
            </p>

            <ul className="mt-10 space-y-4 text-sm text-ink-soft">
              <li className="flex gap-3">
                <span className="mt-1.5 inline-block h-1.5 w-1.5 rounded-full bg-forest-700" />
                <span>Custom cakes from $85 — book 2+ weeks ahead.</span>
              </li>
              <li className="flex gap-3">
                <span className="mt-1.5 inline-block h-1.5 w-1.5 rounded-full bg-forest-700" />
                <span>Weddings: 6+ months notice for tasting + design.</span>
              </li>
              <li className="flex gap-3">
                <span className="mt-1.5 inline-block h-1.5 w-1.5 rounded-full bg-forest-700" />
                <span>Studio pickup in Philadelphia — Sat 9–12, Sun 2–5.</span>
              </li>
              <li className="flex gap-3">
                <span className="mt-1.5 inline-block h-1.5 w-1.5 rounded-full bg-forest-700" />
                <span>Prefer to text? DM @elephantaes.cakes or text (267) 414-7861.</span>
              </li>
            </ul>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-7">
            <motion.form
              onSubmit={onSubmit}
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="relative overflow-visible rounded-3xl bg-cream-50/80 backdrop-blur border border-forest-700/10 p-7 md:p-10 shadow-card"
            >
              <Confetti show={state === "done"} />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field
                  label="Your name"
                  required
                  value={form.name}
                  onChange={(v) => set("name", v)}
                  placeholder="Eleanor"
                />
                <Field
                  label="Email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(v) => set("email", v)}
                  placeholder="eleanor@…"
                />
                <SelectField
                  label="Occasion"
                  value={form.occasion}
                  onChange={(v) => set("occasion", v)}
                  options={occasions}
                />
                <Field
                  label="Date of event"
                  type="date"
                  value={form.date}
                  onChange={(v) => set("date", v)}
                />
                <Field
                  label="Approx. servings"
                  value={form.servings}
                  onChange={(v) => set("servings", v)}
                  placeholder="40 people"
                  className="sm:col-span-2"
                />
                <div className="sm:col-span-2">
                  <label className="block text-[11px] uppercase tracking-[0.22em] text-forest-700/70">
                    Tell me about it
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => set("message", e.target.value)}
                    placeholder="Flavours, colours, the story behind it, who it's for…"
                    className="mt-2 w-full rounded-2xl bg-cream-100 border border-forest-700/15 px-4 py-3 text-sm text-ink placeholder:text-ink-soft/50 focus:outline-none focus:ring-2 focus:ring-forest-700/30"
                  />
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <p className="text-xs text-forest-700/70">
                  By sending, you agree to be contacted about your enquiry.
                </p>
                <button
                  type="submit"
                  disabled={state === "loading"}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-forest-700 px-7 py-3.5 text-sm text-cream-100 hover:bg-forest-800 disabled:opacity-60 transition-colors shadow-card"
                >
                  {state === "done" ? (
                    <>
                      <Check className="h-4 w-4" />
                      Sent — talk soon
                    </>
                  ) : state === "loading" ? (
                    "Sending…"
                  ) : (
                    <>
                      Send enquiry
                      <Send className="h-4 w-4" />
                    </>
                  )}
                </button>
              </div>
              {state === "error" && (
                <p className="mt-4 text-xs text-rose">
                  Something went wrong sending that. Please try again or email directly.
                </p>
              )}
            </motion.form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  required,
  className,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="block text-[11px] uppercase tracking-[0.22em] text-forest-700/70">
        {label}
        {required && <span className="text-honey"> ·</span>}
      </label>
      <input
        type={type}
        value={value}
        required={required}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-full bg-cream-100 border border-forest-700/15 px-4 py-3 text-sm text-ink placeholder:text-ink-soft/50 focus:outline-none focus:ring-2 focus:ring-forest-700/30"
      />
    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <div>
      <label className="block text-[11px] uppercase tracking-[0.22em] text-forest-700/70">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full appearance-none rounded-full bg-cream-100 border border-forest-700/15 px-4 py-3 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-forest-700/30"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}
