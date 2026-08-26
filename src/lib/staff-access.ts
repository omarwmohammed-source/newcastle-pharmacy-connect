// Business addresses that are allowed to self-claim staff access to /admin,
// and the inboxes that new-enquiry alerts are sent to once a verified sender
// domain is configured for the project.
export const PHARMACY_INBOX = "habib.jiwa2@nhs.net";
export const PHARMACY_PHONE = "0191 205 2006";

export const STAFF_NOTIFICATION_EMAILS = [PHARMACY_INBOX];

/** Gets a heads-up only — never any patient details. */
export const ACTION_ALERT_EMAIL = "habibjiwa@hotmail.co.uk";

export const STAFF_ALLOWLIST = [
  ...STAFF_NOTIFICATION_EMAILS,
  "habib@pharmacy-clinic.com",
  "omarwmohammed@gmail.com",
];

export function isAllowlistedStaffEmail(email: string | null | undefined) {
  if (!email) return false;
  return STAFF_ALLOWLIST.includes(email.trim().toLowerCase());
}

