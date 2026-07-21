# Kenton Pharmacy Clinic — website plan

Simple, trustworthy multi-page site inspired by the layout/simplicity of heatonroadpharmacy.co.uk, styled around the uploaded logo (navy + green cross). Name used throughout: **Kenton Pharmacy Clinic**.

## Routes (TanStack Start, file-based)

```
src/routes/
  __root.tsx          -> shared header (logo + nav + phone) and footer
  index.tsx           -> Home
  services.tsx        -> NHS Services (index + service cards)
  private.tsx         -> Private Services (Weight Loss, Insomnia)
  contact.tsx         -> Contact + opening hours + map
  register.tsx        -> Register interest form (accepts ?service=... query)
```

Each route file gets its own `head()` with a unique title/description/og tags (Newcastle + Kenton + NE3 keywords). Nav uses `<Link>` with active states.

## Shared chrome (in `__root.tsx`)

- **Top strip**: phone `0191 205 2006` (click-to-call) · address `41 Halewood Avenue, Newcastle, NE3 3RX`.
- **Header**: logo left, name "Kenton Pharmacy Clinic" + tagline, nav right: Home · NHS Services · Private Services · Contact · **Register** (button-styled CTA).
- **Footer**: logo, address, phone, opening hours summary, small print.

## Home (`/`)

- Hero: pharmacy name, one-line intro ("Your trusted community pharmacy in Kenton, Newcastle"), primary CTA "Register your details" → `/register`, secondary "View services" → `/services`.
- Short "What we do" — 3 tiles: NHS Services, Private Clinics, Prescriptions.
- Opening hours block: Mon–Fri 8:30–18:00 · Sat 9:00–18:00 · Sun closed.
- Find us: address + embedded Google Map iframe for NE3 3RX.

## NHS Services (`/services`)

Grid of service cards, each with title, one-line description, and a "Register interest" button that links to `/register?service=<name>`.

- Pharmacy First (covers Earache, Sinusitis, Sore Throat, UTIs in Women, Shingles, Impetigo, Infected Insect Bites — listed inside the card)
- Prescriptions & EPS
- Blood Pressure Check
- Contraception
- Stop Smoking Service
- Flu Vaccination
- New Medicine Service
- Discharge Medicines
- Disposal of Medicines
- Emergency Dispensing

## Private Services (`/private`)

Same card pattern, visually distinct (subtle tint + "Private" badge):
- Weight Loss Clinic
- Insomnia Clinic

Each card has its own "Register interest" button → `/register?service=<name>`.

## Register (`/register`)

Single shared form page. Reads `?service=` from the URL and pre-selects it. Fields:
- Full name (required)
- Phone (required)
- Email (optional)
- Date of birth (optional)
- Service (dropdown of all NHS + private services, pre-filled)
- Message / details (optional)
- Consent checkbox (required)

Zod validation, shadcn form primitives. On submit → success screen "Thanks — we'll be in touch shortly."

**Where submissions go:** in this first build, submissions are handled client-side and show a confirmation only (nothing stored). To actually save enquiries so you can view them later, we'd enable Lovable Cloud (free managed backend) — flagged as an open question below.

## Contact (`/contact`)

- Address, phone (click-to-call), email placeholder (you can send me one to swap in).
- Full opening hours table.
- Embedded Google Map for 41 Halewood Ave, NE3 3RX.
- Small "Register your interest" CTA → `/register`.

## Design

- Style reference: heatonroadpharmacy.co.uk — clean, generous whitespace, blue navy primary, green accent from the cross, off-white background, rounded cards with soft borders. No hero photography, no gradients.
- Semantic color tokens defined in `src/styles.css` (`--primary`, `--accent`, `--background`, etc.) so nothing is hardcoded.
- Type: clean sans (Inter or similar), single H1 per page, semantic HTML, alt text on the logo.
- Fully responsive; mobile nav collapses to a sheet menu.

## Assets & tech

- Upload logo via `lovable-assets` from `/mnt/user-uploads/image.png`, import the asset pointer, use in header + footer + favicon.
- shadcn primitives: `button`, `input`, `textarea`, `label`, `select`, `checkbox`, `sheet` (mobile nav), `sonner` (toasts). Zod for validation.
- Every route registers its own `head()` metadata; og:image omitted (no meaningful hero image yet).

## Open question before I build

Do you want form submissions **saved** somewhere you can view later (a list of enquiries in an admin view, optionally emailed to you)? That needs Lovable Cloud enabled — free, managed, no external accounts. If yes, I'll wire it up in the same build; if no, the form will just show a "thanks" confirmation.
