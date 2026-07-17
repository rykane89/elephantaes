# CMS Setup Guide (for Ryan)

## Round 2 rollout (2026-07-17): everything editable

Four new content types were added (What we bake cards, The baker bio, Journal, Site settings). To roll out:

1. Deploy the updated studio: `cd studio` then `npm run deploy`
2. Create a temp write token (sanity.io/manage → API → Tokens → Editor), then in PowerShell from `/studio`:
   `$env:SANITY_STUDIO_PROJECT_ID="yxd68kno"; $env:SANITY_WRITE_TOKEN="sk..."; node seed-round2.mjs`
3. Delete the token
4. Push the site code: `git add -A; git commit -m "CMS round 2: bio, journal, cards, settings"; git push`
5. Netlify rebuilds; verify elephantaes.com looks identical, then spot-check by editing the bio in the studio and publishing

Note: header and hero copy are intentionally NOT in the CMS (art-directed typography). If Alex asks, that's a Ryan job.

---

## Original setup (2026-07-03)

Goal: Alex logs into a friendly editor, changes photos/cards/prices, hits Publish, and the live site updates in about 2 minutes. No involvement from you after setup.

## What was built this session

- `/studio` - a Sanity Studio project (the admin panel). Three content types: Gallery photos, Tiramisu flavours, Collab banner.
- `/site/lib/cms.ts` - fetches published content from Sanity at build time. If Sanity isn't configured or is unreachable, it falls back to the hardcoded content in `lib/content.ts`, so builds never break.
- `Collab`, `Tiramisu`, and `Gallery` components now take content as props from `app/page.tsx`.
- `next.config.ts` allows images from `cdn.sanity.io`.
- `/studio/seed.mjs` - one-time script that uploads the current photos and content into Sanity so the studio starts pre-filled.

Everything still builds identically today with zero config. The CMS activates only once the env vars are set.

## Setup steps, in order

### 1. Put the code on GitHub

Netlify has to build the site automatically whenever content changes, so drag-and-drop deploys are out.

```
cd C:/Users/rykan/Projects/"Obsidian Work Brain"/Elephantaes
git init
git add .
git commit -m "Elephantaes site + Sanity studio"
```

Create a private repo at github.com/new (e.g. `elephantaes`), then:

```
git remote add origin https://github.com/YOUR_USERNAME/elephantaes.git
git push -u origin main
```

Note: `netlify.toml` at the repo root already tells Netlify: base `site`, build `npm run build`, publish `out`. Double-check it still says that.

### 2. Connect Netlify to the repo

1. app.netlify.com → your existing Elephantaes site → Site configuration → Build & deploy → Link repository (or create a new site with "Import from Git" and move the domain over).
2. Confirm base directory `site`, build command `npm run build`, publish directory `site/out` (from netlify.toml).
3. Deploy once. The site should look identical to the drag-and-drop version (it's still using fallback content at this point).

### 3. Create the Sanity project

1. Go to sanity.io and sign up (Google login is fine). Free plan covers this easily.
2. sanity.io/manage → Create project. Name it "Elephantaes". Dataset: `production`.
3. Copy the Project ID (short string like `ab12cd34`).

### 4. Configure and deploy the studio

```
cd studio
npm install
copy .env.example .env      # then paste the Project ID into SANITY_STUDIO_PROJECT_ID
npm run dev                 # test locally at localhost:3333, log in with your Sanity account
npm run deploy              # hosts it at https://elephantaes.sanity.studio
```

If `elephantaes` is taken as a studio host name, pick another in `sanity.cli.ts` (`studioHost`).

### 5. Seed the current content

1. sanity.io/manage → project → API → Tokens → Add token, name "seed", permissions Editor. Copy it.
2. From `/studio`:

```
SANITY_STUDIO_PROJECT_ID=ab12cd34 SANITY_WRITE_TOKEN=sk... node seed.mjs
```

(On Windows PowerShell: `$env:SANITY_STUDIO_PROJECT_ID="ab12cd34"; $env:SANITY_WRITE_TOKEN="sk..."; node seed.mjs`)

3. Open the studio. All 15 gallery photos, 3 tiramisu flavours, and the collab banner should be there.
4. Delete the token afterwards (API → Tokens).

### 6. Point the site at Sanity

Netlify → Site configuration → Environment variables:

- `NEXT_PUBLIC_SANITY_PROJECT_ID` = the project ID
- `NEXT_PUBLIC_SANITY_DATASET` = `production`

Trigger a redeploy. The site now builds from Sanity content. Verify it still looks right.

### 7. Auto-rebuild on publish (the magic part)

1. Netlify → Site configuration → Build & deploy → Build hooks → Add build hook. Name "Sanity publish". Copy the URL.
2. sanity.io/manage → project → API → Webhooks → Create webhook:
   - Name: "Rebuild Netlify"
   - URL: the build hook URL
   - Dataset: `production`
   - Trigger on: Create, Update, Delete
   - Leave filter empty, HTTP method POST
3. Test: change a price in the studio, hit Publish, watch Netlify start a build. Site updates in ~2 min.

### 8. Invite Alex

sanity.io/manage → project → Members → Invite. Her email, role **Editor**. She logs in at `https://elephantaes.sanity.studio` with Google.

Send her `FOR_ALEX_EDITING.md`.

## Costs

- Sanity free plan: 3 users, plenty of documents/assets/bandwidth for this site. $0.
- Netlify free plan: 300 build minutes/month. Each publish burns ~2-3 min, so even 50 edits/month is fine. $0.

## Gotchas

- Content changes require Publish in the studio (drafts don't show on the site).
- If Alex deletes ALL gallery photos, the site falls back to the old hardcoded set rather than showing an empty gallery. Same for tiramisu. That's intentional.
- The collab banner hides entirely when "Show on the site" is off.
- Local builds without `.env.local` use fallback content. That's fine for dev.
- Ordering: photos and flavours sort by the "Position" number field, lowest first. Seeded items are 10, 20, 30... so inserting between is easy (e.g. 15).
