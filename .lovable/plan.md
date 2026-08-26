# Stop enquiry emails landing in Junk

## The honest picture first

Your email setup is healthy: the domain `notify.pharmacy-clinic.com` is verified, and the delivery log shows every enquiry email is being **sent successfully** to habib.jiwa2@nhs.net. Nothing is failing — the emails are arriving, but the receiving mail provider (NHS mail / Outlook / Gmail) is filing them into Junk.

No website or sender can force an email into the "Primary" tab — that decision is made entirely by the recipient's mail provider, based on **sender reputation**. Your domain is brand new (only a handful of emails ever sent), so providers treat it with suspicion until it builds history. This is normal and fixable.

## What I'll change in the code (things we control)

1. **Improve the staff alert email content** — spam filters score the content itself:
   - Clearer, less "alert-like" subject line (e.g. `New enquiry: Weight Management — Sarah Ahmed` instead of anything with "URGENT"/"NEW REQUEST" styling)
   - Add a proper plain-text version alongside the HTML (missing plain text is a spam signal)
   - Make sure the From name shows as "Kenton Pharmacy Clinic" and set Reply-To to the enquirer's email address, so replying goes straight to the patient
   - Remove anything that looks like marketing/bulk-mail formatting

2. **Same clean-up for the customer confirmation email** so patients' copies also land in inbox.

## What you need to do (recipient side — this is what actually fixes it)

These steps train the mail providers that your emails are wanted. They matter more than any code change:

1. **In the NHS mailbox (habib.jiwa2@nhs.net):** open Junk, right-click an enquiry email → "Mark as not junk" / "Never block sender". Do this for each one already there.
2. **Add the sender to contacts/safe senders:** add `noreply@notify.pharmacy-clinic.com` (the exact sending address) to the NHS mailbox's Safe Senders list and address book.
3. **Reply to one of the enquiry emails** (even just "received") — replying is one of the strongest trust signals.
4. **Patients (Gmail/Hotmail/iCloud):** same idea — if a confirmation lands in junk, marking it "Not spam" once usually fixes it permanently for that mailbox.

## Ongoing

- Reputation builds with volume and time. After a few weeks of regular, non-bounced sends, placement improves on its own.
- Avoid blasting many test emails at once from the admin panel — bursts from a new domain hurt reputation.

## Technical details

- Files touched: `src/lib/email-templates/new-enquiry.tsx`, `enquiry-confirmation.tsx`, possibly `send-email.ts` (reply-to + plain text).
- No DNS or domain changes needed — SPF/DKIM are already correct via the verified delegation.
- No third-party service needed; switching providers would not fix a new-domain reputation problem anyway.
