# Newcastle Pharmacy Clinic: one site for two branches (built in a draft)

All work happens in a **draft**, so the live Kenton site stays exactly as it is until you accept it.

## What visitors will see
- **Landing page (pharmacy-clinic.com):** "Newcastle Pharmacy Clinic" with the new central logo. Two large cards, **Kenton** and **Chillingham Road**, each showing its address and phone number.
- **Kenton site (/kenton):** identical to today's site (home, NHS services, private treatments, contact, register).
- **Chillingham Road site (/chillingham-road):** the same pages and design, with:
  - Phone 0191 380 2405
  - Address 225 Chillingham Road, Newcastle upon Tyne, NE6 5LJ
  - Its own map
  - The same services and free delivery across Newcastle
  - Opening hours copied from Kenton as a stand-in until you send the real ones
- The header shows which branch you're on, plus a small "switch branch" link.
- The privacy, cookie and patient notices are shared by both branches.

## Forms and emails
- Each enquiry is saved with its branch (Kenton or Chillingham Road).
- Alerts for both branches go to habib.jiwa2@nhs.net (full details, with call and reply buttons) and habibjiwa@hotmail.co.uk (the "check your NHS inbox" heads-up, with no patient details).
- Email subjects and the patient's confirmation name the correct branch, address and phone number.

## Staff dashboard
- One login, as today, with a branch label on every enquiry and a filter for All, Kenton or Chillingham Road.

## Logo
- You attach the PDF in chat and I turn it into a sharp image for the landing page, both branch headers and emails. The current logo stays until it arrives.

## Old links
- Existing addresses like /services, /contact and /register redirect to their Kenton versions, so Google results and shared links keep working.

## Technical details
- Branch config lives in one file (name, phone, address, map, hours). The pages become `$branch` routes validated against that config, and the landing page is index.tsx.
- Migration: add `branch text not null default 'kenton'` to `enquiries`, check the value against the known branches, and add an index. Existing rows become Kenton.
- The enquiry functions, email templates, notification sender, MCP tools, sitemap and per-branch head/JSON-LD all take the branch into account.
- Old top-level routes redirect permanently to /kenton/*.

## Shared branding
- Anything both branches share uses **Newcastle Pharmacy Clinic** instead of "Kenton Pharmacy Clinic". That covers the footer, privacy, cookie and patient notices, the staff dashboard, the email sender name and footers, page titles on the landing page, and Google listing details.
- Branch pages say "Kenton" or "Chillingham Road" only where the details belong to that branch, such as the address, phone, map, hours, and the branch name in the header.
