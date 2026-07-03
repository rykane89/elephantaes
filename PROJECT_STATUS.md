# Elephantaes · Project Handoff

**Last updated:** 2026-07-03

## 2026-07-03 session: CMS for Alex (Sanity)

Site is live at elephantaes.com. Goal: let Alex edit photos, tiramisu cards, and the collab banner herself.

- New `/studio` folder: Sanity Studio (admin panel) with three content types: galleryPhoto, tiramisuFlavor, collabBanner (singleton). Deploys to elephantaes.sanity.studio. Alex logs in with Google as Editor.
- `/site/lib/cms.ts`: fetches published Sanity content at build time; falls back to `lib/content.ts` if unconfigured/unreachable. Zero-config builds still work identically.
- `Collab` / `Tiramisu` / `Gallery` now take content as props from `app/page.tsx` (async server component).
- `next.config.ts` allows `cdn.sanity.io` images. `/site/.env.local.example` documents `NEXT_PUBLIC_SANITY_PROJECT_ID` + `NEXT_PUBLIC_SANITY_DATASET`.
- `/studio/seed.mjs`: one-time script to upload current photos/content into Sanity.
- Publish flow: Sanity webhook → Netlify build hook → rebuild → live in ~2 min. Requires switching from drag-and-drop to git-based deploys (GitHub repo + Netlify link).
- Docs: `CMS_SETUP.md` (Ryan's setup checklist), `FOR_ALEX_EDITING.md` (Alex's guide).
- Verified: tsc --noEmit passes; build compiles (sandbox couldn't fetch Google Fonts, so run `npm run build` locally once to confirm end-to-end).
- Remaining manual steps (Ryan): git init/push, Netlify link repo, create Sanity project, deploy studio, seed, env vars, webhook, invite Alex. All in CMS_SETUP.md.

---

**Previous update:** 2026-05-12 (Tuesday, post-meeting)
**Status:** Meeting Sunday May 3rd went well. **Client picked Square for the store and is keeping the marketing landing page we built.** Alex sent real tiramisu photos which are now wired into the site. Currently iterating on visual polish.

## Most recent session summary

- Tiramisu section now has real product photos on each flavor card
- New editorial shots (layer cross-section, branded duo, honeycomb trio) added to gallery
- The Tiramisu component was refactored to show image at top of each card with text/prices below
- Inside the section there's now a prominent "Order online" CTA pointing to `brand.shopUrl` (Square shop URL — user added this between sessions)
- Static build still works (6.5 MB out folder, 20 gallery photos)

---

## Who's who

- **Me (the user):** RK · Ryan Kane · `rykane89@gmail.com` · `267-810-9298` · Philadelphia. Just starting this freelance design/dev work. Elephantaes is one of my first paid projects. The husband is a friend; this is friends-and-family rate work.
- **Alex:** the baker. Owner of Elephantaes Cakes & Delicacies. Philadelphia. Solo operator. Specializes in custom celebration cakes, weekend tiramisu, cookie boxes. Recent collab with Mr Rabbit Coffee (Philly).
- **The husband (friend, name not stored):** the buying contact. Said "money isn't a problem if there's value." Promised at minimum his own page plus 2 referrals. Anchored at $500 verbally for the bakery site at a hangout, which I honored.

---

## The two business artifacts already delivered

### 1. Pricing menu PDF — `/rk-services-pricing.pdf`

Three-tier (Family / Friend / Standard) services menu covering:

- **Storefront** ($500 / $750 / $1,500) — custom landing page
- **Storefront + Funnel** ($1,200 / $1,800 / $2,800) — landing + email funnel + social templates
- **Full Brand Lift** ($2,500 / $3,200 / $4,500) — funnel + brand strategy + content kit
- **Care Plans** Bronze / Silver / Gold ($49–$499/mo across tiers)
- À la carte add-ons (extra page, logo refresh, copy, etc.)

Sent to the husband earlier. He's seen this and the family-rate column.

### 2. Phase 2 proposal PDF — `/elephantaes-phase-2-proposal.pdf`

10-page proposal for adding online ordering to the existing site. Tailored specifically for Alex/Elephantaes. Three paths:

- **Path 01 — Pre-Order Light** ($800 family) · Stripe Buy Buttons, no shop. 2 weeks.
- **Path 02 — The Weekend Shop** ($1,400 family, recommended) · Full /shop page, cart, BNPL, Airtable menu, capacity caps. 4 weeks.
- **Path 03 — Studio Platform** ($3,000 family) · Path 02 + subscriptions + wholesale portal + customer accounts + loyalty. 6 weeks.

Includes a "smart play" recommendation page that pushes Path 02 first then phases Path 03 features over months 4–6 as proven needed (saves $600+ in most cases).

**Page 10 sign-off shows all-in totals** ($500 site + Phase 2):
- Path 01 → $1,300 all-in
- Path 02 → $1,900 all-in
- Path 03 → $3,500 all-in
- Wait → $500 only, revisit ordering in 60 days

---

## The marketing site (Phase 1) — what's built

Custom Next.js (App Router) site at `/site`, built with Tailwind 4 + Framer Motion. Fully static export ready for Netlify.

### Sections shipped, in page order

1. **Intro animation** — full-screen cream curtain with the actual logo (transparent PNG cropped from `/site/public/logo.jpg` → `/site/public/logo-mark.png`). Plays once per session via `sessionStorage`. Skippable. Honors `prefers-reduced-motion`.
2. **ScrollProgress** — thin honey gradient hairline at viewport top.
3. **Header** — fixed, logo + nav + magnetic "Order a cake" CTA.
4. **Hero** — "Cakes that taste like the good part of the day" with logo medallion, 3D cursor parallax, scroll-driven exit (scales/fades as you scroll past). Eyebrow "Philadelphia · Custom Cakes · Tiramisu".
5. **Collab section** — Mr Rabbit collab announcement with the IG image (`/gallery/mr-rabbit-collab.png`), wax-seal "This Weekend" stamp. Toggle-able via `collab.active` in `/site/lib/content.ts`.
6. **Signatures** — 4-card grid of offerings (Custom cakes, Tiramisu, Weddings, Cookie boxes).
7. **Tiramisu** — deep forest section with three flavor cards, real prices, wax-seal on Passion Fruit Honeycomb (Spring Release), pickup hours, DM/text CTAs.
8. **Marquee** — italic scrolling brand strip between Tiramisu and Gallery.
9. **Gallery** — 12 real curated photos from her Instagram, masonry layout. Photos at `/site/public/gallery/` with clean filenames.
10. **Story** — "Hi, I'm Alex" intro with sugar-flowers macro photo, two testimonials (Korean Dohl + vegan wedding).
11. **Journal** — newsletter signup + latest issue card (uses holiday cookie box photo as cover) + archive list.
12. **Inquiry** — form with Confetti animation on submit success. Fields wired in `/site/components/site/inquiry.tsx`. **Currently a stub — submits to setTimeout, doesn't actually email.**
13. **Footer** — Philly address, real phone (267-414-7861), IG link, Sat/Sun pickup hours.

### Special components

- `RevealText` — word-by-word entrance animation. Used on Tiramisu H2.
- `Magnetic` — cursor-follow wrapper for primary CTAs (header + hero).
- `WaxSeal` — animated stamp. Used on Tiramisu accent card and Collab section.
- `Confetti` — sugar-dust burst on form success.
- `Reveal` / `RevealText` — generic in-view fade-up wrappers.

### Things removed during iteration

- ❌ `CustomCursor` — was built but removed by user request ("it's so slow lol").
- ❌ Original decorative leaf SVGs in hero — removed (looked random).
- ❌ Small floating sprig + berries near hero medallion — removed.

---

## Deploy state

- **Static export configured** in `/site/next.config.ts` (`output: "export"`, `images: { unoptimized: true }`).
- **Output folder:** `/site/out/` (~5.4 MB, last built 2026-04-28).
- **Deploy method:** drag-and-drop `out/` to [app.netlify.com/drop](https://app.netlify.com/drop). Live in 30 seconds.
- **`netlify.toml` at project root** for git-based deploys (base = `site`, build = `npm run build`, publish = `out`).
- **Domain:** Alex doesn't have one yet. She'll grab `~$15/yr` in her name, I'll guide her through Namecheap/Porkbun.

---

## Important content + brand details

Stored in `/site/lib/content.ts` — single source of truth.

- **Phone:** (267) 414-7861 (Alex's, found in IG bio)
- **City:** Philadelphia
- **Pickup hours:** Saturday 9 AM – 12 PM, Sunday 2 PM – 5 PM
- **IG:** `@elephantaes.cakes` (https://www.instagram.com/elephantaes.cakes/)
- **Real tiramisu menu** (scraped from her IG, all USD):
  - Classic Italian: $8 (10oz) / $14 (20oz)
  - Strawberry: $9 / $16
  - Passion Fruit Honeycomb (spring): $12 / $18
- **Mr Rabbit:** Philly coffee shop, recent collab. `@mrrabbitphilly`
- **Brand voice:** warm, slightly editorial, Philly-grounded. Custom cakes for celebrations including Korean Dohl 1st birthdays, weddings, vegan options.

---

## Phase 1 financial state

- **Verbal agreement:** $500 family rate for the marketing site
- **Husband said this at a hangout when hyped up about the work**
- **Not paid yet.** Deposit/final TBD based on Sunday meeting.
- **Care Plan:** $49/mo family rate proposed but not yet committed.

---

## Phase 2 financial state

- **Proposal sent** (or about to be sent — user planning to email Friday/Saturday before Sunday meeting).
- **Email draft is final** — clean version with no em-dashes, three page-anchors (page 2, 7, 8), warm friend tone. Saved in chat thread.
- **Subject:** "For Sunday: Phase 2 proposal"
- **Husband to fill in [name] placeholder** before sending.

---

## Tone and language conventions (important)

The user is **strict about no em-dashes**. They called it out as an "AI tell" and asked to remove them. **All written deliverables (emails, PDFs, copy) avoid em-dashes** entirely. Use periods, commas, colons, parens, "and"/"but"/"so" instead.

- Compound-word hyphens are fine (set-and-forget, multi-page, etc.)
- Hyphens with spaces are fine (`some thing - other thing` is hyphen, not em-dash)
- Em-dash (—) and en-dash (–) are NOT fine in body copy

The voice across all artifacts:
- Friend-with-skin-in-the-game, not corporate
- Honest about being early-career ("just getting this off the ground")
- Confident but not cocky
- Warm but rigorous
- Uses contractions, occasional "lol"-adjacent casualness in personal communication
- Doesn't oversell

---

## Pricing model recap

Three tiers. The user advocates for them in person on a need-by-need basis.

| Tier | Who | Discount off Standard |
|---|---|---|
| **Family** | Spouses, parents, siblings, oldest friends | ~65% off |
| **Friend** | Folks they've broken bread with | ~40% off |
| **Standard** | Strangers, referrals (with small "referred by" courtesy on top) | Full price |

**Critical rule:** Family/Friend rates aren't transferable to referrals. If the husband sends people my way, those people pay Standard rate. The user has explained this in the email and the proposal.

**Referral kickback:** Every paying client a friend refers earns the friend a free month of their current Care Plan. Documented on the proposal terms page.

---

## Open threads (post-meeting)

1. ✅ Marketing site built
2. ✅ Pricing menu PDF delivered
3. ✅ Phase 2 proposal PDF delivered
4. ✅ Sunday meeting May 3rd — went well
5. ✅ **Decision: Square for the store**, keep the existing landing page as the marketing front
6. ✅ Real tiramisu photos from Alex integrated (3 flavor cards + 3 gallery additions)
7. ⏳ Marketing site not yet live on Alex's domain (she still needs to register one)
8. ⏳ Square shop URL — `brand.shopUrl` is referenced in tiramisu.tsx; confirm it's set to her actual Square store URL in `/site/lib/content.ts`
9. ⏳ Inquiry form is still a stub. Needs real email delivery wiring.
10. ⏳ Newsletter signup still a stub.
11. ⏳ Stripe-based Phase 2 (Path 02 from the original proposal) is essentially **replaced by Square**. The custom-cake inquiry flow stays as-is (DM/form), Square handles the standing-item commerce.

---

## What to do when this chat starts

**The decision was: keep the marketing landing page, use Square for the store.**

Open `tiramisu.tsx` first to understand the current state — there's an "Order online" CTA pointing to `brand.shopUrl` (which the user added to `lib/content.ts` between sessions to point at Alex's Square shop).

### Next probable to-dos (ask user which they want first)

1. **Confirm `brand.shopUrl` points to the real Square shop URL.** Read `/site/lib/content.ts` and check the `brand` object. If it's a placeholder, ask the user for the real URL.
2. **Domain setup for Alex.** She needs to register a domain (Namecheap or Porkbun, ~$15/yr). Walk her through it. Then point the domain at Netlify.
3. **Wire the inquiry form to real email delivery.** Recommend Resend (free tier covers her volume easily). Replace the `setTimeout` stub in `/site/components/site/inquiry.tsx` with a real fetch to `/api/inquiry` or a form-action that submits to Netlify Forms.
4. **Wire newsletter signup.** Pick a platform (Mailchimp / Kit / Buttondown). Replace stub.
5. **Deploy.** Build (`npm run build`), drag `/site/out/` to Netlify Drop, point Alex's domain at it.
6. **Optional polish.** More photo additions, copy tweaks, animation refinements.

### Important: Square is NOT the same as Stripe Phase 2

The previous proposal assumed Stripe + custom shop pages on the same site. **Alex went with Square instead**, which means:

- Square hosts the store separately (Square's own URL or a subdomain like `shop.elephantaescakes.com`)
- The landing page **links out** to Square via the "Order online" CTA in the Tiramisu section
- No custom checkout / cart / inventory code needed on our side
- No webhooks, no Netlify Functions, no architecture changes from static export
- Site stays static — fast, free hosting, simple

This is actually a **better outcome for the user** than building custom Stripe — Square handles everything (POS, inventory, customers, taxes) for a similar transaction fee.

### What Phase 2 (Stripe-based work) looks like now

The original proposal's Path 02/03 features (subscriptions, wholesale portal, loyalty) are mostly **moot for now** — Square handles standing-item commerce. If Alex eventually wants:
- **Subscriptions:** Square has subscription billing now too
- **Wholesale portal:** still custom build territory, future scope
- **Customer accounts/loyalty:** Square has built-in loyalty (consider before custom)

So the "Phase 2 proposal" PDF on disk is now a **historical reference** more than an active deliverable. The actual next phase is "make the marketing site bullet-proof for launch" not "build an e-commerce app."

---

## Important risks and constraints

1. **Real money = real risk.** Once Stripe is live, mistakes cost money or hurt customers. Test in Stripe test mode for at least a week before flipping to production.
2. **The user is early-career.** They have great taste and learn fast, but they need:
   - Tested code paths before deploys
   - A monitoring fallback (BetterStack free tier covers this)
   - Operational ownership clarity (they need to be available the first month after launch)
3. **The user uses Claude as a force multiplier.** They architect, design, and decide; Claude writes, refactors, and explains. Don't sell solutions that require deep on-call from the user without warning them.
4. **AI limits to be honest about:**
   - Can't be on-call when something breaks
   - Can't dial up a real customer to verify their experience
   - Vibe-coding doesn't catch every regression — for Path 02+, add a basic Playwright test for the happy-path checkout flow

---

## Files to know

```
C:/Users/rykan/Projects/Elephantaes/
├── netlify.toml                               # Deploy config
├── rk-services-pricing.pdf                    # Pricing menu (already sent to husband)
├── elephantaes-phase-2-proposal.pdf           # Phase 2 proposal (sent or about to send)
├── PROJECT_STATUS.md                          # This file
├── .pdf-build/
│   ├── pricing.html                           # Source for pricing PDF
│   ├── proposal.html                          # Source for proposal PDF
│   └── audit/                                 # Screenshots used for verification
└── site/
    ├── next.config.ts                         # Has output: "export" — flip when adding Phase 2
    ├── lib/content.ts                         # Single source of truth for copy/data
    ├── components/site/                       # All site components
    │   ├── intro.tsx                          # Curtain animation
    │   ├── hero.tsx                           # Hero with parallax + magnetic CTA
    │   ├── collab.tsx                         # Mr Rabbit collab section
    │   ├── tiramisu.tsx                       # Tiramisu menu with wax seal
    │   ├── signatures.tsx                     # 4-card grid
    │   ├── gallery.tsx                        # Masonry photo grid
    │   ├── story.tsx                          # "Hi, I'm Alex"
    │   ├── journal.tsx                        # Newsletter signup
    │   ├── inquiry.tsx                        # Form (stub) with confetti
    │   ├── footer.tsx                         # Contact + hours
    │   ├── marquee.tsx                        # Italic scroll strip
    │   ├── scroll-progress.tsx                # Top hairline
    │   ├── magnetic.tsx                       # Cursor-follow wrapper
    │   ├── wax-seal.tsx                       # Stamp component
    │   ├── confetti.tsx                       # Sugar-dust burst
    │   ├── reveal.tsx                         # Generic in-view fade
    │   └── reveal-text.tsx                    # Word-by-word reveal
    ├── public/
    │   ├── logo.jpg                           # Original logo
    │   ├── logo-mark.png                      # Transparent cropped mark for intro
    │   └── gallery/                           # 12 curated IG photos + collab image
    └── out/                                   # Static export target (regenerate with `npm run build`)
```

---

## Next-Next.js note

`/site/AGENTS.md` warns: "This is NOT the Next.js you know. This version has breaking changes. Read `node_modules/next/dist/docs/` before writing any code."

In practice, the patterns we've used (App Router, "use client" components, motion via framer-motion, image via next/image with `unoptimized: true`) have all worked cleanly. If something complex is needed in Phase 2 (API routes for Stripe webhooks, server actions for form submission), check the docs first per the agent note.

---

## Style/aesthetic reference

- **Color palette:** cream (`#f8f0d2`), forest green (`#2e4a2a`/`#1f3219`), honey (`#c9985c`), soft honey (`#e0b97b`), ink (`#1a2415`).
- **Typography:** Fraunces (display, variable), Allura (script, used sparingly), Inter (sans body).
- **Aesthetic:** editorial bakery, paper-grain texture, motion that rewards attention, accessibility-first (every animation honors `prefers-reduced-motion`).
- **PDFs match the same palette and Fraunces type system.**

---

## Conversation history summary

This project went through these phases of work:

1. Initial brief and pricing — user secured the contract, brought it to Claude
2. Site build — full site shipped in ~4 hours of vibe coding
3. Real content swap — scraped Alex's IG, replaced placeholders with real photos, real menu, real prices
4. Visual flare layer — intro animation, marquee, magnetic CTAs, wax seal, confetti, scroll progress
5. Mobile audit and polish
6. Pricing strategy conversation — user navigating friend-pricing dynamics, Family/Friend/Standard tiers established
7. Pricing menu PDF — first PDF deliverable
8. Phase 2 conversation — when husband asked about adding ordering and payment
9. Phase 2 proposal PDF — second PDF deliverable, three paths + smart-play recommendation
10. Email draft for sending proposal ahead of Sunday meeting
11. Sunday meeting (just happened) — outcome unknown to me yet

---

**End of handoff. When the next chat opens, ask the user how Sunday went.**
