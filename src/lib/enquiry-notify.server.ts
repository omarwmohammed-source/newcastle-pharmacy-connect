// Server-only: alerts the pharmacy when a new enquiry arrives.
import type { EnquiryInput } from "./enquiries-schema";
import {
  PHARMACY_INBOX,
  PHARMACY_PHONE,
  STAFF_NOTIFICATION_EMAILS,
} from "./staff-access";

export async function notifyNewEnquiry(
  enquiry: EnquiryInput & { id: string },
): Promise<void> {
  // Alert each staff recipient individually so every send is traceable.
  for (const staffEmail of STAFF_NOTIFICATION_EMAILS) {
    try {
      const { sendTemplateEmail } = await import(
        "@/lib/email-templates/send-email"
      );
      const result = await sendTemplateEmail("new-enquiry", staffEmail, {
        idempotencyKey: `new-enquiry-${enquiry.id}-${staffEmail}`,
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
          `[enquiries] alert not sent to ${staffEmail} for ${enquiry.id}: ${result.reason}`,
        );
      }
    } catch (error) {
      // Never let an email problem lose a submission.
      console.error(`[enquiries] alert failed for ${staffEmail}`, error);
    }
  }

  // Acknowledgement to the customer (only when they gave an email address).
  if (!enquiry.email) return;

  try {
    const { sendTemplateEmail } = await import(
      "@/lib/email-templates/send-email"
    );
    const result = await sendTemplateEmail(
      "enquiry-confirmation",
      enquiry.email,
      {
        idempotencyKey: `enquiry-confirmation-${enquiry.id}`,
        replyTo: PHARMACY_INBOX,
        templateData: {
          fullName: enquiry.fullName?.split(" ")[0] || "there",
          serviceName: enquiry.serviceName,
          phone: PHARMACY_PHONE,
        },
      },
    );
    if (!result.sent) {
      console.warn(
        `[enquiries] confirmation not sent for ${enquiry.id}: ${result.reason}`,
      );
    }
  } catch (error) {
    console.error("[enquiries] confirmation failed", error);
  }
}

