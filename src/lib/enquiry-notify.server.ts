// Server-only: alerts the pharmacy when a new enquiry arrives.
import type { EnquiryInput } from "./enquiries-schema";
import { PHARMACY_INBOX } from "./staff-access";

export async function notifyNewEnquiry(
  enquiry: EnquiryInput & { id: string },
): Promise<void> {
  try {
    const { sendTemplateEmail } = await import(
      "@/lib/email-templates/send-email"
    );
    const result = await sendTemplateEmail("new-enquiry", PHARMACY_INBOX, {
      idempotencyKey: `new-enquiry-${enquiry.id}`,
      replyTo: enquiry.email || undefined,
      templateData: {
        fullName: enquiry.fullName,
        phone: enquiry.phone,
        email: enquiry.email,
        serviceName: enquiry.serviceName,
        message: enquiry.message,
        source: enquiry.source,
        submittedAt: new Date().toLocaleString("en-GB", {
          timeZone: "Europe/London",
        }),
      },
    });
    if (!result.sent) {
      console.warn(
        `[enquiries] alert not sent for ${enquiry.id}: ${result.reason}`,
      );
    }
  } catch (error) {
    // Never let an email problem lose a submission.
    console.error("[enquiries] alert failed", error);
  }
}
