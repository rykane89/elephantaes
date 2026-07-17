import Image from "next/image";
import { Mail, Phone } from "lucide-react";
import { brand, navLinks } from "@/lib/content";
import type { SiteSettings } from "@/lib/cms";
import { InstagramIcon } from "./icons";

export function Footer({ settings }: { settings: SiteSettings }) {
  const year = new Date().getFullYear();
  return (
    <footer className="relative bg-forest-800 text-cream-200">
      <div className="mx-auto max-w-7xl px-6 md:px-10 py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <span className="relative h-12 w-12 overflow-hidden rounded-full ring-1 ring-cream-100/20">
                <Image
                  src="/logo.jpg"
                  alt="Elephantaes"
                  fill
                  sizes="48px"
                  className="object-cover scale-[1.6]"
                />
              </span>
              <div>
                <span className="block font-display text-xl text-cream-100">
                  {brand.name}
                </span>
                <span className="block text-[10px] uppercase tracking-[0.22em] text-cream-200/70">
                  {brand.tagline}
                </span>
              </div>
            </div>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-cream-200/80">
              {settings.city} — custom cakes, weekend tiramisu, weddings by
              enquiry. Studio pickup only.
            </p>

            <div className="mt-8 flex items-center gap-3">
              <a
                href={settings.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="inline-flex items-center justify-center h-10 w-10 rounded-full border border-cream-100/20 hover:bg-cream-100/10 transition-colors"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
              <a
                href={`tel:${settings.phoneTel}`}
                aria-label="Phone"
                className="inline-flex items-center justify-center h-10 w-10 rounded-full border border-cream-100/20 hover:bg-cream-100/10 transition-colors"
              >
                <Phone className="h-4 w-4" />
              </a>
              <a
                href={`mailto:${settings.inquiryEmail}`}
                aria-label="Email"
                className="inline-flex items-center justify-center h-10 w-10 rounded-full border border-cream-100/20 hover:bg-cream-100/10 transition-colors"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-[11px] uppercase tracking-[0.32em] text-cream-100/60">
              Visit
            </h4>
            <ul className="mt-5 space-y-3 text-sm">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="hover:text-cream-100 transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <h4 className="text-[11px] uppercase tracking-[0.32em] text-cream-100/60">
              Talk to the baker
            </h4>
            <a
              href={`tel:${settings.phoneTel}`}
              className="mt-5 block font-display text-2xl text-cream-100 hover:text-honey transition-colors"
            >
              {settings.phone}
            </a>
            <a
              href={settings.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-2 text-sm text-cream-200/80 hover:text-cream-100 transition-colors"
            >
              <InstagramIcon className="h-4 w-4" /> @{settings.instagramHandle}
            </a>

            <div className="mt-6 pt-5 border-t border-cream-100/10">
              <h5 className="text-[10px] uppercase tracking-[0.32em] text-cream-100/50">
                Pickup
              </h5>
              <ul className="mt-3 space-y-1 text-sm text-cream-200/80">
                {settings.pickupHours.map((h) => (
                  <li key={h.day} className="flex items-baseline gap-2">
                    <span className="font-display text-cream-100">{h.day}</span>
                    <span>· {h.hours}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-cream-100/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] uppercase tracking-[0.22em] text-cream-200/50">
          <span>© {year} {brand.name}. All cakes reserved.</span>
          <span className="font-script normal-case tracking-normal text-base text-cream-200/70">
            baked with care.
          </span>
        </div>
      </div>
    </footer>
  );
}
