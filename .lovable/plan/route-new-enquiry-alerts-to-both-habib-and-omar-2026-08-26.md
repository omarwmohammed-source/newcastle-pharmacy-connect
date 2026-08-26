# Route new-enquiry alerts to both Habib and Omar

## Goal
When a patient submits an enquiry, the staff alert email should go to both **Habib.jiwa2@nhs.net** and **omarwmohammed@gmail.com**.

## Current state
- `src/lib/staff-access.ts` defines a single `PHARMACY_INBOX` used as the alert recipient and the customer reply-to.
- `src/lib/enquiry-notify.server.ts` sends the `new-enquiry` template once to `PHARMACY_INBOX`.
- Customer confirmation email is unaffected.

## Plan
1. **Update `src/lib/staff-access.ts`**
   - Keep `PHARMACY_INBOX` as the visible business reply-to address (`habib.jiwa2@nhs.net`).
   - Add `STAFF_NOTIFICATION_EMAILS` array containing both `habib.jiwa2@nhs.net` and `omarwmohammed@gmail.com`.

2. **Update `src/lib/enquiry-notify.server.ts`**
   - Import `STAFF_NOTIFICATION_EMAILS`.
   - For each staff address in the array, send the `new-enquiry` template with a unique idempotency key (`new-enquiry-${enquiry.id}-${recipient}`) so each recipient is a distinct, traceable send.
   - Keep the customer acknowledgement email exactly as it is.

3. **Update the admin email settings page (if it displays the recipient)**
   - Show the list of staff notification recipients so it is clear where alerts are going.

## Outcome
Both staff members receive an individual new-enquiry alert email; the customer still receives one confirmation email; reply-to remains the main pharmacy inbox.
