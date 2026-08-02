// Server-only: alerts the pharmacy when a new enquiry arrives.
// Email delivery activates once a verified sender domain is configured for the
// project. Until then this records the enquiry in the server log and resolves
// without throwing, so a form submission is never lost to an email problem.
import type { EnquiryInput } from "./enquiries-schema";
import { PHARMACY_INBOX } from "./staff-access";

export async function notifyNewEnquiry(
  enquiry: EnquiryInput & { id: string },
): Promise<void> {
  try {
    console.info(
      `[enquiries] new enquiry ${enquiry.id} for ${PHARMACY_INBOX} — ${enquiry.serviceName} — ${enquiry.fullName} — ${enquiry.phone}`,
    );
  } catch (error) {
    console.error("[enquiries] alert failed", error);
  }
}
