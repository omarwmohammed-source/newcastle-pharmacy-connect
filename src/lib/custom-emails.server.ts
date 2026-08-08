import { sendLovableEmail, EmailAPIError } from "@lovable.dev/email-js";
import {
  renderCustomEmailHtml,
  renderCustomEmailText,
  customEmailTemplateSchema,
  emailDesignSchema,
  type CustomEmailTemplate,
} from "./custom-email-schema";
import { fillTemplate, type TemplateVariables } from "./email-settings-schema";

const SITE_NAME = "Kenton Pharmacy Clinic";
const SENDER_DOMAIN = "notify.pharmacy-clinic.com";
const FROM_DOMAIN = "notify.pharmacy-clinic.com";

export async function requireStaff(context: {
  supabase: { rpc: (fn: string, args: Record<string, unknown>) => Promise<{ data: unknown }> };
  userId: string;
}) {
  const { data } = await context.supabase.rpc("is_staff", { _user_id: context.userId });
  if (data !== true) throw new Error("Access denied");
}

export function rowToTemplate(row: Record<string, any>): CustomEmailTemplate & { id: string } {
  return {
    id: row['id'] as string,
    name: row['name'] ?? "",
    subject: row['subject'] ?? "",
    preview: row['preview'] ?? "",
    heading: row['heading'] ?? "",
    subheading: row['subheading'] ?? "",
    intro: row['intro'] ?? "",
    body: row['body'] ?? "",
    closing: row['closing'] ?? "",
    buttonText: row['button_text'] ?? "",
    buttonUrl: row['button_url'] ?? "",
    footer: row['footer'] ?? "",
    design: emailDesignSchema.parse(row['design'] ?? {}),
    placeholders: Array.isArray(row['placeholders'])
      ? (row['placeholders'] as CustomEmailTemplate['placeholders'])
      : [],
  };
}

export function templateToRow(data: CustomEmailTemplate) {
  const t = customEmailTemplateSchema.parse(data);
  return {
    name: t.name,
    subject: t.subject,
    preview: t.preview,
    heading: t.heading,
    subheading: t.subheading,
    intro: t.intro,
    body: t.body,
    closing: t.closing,
    button_text: t.buttonText,
    button_url: t.buttonUrl,
    footer: t.footer,
    design: t.design,
    placeholders: t.placeholders,
  };
}

export async function sendCustomEmail(
  to: string,
  template: CustomEmailTemplate,
  variables: TemplateVariables,
  labelPrefix = "custom",
): Promise<{ sent: boolean; reason?: string }> {
  const apiKey = process.env["LOVABLE_API_KEY"];
  if (!apiKey) throw new Error("LOVABLE_API_KEY is not configured");

  const html = renderCustomEmailHtml(template, variables);
  const text = renderCustomEmailText(template, variables);

  try {
    await sendLovableEmail(
      {
        to,
        from: `${SITE_NAME} <noreply@${FROM_DOMAIN}>`,
        sender_domain: SENDER_DOMAIN,
        subject: fillTemplate(template.subject, variables),
        html,
        text,
        purpose: "transactional",
        label: `${labelPrefix}-${template.name}`.slice(0, 60),
      },
      { apiKey, sendUrl: process.env["LOVABLE_SEND_URL"] },
    );
  } catch (error) {
    if (error instanceof EmailAPIError && error.code === "recipient_suppressed") {
      return { sent: false, reason: "recipient_suppressed" };
    }
    throw error;
  }

  return { sent: true };
}
