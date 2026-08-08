import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Text,
} from "@react-email/components";
import * as React from "react";
import { defaultEmailSettings, fillTemplate, type EnquiryEmailSection } from "../email-settings-schema";
import type { TemplateEntry } from "./registry";

interface EnquiryConfirmationProps {
  fullName?: string;
  serviceName?: string;
  phone?: string;
  content?: Partial<EnquiryEmailSection>;
}

const main: React.CSSProperties = {
  backgroundColor: "#ffffff",
  fontFamily: "Georgia, 'EB Garamond', serif",
  margin: 0,
  padding: "24px 0",
};

const container: React.CSSProperties = {
  maxWidth: "560px",
  padding: "28px 32px",
};

const paragraph: React.CSSProperties = {
  fontSize: "16px",
  lineHeight: "26px",
  color: "#3f4b5b",
  margin: "0 0 16px",
};

export function EnquiryConfirmationEmail({
  fullName = "there",
  serviceName = "your enquiry",
  phone = "0191 205 2006",
  content,
}: EnquiryConfirmationProps) {
  const c = { ...defaultEmailSettings.enquiryConfirmation, ...content };
  return (
    <Html lang="en" dir="ltr">
      <Head />
      <Preview>{fillTemplate(c.preview, { fullName, serviceName })}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading
            style={{ fontSize: "22px", color: "#0f2340", margin: "0 0 4px" }}
          >
            {fillTemplate(c.heading, { fullName, serviceName })}
          </Heading>
          <Text
            style={{ fontSize: "14px", color: "#7b8794", margin: "0 0 20px" }}
          >
            {fillTemplate(c.subheading ?? "", { fullName, serviceName })}
          </Text>
          <Hr style={{ borderColor: "#e6e9ef", margin: "0 0 20px" }} />
          <Text style={paragraph}>
            {fillTemplate(c.intro ?? "", { fullName, serviceName })}
          </Text>
          <Text style={paragraph}>
            {fillTemplate(c.body ?? "", { fullName, serviceName, phone })}
          </Text>
          <Text style={paragraph}>
            {fillTemplate(c.closing ?? "", { fullName, serviceName, phone })}
          </Text>
          <Hr style={{ borderColor: "#e6e9ef", margin: "4px 0 16px" }} />
          <Text style={{ fontSize: "13px", color: "#7b8794", margin: 0 }}>
            Kenton Pharmacy Clinic · 41 Halewood Avenue, Newcastle upon Tyne,
            NE3 3RX
          </Text>
          <Text style={{ fontSize: "13px", color: "#7b8794", margin: "6px 0 0" }}>
            {fillTemplate(c.footer, { fullName, serviceName })}
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

export const template = {
  component: EnquiryConfirmationEmail,
  displayName: "Enquiry confirmation (customer)",
  subject: (data: Record<string, any>, settings?: { enquiryConfirmation?: Partial<EnquiryEmailSection> }) =>
    fillTemplate(
      settings?.enquiryConfirmation?.subject ?? defaultEmailSettings.enquiryConfirmation.subject,
      { serviceName: data['serviceName'] ?? "Kenton Pharmacy Clinic", fullName: data['fullName'] ?? "there" },
    ),
  previewData: {
    fullName: "Sarah",
    serviceName: "Weight Loss Clinic",
    phone: "0191 205 2006",
  },
} satisfies TemplateEntry;
