# Website verification
- [x] Investigate the reported browser crash and provide safe full-page recovery; no crash reproduced in clean browser checks.
- [x] Check both branches, shared pages, navigation, maps, and contact links.
- [x] Verify registration dialogs and real form submission through the staff dashboard.
- [x] Verify dashboard filters, status persistence, email settings save/test, custom template create/read/delete, and sign-out.
- [x] Check mobile and desktop layouts and record verification limits below.

## Verification limits
- The screenshot's DOM-removal error did not recur during browser navigation or an external text-mutation simulation. Its exact cause remains unverified; shared error handling now offers a full reload instead of attempting to reuse a potentially damaged DOM.
- Email service accepted both branches' staff alerts, personal heads-ups and patient confirmations. Inbox placement cannot be verified.
- Telephone/email links were checked for correct destinations; no real calls were placed.
- Two labelled test enquiries remain marked Done. The temporary custom template was deleted. No real patient record was changed.
- All checks used the current local preview; these changes have not been published.