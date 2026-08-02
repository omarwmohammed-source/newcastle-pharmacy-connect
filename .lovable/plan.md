## Goal
Turn the "Register interest" forms from toast-only into a real, GDPR-appropriate pipeline: submissions stored securely, viewable in a staff-only admin page, and emailed to the pharmacy.

## What gets built

**1. Backend (Lovable Cloud)**
- Enable Lovable Cloud (managed database + auth, no external account needed).
- Table `enquiries`: name, phone, email, service, notes, consent flag, page source, created_at.
- Row-level security: nobody can read enquiries except signed-in staff; inserts allowed from the public form only through a server function that validates input.
- Staff roles kept in a separate `user_roles` table with an `admin` role (secure pattern, no privilege escalation).
- Retention: kept indefinitely for now, with a note that we can add auto-deletion later.

**2. Forms on the site**
- `RegisterInterestDialog` and `/register` submit to a server function instead of just showing a toast.
- Fields: name, phone, email, service (pre-filled from the card clicked), optional notes, plus a required consent checkbox with GDPR wording.
- Validation with Zod on both client and server; success/failure states with clear messages.

**3. Email alerts**
- Each new enquiry triggers an email to the pharmacy with the submitted details.
- This needs a sender domain you own (e.g. kentonpharmacyclinic.co.uk). If you don't have one set up yet, I'll build everything else and show you the one-click domain setup step — alerts start flowing as soon as that's verified.

**4. Admin page (`/admin`)**
- Sign-in (email + password) for pharmacy staff.
- Table of all enquiries, newest first, with search by name/phone and filter by service.
- Detail view per enquiry, plus CSV export.
- Only accessible to accounts with the admin role; everyone else is redirected.

**5. Privacy & cookies**
- `/privacy` page: UK pharmacy-appropriate privacy notice — what's collected, why, lawful basis, storage/security, retention, and how to request deletion.
- `/cookies` section covering the fact the site uses no tracking cookies, only essential ones.
- Links to both in the footer, and a short consent line under each form.

## Technical notes
- Storage and auth via Lovable Cloud; all traffic over HTTPS, data encrypted at rest.
- Writes go through a TanStack server function (`src/lib/enquiries.functions.ts`) so the public never touches the database directly.
- Admin routes live under an authenticated route group so unauthenticated visitors never load enquiry data.
- Existing navy/gold branding, EB Garamond headings, logo and NHS badge stay exactly as they are.

## After the build
I'll give you the steps to create your admin login, and confirm the email address alerts should go to.
