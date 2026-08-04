# NHS patient privacy notice: full page, banner and popup

Add the "How we look after and safeguard information about you" notice from your document to the site, in full, so it is visible everywhere without getting in the way.

## What you'll see

**1. A bottom banner on every page**
A discreet, dismissible strip fixed to the bottom of the site: "We keep records about you and your care. Read how we look after your information." with a "Read notice" button and a close (x). Once dismissed it stays dismissed (remembered in the browser), so patients aren't nagged on every page.

**2. A popup with the notice in full**
"Read notice" opens a scrollable dialog containing the complete text of your document — Information recorded, Processing information (Your care / Our payments / Management), Your rights, Your right to view your health record, and the Data Protection Officer details (Habib Jiwa, habib@pharmacy-clinic.com). Working links to nhs.uk/yournhsdatamatters and the ICO. The same popup can be opened from a footer link.

**3. A full page at /patient-privacy**
The same content as a normal readable web page, so it can be linked to, printed, bookmarked and indexed by Google. The popup includes a "View as full page" link.

**4. Footer and existing privacy page tie-in**
The footer gets a "Patient privacy notice" link next to the existing Privacy and Cookie links. The existing `/privacy` page (which covers website form data) gets a short cross-reference to the new NHS patient notice, so the two don't look contradictory.

## Design

Reuses the existing navy/gold theme, EB Garamond headings and shadcn Dialog — same spacing, type and colours as the rest of the site, so it reads as part of the website rather than a bolted-on legal block. Banner sits above content on mobile without covering the register buttons.

## Technical notes

- `src/lib/patient-privacy-content.tsx` — the notice content as structured sections, single source of truth shared by the page and the dialog.
- `src/components/site/PatientPrivacyNotice.tsx` — the dialog (shadcn Dialog + ScrollArea) with an exported open handler.
- `src/components/site/PrivacyBanner.tsx` — fixed bottom banner, dismissal stored in `localStorage` and read in `useEffect` to avoid hydration mismatch.
- `src/routes/patient-privacy.tsx` — new route with its own `head()` (title, description, canonical, OG/Twitter tags matching the existing route pattern).
- `src/routes/__root.tsx` — render the banner once inside the layout.
- `src/components/site/Footer.tsx` — add the footer link.
- `src/routes/sitemap[.]xml.ts` — add the new route.

Text is reproduced verbatim from your document; no claims are added or changed.
