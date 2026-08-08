// Business addresses that are allowed to self-claim staff access to /admin,
// and the inbox that new-enquiry alerts are sent to once a verified sender
// domain is configured for the project.
export const PHARMACY_INBOX = "habib.jiwa2@nhs.net";

export const STAFF_ALLOWLIST = [
  PHARMACY_INBOX,
  "habib@pharmacy-clinic.com",
  "omarwmohammed@gmail.com",
];

export function isAllowlistedStaffEmail(email: string | null | undefined) {
  if (!email) return false;
  return STAFF_ALLOWLIST.includes(email.trim().toLowerCase());
}
