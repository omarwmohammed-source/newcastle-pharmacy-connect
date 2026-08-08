import { z } from "zod";
import { fillTemplate, type TemplateVariables } from "./email-settings-schema";

export const placeholderSchema = z.object({
  key: z
    .string()
    .trim()
    .min(1)
    .max(40)
    .regex(/^[a-zA-Z0-9_]+$/, "Use letters, numbers and underscores only"),
  label: z.string().trim().max(80).default(""),
  sample: z.string().trim().max(200).default(""),
});

export const emailDesignSchema = z.object({
  accentColor: z.string().trim().max(20).default("#0f2340"),
  buttonColor: z.string().trim().max(20).default("#c9a227"),
  buttonTextColor: z.string().trim().max(20).default("#0f2340"),
  backgroundColor: z.string().trim().max(20).default("#f4f6f9"),
  cardColor: z.string().trim().max(20).default("#ffffff"),
  textColor: z.string().trim().max(20).default("#33415c"),
  fontFamily: z.string().trim().max(120).default("Georgia, 'EB Garamond', serif"),
  logoUrl: z.string().trim().max(500).default(""),
  logoWidth: z.number().int().min(40).max(400).default(140),
  imageUrl: z.string().trim().max(500).default(""),
  align: z.enum(["left", "center"]).default("left"),
  cornerRadius: z.number().int().min(0).max(32).default(10),
  showDivider: z.boolean().default(true),
});

export const customEmailTemplateSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().trim().min(1).max(120),
  subject: z.string().trim().min(1).max(200),
  preview: z.string().trim().max(300).default(""),
  heading: z.string().trim().max(200).default(""),
  subheading: z.string().trim().max(200).default(""),
  intro: z.string().trim().max(2000).default(""),
  body: z.string().trim().max(5000).default(""),
  closing: z.string().trim().max(2000).default(""),
  buttonText: z.string().trim().max(100).default(""),
  buttonUrl: z.string().trim().max(500).default(""),
  footer: z.string().trim().max(1000).default(""),
  design: emailDesignSchema,
  placeholders: z.array(placeholderSchema).max(30).default([]),
});

export type EmailDesign = z.infer<typeof emailDesignSchema>;
export type EmailPlaceholder = z.infer<typeof placeholderSchema>;
export type CustomEmailTemplate = z.infer<typeof customEmailTemplateSchema>;

export const defaultDesign: EmailDesign = emailDesignSchema.parse({});

export const blankTemplate: CustomEmailTemplate = {
  name: "New template",
  subject: "A message from Kenton Pharmacy Clinic",
  preview: "A short line shown next to the subject in the inbox",
  heading: "Hello {{firstName}}",
  subheading: "Kenton Pharmacy Clinic",
  intro: "Write your opening message here.",
  body: "Add the main details of your message here.",
  closing: "If it's urgent, please call us on 0191 205 2006.",
  buttonText: "",
  buttonUrl: "",
  footer: "Kenton Pharmacy Clinic, 41 Halewood Avenue, Newcastle upon Tyne, NE3 3RX",
  design: defaultDesign,
  placeholders: [
    { key: "firstName", label: "First name", sample: "Sarah" },
    { key: "fullName", label: "Full name", sample: "Sarah Ahmed" },
    { key: "email", label: "Email address", sample: "patient@example.com" },
    { key: "phone", label: "Phone number", sample: "07700 900123" },
    { key: "serviceName", label: "Service name", sample: "Blood pressure check" },
    { key: "appointmentDate", label: "Appointment date", sample: "Monday 14 September, 10:30am" },
    { key: "pharmacyName", label: "Pharmacy name", sample: "Kenton Pharmacy Clinic" },
    { key: "pharmacyPhone", label: "Pharmacy phone", sample: "0191 205 2006" },
  ],
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function paragraphs(text: string, style: string): string {
  return text
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p) => `<p style="${style}">${escapeHtml(p).replace(/\n/g, "<br />")}</p>`)
    .join("");
}

