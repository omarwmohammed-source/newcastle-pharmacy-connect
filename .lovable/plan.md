## Goals

1. Fix the header so the logo blends in cleanly (no circle crop, no ring) and use a Garamond-style serif for the brand wordmark matching the logo.
2. Make it obvious across the site that Kenton Pharmacy Clinic serves **all of Newcastle** and offers **free prescription delivery**.
3. Add a comprehensive **NHS Services catalogue page** modelled on healthera.co.uk/app/services, with a "Register interest" form for each service capturing name, phone, email (and service).

## 1. Header + logo cleanup

- Replace the circular avatar treatment in `src/components/site/Logo.tsx` with a clean rectangular logo lockup: `object-contain`, transparent background, no `rounded-full`, no `ring`. The navy from the logo already matches the navy header, so the logo will visually sit flush inside the bar.
- Bump the logo height so it reads clearly (~44px header / ~56px on larger screens) and give the header a touch more vertical padding so it doesn't feel cramped.
- Wordmark next to the logo uses the Garamond-style serif (see §2). Keep "Kenton Pharmacy Clinic" as the primary line; drop the "Newcastle · NE3" small caps under it (the delivery banner will carry the location message instead).

## 2. Typography — Garamond serif

- Load **EB Garamond** (closest free Google Font to the logo's typeface) via a `<link>` tag in `src/routes/__root.tsx` head (Tailwind v4 forbids remote `@import` in `styles.css`).
- Register `--font-serif: "EB Garamond", Georgia, serif;` inside `@theme` in `src/styles.css` so `font-serif` utility works.
- Apply the serif to: the header wordmark, all page `h1`/`h2` headings (hero, section titles, service names). Body copy and UI stay in the current sans for readability.

## 3. Newcastle-wide + free delivery messaging

- Add a slim **announcement strip** just above the header (or as the top row of the header on desktop) reading e.g. *"Free prescription delivery across Newcastle — call 0191 205 2006"* with a phone link. Visible on all pages.
- Update the homepage hero subheading (`src/routes/index.tsx`) to lead with "Serving all areas of Newcastle upon Tyne with free prescription delivery."
- Add a small "Free delivery across Newcastle" highlight card in the homepage feature row and a matching line in the Footer.
- Add `deliveryArea` and `freeDelivery: true` fields to `PHARMACY` in `src/lib/pharmacy-data.ts` so the copy is centralised.

## 4. NHS Services catalogue page (Healthera-style)

Rework `src/routes/services.tsx` into a proper catalogue:

- **Intro band**: "Browse our NHS pharmacy services" + one-line summary + reassurance that all NHS pharmacy services are available.
- **Featured row** (3 cards): Pharmacy First, Prescriptions & EPS, Blood Pressure Check.
- **All services grid**: alphabetised list of NHS services, each rendered as a card with:
  - Service name (serif heading)
  - Short description (Healthera-style single-sentence summary)
  - "Register interest" button → opens a modal form pre-filled with the service.
- Expand `NHS_SERVICES` in `src/lib/pharmacy-data.ts` with a broader NHS catalogue (Healthera-inspired, wording ours), e.g.: Pharmacy First, Prescriptions & EPS, Free Prescription Delivery, Blood Pressure Check, Contraception (ongoing supply), Emergency Contraception, Stop Smoking Support, Flu Vaccination (NHS), COVID Vaccination (eligible patients), New Medicine Service, Discharge Medicines Service, Emergency Dispensing, Disposal of Unwanted Medicines, Minor Ailments advice, Healthy Living advice, Substance Misuse support, Travel Health advice, Diabetes support, Asthma inhaler technique.

## 5. Per-service Register Interest form (modal)

- New `src/components/site/RegisterInterestDialog.tsx` — shadcn `Dialog` wrapping a compact form (Name, Phone, Email, Preferred contact time, Notes, hidden Service field, consent checkbox). Reuses the Zod schema already in `src/routes/register.tsx`.
- Update `ServiceCard` to trigger the dialog instead of navigating to `/register` (keep the standalone `/register` page as a fallback linked from the header CTA).
- On submit, show a success toast — no backend wiring in this pass (matches current behaviour). Note in the plan: enabling Lovable Cloud later would let us store enquiries; not doing it now unless asked.

## 6. SEO + head metadata

- Update `src/routes/services.tsx` head to reflect the new catalogue framing (title/description mention "all NHS pharmacy services" and "free delivery across Newcastle").
- Update root `__root.tsx` description to include "free prescription delivery across Newcastle".

## Files touched

- `src/components/site/Logo.tsx` — clean lockup, serif wordmark, drop ring/circle.
- `src/components/site/Header.tsx` — announcement strip, spacing, remove circular styling.
- `src/components/site/Footer.tsx` — add delivery line.
- `src/components/site/ServiceCard.tsx` — open dialog instead of link.
- `src/components/site/RegisterInterestDialog.tsx` — **new**.
- `src/routes/__root.tsx` — Garamond `<link>`, meta description tweak.
- `src/routes/index.tsx` — hero copy, delivery highlight.
- `src/routes/services.tsx` — catalogue layout.
- `src/lib/pharmacy-data.ts` — expanded NHS list + delivery flags.
- `src/styles.css` — `--font-serif` in `@theme`.

## Out of scope

- No backend/storage for form submissions (toast only).
- No changes to the Private Treatments page beyond consistency (serif headings).
