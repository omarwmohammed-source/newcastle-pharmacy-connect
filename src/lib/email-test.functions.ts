import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import * as React from "react";
import { render } from "@react-email/render";
import { sendLovableEmail, EmailAPIError } from "@lovable.dev/email-js";
import { SignupEmail } from "@/lib/email-templates/signup";
import { RecoveryEmail } from "@/lib/email-templates/recovery";
import { MagicLinkEmail } from "@/lib/email-templates/magic-link";
import { InviteEmail } from "@/lib/email-templates/invite";
import { EmailChangeEmail } from "@/lib/email-templates/email-change";
import { ReauthenticationEmail } from "@/lib/email-templates/reauthentication";
import { NewEnquiryEmail } from "@/lib/email-templates/new-enquiry";
import { EnquiryConfirmationEmail } from "@/lib/email-templates/enquiry-confirmation";
import { getEmailSettingsForSending } from "@/lib/email-settings-loader";
import type { EmailSettings, AuthEmailSection, EnquiryEmailSection } from "@/lib/email-settings-schema";

const SITE_NAME = "Kenton Pharmacy Clinic";
const SENDER_DOMAIN = "notify.pharmacy-clinic.com";
const FROM_DOMAIN = "notify.pharmacy-clinic.com";

const MOCK_URL = "https://pharmacy-clinic.com/auth/confirm?token=demo";

const MOCK_DATA = {
  signup: {
    siteName: SITE_NAME,
    siteUrl: "https://pharmacy-clinic.com",
    recipient: "test@example.com",
    confirmationUrl: MOCK_URL,
  },
  recovery: {
    siteName: SITE_NAME,
    confirmationUrl: MOCK_URL,
  },
  magiclink: {
    siteName: SITE_NAME,
    confirmationUrl: MOCK_URL,
  },
  invite: {
    siteName: SITE_NAME,
    siteUrl: "https://pharmacy-clinic.com",
    confirmationUrl: MOCK_URL,
  },
  emailChange: {
    siteName: SITE_NAME,
    oldEmail: "old@example.com",
    email: "new@example.com",
    newEmail: "new@example.com",
    confirmationUrl: MOCK_URL,
  },
  reauthentication: {
    token: "123456",
    siteName: SITE_NAME,
  },
  newEnquiry: {
    fullName: "Jane Smith",
    phone: "0191 205 2006",
    email: "jane@example.com",
    serviceName: "Weight Loss Clinic",
    message: "Prefer a call in the afternoon.",
    source: "service-card",
    submittedAt: "2 August 2026, 14:20",
  },
  enquiryConfirmation: {
    fullName: "Jane",
    serviceName: "Weight Loss Clinic",
    phone: "0191 205 2006",
  },
};

export const sendTestEmail = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { template: keyof EmailSettings }) => input)
  .handler(async ({ data, context }) => {
    const { data: isStaff } = await context.supabase.rpc("is_staff", {
      _user_id: context.userId,
    });
    if (isStaff !== true) throw new Error("Access denied");

    const email = (context.claims as { email?: string })?.email;
    if (!email) throw new Error("No email found for your account");

    const settings = await getEmailSettingsForSending();
    const templateName = data.template;
    const content = settings[templateName];

    let element: React.ReactElement;
    switch (templateName) {
      case "signup":
        element = React.createElement(SignupEmail, {
          ...MOCK_DATA.signup,
          content: content as AuthEmailSection,
        });
        break;
      case "recovery":
        element = React.createElement(RecoveryEmail, {
          ...MOCK_DATA.recovery,
          content: content as AuthEmailSection,
        });
        break;
      case "magiclink":
        element = React.createElement(MagicLinkEmail, {
          ...MOCK_DATA.magiclink,
          content: content as AuthEmailSection,
        });
        break;
      case "invite":
        element = React.createElement(InviteEmail, {
          ...MOCK_DATA.invite,
          content: content as AuthEmailSection,
        });
        break;
      case "emailChange":
        element = React.createElement(EmailChangeEmail, {
          ...MOCK_DATA.emailChange,
          content: content as AuthEmailSection,
        });
        break;
      case "reauthentication":
        element = React.createElement(ReauthenticationEmail, {
          ...MOCK_DATA.reauthentication,
          content: content as Omit<AuthEmailSection, "buttonText">,
        });
        break;
      case "newEnquiry":
        element = React.createElement(NewEnquiryEmail, {
          ...MOCK_DATA.newEnquiry,
          content: content as EnquiryEmailSection,
        });
        break;
      case "enquiryConfirmation":
        element = React.createElement(EnquiryConfirmationEmail, {
          ...MOCK_DATA.enquiryConfirmation,
          content: content as EnquiryEmailSection,
        });
        break;
      default:
        throw new Error("Unknown template");
    }

    const html = await render(element);
    const text = await render(element, { plainText: true });
    const subject =
      typeof content.subject === "string" ? content.subject : "Test email";

    const apiKey = process.env["LOVABLE_API_KEY"];
    if (!apiKey) throw new Error("LOVABLE_API_KEY is not configured");

    try {
      await sendLovableEmail(
        {
          to: email,
          from: `${SITE_NAME} <noreply@${FROM_DOMAIN}>`,
          sender_domain: SENDER_DOMAIN,
          subject: `[TEST] ${subject}`,
          html,
          text,
          purpose: "transactional",
          label: `test-${templateName}`,
        },
        { apiKey, sendUrl: process.env["LOVABLE_SEND_URL"] },
      );
    } catch (error) {
      if (error instanceof EmailAPIError && error.code === "recipient_suppressed") {
        return { sent: false as const, reason: "recipient_suppressed" as const };
      }
      throw error;
    }

    return { sent: true as const };
  });