/**
 * Renders a custom template to standalone email HTML. Pure string work so the
 * same output powers the live preview in the dashboard and the real send.
 */
export function renderCustomEmailHtml(
  template: CustomEmailTemplate,
  variables: TemplateVariables = {},
): string {
  const d = { ...defaultDesign, ...template.design };
  const t = (value: string) => fillTemplate(value ?? "", variables);
  const bodyStyle = `margin:0 0 16px;font-size:16px;line-height:1.6;color:${d.textColor};text-align:${d.align};`;

  const logo = d.logoUrl
    ? `<img src="${escapeHtml(d.logoUrl)}" width="${d.logoWidth}" alt="" style="display:block;margin:0 0 20px;${
        d.align === "center" ? "margin-left:auto;margin-right:auto;" : ""
      }border:0;" />`
    : "";

  const hero = d.imageUrl
    ? `<img src="${escapeHtml(d.imageUrl)}" alt="" style="display:block;width:100%;border-radius:${d.cornerRadius}px;margin:0 0 20px;border:0;" />`
    : "";

  const heading = template.heading
    ? `<h1 style="margin:0 0 4px;font-size:24px;line-height:1.3;color:${d.accentColor};text-align:${d.align};">${escapeHtml(t(template.heading))}</h1>`
    : "";

  const subheading = template.subheading
    ? `<p style="margin:0 0 18px;font-size:13px;letter-spacing:0.08em;text-transform:uppercase;color:${d.buttonColor};text-align:${d.align};">${escapeHtml(t(template.subheading))}</p>`
    : "";

  const button =
    template.buttonText && template.buttonUrl
      ? `<div style="text-align:${d.align};margin:24px 0;"><a href="${escapeHtml(t(template.buttonUrl))}" style="display:inline-block;background:${d.buttonColor};color:${d.buttonTextColor};text-decoration:none;padding:12px 24px;border-radius:${d.cornerRadius}px;font-weight:bold;font-size:16px;">${escapeHtml(t(template.buttonText))}</a></div>`
      : "";

  const divider = d.showDivider
    ? `<hr style="border:none;border-top:1px solid #e3e8ef;margin:24px 0;" />`
    : "";

  const footer = template.footer
    ? `${divider}<p style="margin:0;font-size:12px;line-height:1.6;color:#7b8794;text-align:${d.align};">${escapeHtml(t(template.footer)).replace(/\n/g, "<br />")}</p>`
    : "";

  return `<!DOCTYPE html><html><head><meta charset="utf-8" /><meta name="viewport" content="width=device-width,initial-scale=1" /></head>
<body style="margin:0;padding:24px 0;background:${d.backgroundColor};font-family:${d.fontFamily};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(t(template.preview))}</div>
<div style="max-width:560px;margin:0 auto;background:${d.cardColor};border-radius:${d.cornerRadius}px;padding:28px 32px;">
${logo}${hero}${heading}${subheading}
${paragraphs(t(template.intro), bodyStyle)}
${paragraphs(t(template.body), bodyStyle)}
${button}
${paragraphs(t(template.closing), bodyStyle)}
${footer}
</div></body></html>`;
}

export function renderCustomEmailText(
  template: CustomEmailTemplate,
  variables: TemplateVariables = {},
): string {
  const t = (value: string) => fillTemplate(value ?? "", variables);
  return [
    t(template.heading),
    t(template.subheading),
    t(template.intro),
    t(template.body),
    template.buttonText && template.buttonUrl
      ? `${t(template.buttonText)}: ${t(template.buttonUrl)}`
      : "",
    t(template.closing),
    t(template.footer),
  ]
    .map((s) => s.trim())
    .filter(Boolean)
    .join("\n\n");
}

/** Sample values keyed by placeholder, used for previews and test sends. */
export function sampleVariables(template: CustomEmailTemplate): TemplateVariables {
  const vars: TemplateVariables = {};
  for (const p of template.placeholders) {
    vars[p.key] = p.sample || `{{${p.key}}}`;
  }
  return vars;
}
