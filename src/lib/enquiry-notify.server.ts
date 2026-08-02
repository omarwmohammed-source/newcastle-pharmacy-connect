// Server-only: sends the pharmacy an alert when a new enquiry arrives.
// Email delivery is activated once a verified sender domain is configured for
// the project. Until then this logs the enquiry and resolves without throwing,
// so a form submission is never lost because of an email problem.
import type { EnquiryInput } from "./enquiries-schema";

export const ENQUIRY_ALERT_RECIPIENT = process.env["ENQUIRY_ALERT_EMAIL"] ?? "";

export async function notifyNewEnquiry(
  enquiry: EnquiryInput & { id: string },
): Promise<void> {
  try {
    if (!ENQUIRY_ALERT_RECIPIENT) {
      console.info(
        `[enquiries] new enquiry ${enquiry.id} (${enquiry.serviceName}) — email alerts not configured yet`,
      );
      return;
    }

    const mod = await import("./email-templates/send-email").catch(() => null);
    if (!mod) {
      console.info(
        `[enquiries] new enquiry ${enquiry.id} — email templates not scaffolded yet`,
      );
      return;
    }

    await mod.sendTemplateEmail(
      "new-enquiry",
      ENQUIRY_ALERT_RECIPIENT,
      {
        templateData: {
          fullName: enquiry.fullName,
          phone: enquiry.phone,
          email: enquiry.email || "",
          serviceName: enquiry.serviceName,
          message: enquiry.message || "",
        },
        idempotencyKey: `new-enquiry-${enquiry.id}`,
      },
    );
  } catch (error) {
    console.error("[enquiries] alert email failed", error);
  }
}
