import { z } from "zod";

export const authEmailSectionSchema = z.object({
  subject: z.string().trim().max(200),
  heading: z.string().trim().max(200),
  preview: z.string().trim().max(300),
  intro: z.string().trim().max(1000),
  buttonText: z.string().trim().max(100).optional(),
  footer: z.string().trim().max(1000),
});

export const enquiryEmailSectionSchema = z.object({
  subject: z.string().trim().max(200),
  heading: z.string().trim().max(200),
  preview: z.string().trim().max(300),
  subheading: z.string().trim().max(200).optional(),
  intro: z.string().trim().max(1000).optional(),
  body: z.string().trim().max(2000).optional(),
  closing: z.string().trim().max(1000).optional(),
  footer: z.string().trim().max(1000),
});

export const emailSettingsSchema = z.object({
  signup: authEmailSectionSchema,
  recovery: authEmailSectionSchema,
  magiclink: authEmailSectionSchema,
  invite: authEmailSectionSchema,
  emailChange: authEmailSectionSchema,
  reauthentication: authEmailSectionSchema.omit({ buttonText: true }),
  newEnquiry: enquiryEmailSectionSchema,
  enquiryConfirmation: enquiryEmailSectionSchema,
});

export type EmailSettings = z.infer<typeof emailSettingsSchema>;
export type AuthEmailSection = z.infer<typeof authEmailSectionSchema>;
export type EnquiryEmailSection = z.infer<typeof enquiryEmailSectionSchema>;

export const defaultEmailSettings: EmailSettings = {
  signup: {
    subject: "Confirm your email",
    heading: "Confirm your email",
    preview: "Confirm your email for Kenton Pharmacy Clinic",
    intro: "Thanks for signing up for {{siteName}}. Please confirm your email address ({{recipient}}) by clicking the button below:",
    buttonText: "Verify Email",
    footer: "If you didn't create an account, you can safely ignore this email.",
  },
  recovery: {
    subject: "Reset your password",
    heading: "Reset your password",
    preview: "Reset your password for Kenton Pharmacy Clinic",
    intro: "We received a request to reset your password for {{siteName}}. Click the button below to choose a new password.",
    buttonText: "Reset Password",
    footer: "If you didn't request a password reset, you can safely ignore this email. Your password will not be changed.",
  },
  magiclink: {
    subject: "Your login link",
    heading: "Your login link",
    preview: "Log in to Kenton Pharmacy Clinic",
    intro: "Click the button below to log in to {{siteName}}. This link will expire shortly.",
    buttonText: "Log In",
    footer: "If you didn't request this link, you can safely ignore this email.",
  },
  invite: {
    subject: "You've been invited",
    heading: "You've been invited",
    preview: "You've been invited to join Kenton Pharmacy Clinic",
    intro: "You've been invited to join {{siteName}}. Click the button below to accept the invitation and create your account.",
    buttonText: "Accept Invitation",
    footer: "If you weren't expecting this invitation, you can safely ignore this email.",
  },
  emailChange: {
    subject: "Confirm your new email",
    heading: "Confirm your email change",
    preview: "Confirm your email change for Kenton Pharmacy Clinic",
    intro: "You requested to change your email address for {{siteName}} from {{oldEmail}} to {{newEmail}}. Click the button below to confirm this change:",
    buttonText: "Confirm Email Change",
    footer: "If you didn't request this change, please secure your account immediately.",
  },
  reauthentication: {
    subject: "Your verification code",
    heading: "Confirm reauthentication",
    preview: "Your verification code for Kenton Pharmacy Clinic",
    intro: "Use the code below to confirm your identity:",
    footer: "This code will expire shortly. If you did not request this, you can safely ignore this email.",
  },
  newEnquiry: {
    subject: "New enquiry: {{serviceName}} — {{fullName}}",
    heading: "New enquiry received",
    preview: "A new enquiry has been submitted on the Kenton Pharmacy Clinic website",
    subheading: "Kenton Pharmacy Clinic website",
    intro: "A new enquiry has been submitted via the website. Details are below.",
    body: "Please follow up with the patient as soon as possible.",
    closing: "You can view and manage all enquiries in the staff dashboard.",
    footer: "This alert was sent automatically from the Kenton Pharmacy Clinic website.",
  },
  enquiryConfirmation: {
    subject: "We've received your enquiry — {{serviceName}}",
    heading: "Thanks, {{fullName}}",
    preview: "Kenton Pharmacy Clinic has received your enquiry",
    subheading: "Kenton Pharmacy Clinic",
    intro: "We've received your details about {{serviceName}} and a member of our team will be in touch shortly.",
    body: "In the meantime, if you need urgent advice you can call us directly.",
    closing: "If it's urgent, please call us on {{phone}}. We're open Monday to Friday 8:30am–6pm and Saturday 9am–6pm.",
    footer: "Your details are stored securely and used only to respond to your enquiry.",
  },
};

export type TemplateVariables = Record<string, string | number | undefined>;

export function fillTemplate(
  template: string,
  variables: TemplateVariables,
): string {
  return template.replace(/\{\{(\s*[a-zA-Z0-9_]+\s*)\}\}/g, (match, key) => {
    const value = variables[key.trim()];
    return value === undefined || value === null ? match : String(value);
  });
}

export function mergeEmailSettings(
  saved: unknown,
  defaults: EmailSettings = defaultEmailSettings,
): EmailSettings {
  const parsed = emailSettingsSchema.safeParse(saved);
  if (!parsed.success) return defaults;

  return {
    signup: { ...defaults.signup, ...parsed.data.signup },
    recovery: { ...defaults.recovery, ...parsed.data.recovery },
    magiclink: { ...defaults.magiclink, ...parsed.data.magiclink },
    invite: { ...defaults.invite, ...parsed.data.invite },
    emailChange: { ...defaults.emailChange, ...parsed.data.emailChange },
    reauthentication: { ...defaults.reauthentication, ...parsed.data.reauthentication },
    newEnquiry: { ...defaults.newEnquiry, ...parsed.data.newEnquiry },
    enquiryConfirmation: { ...defaults.enquiryConfirmation, ...parsed.data.enquiryConfirmation },
  };
}
