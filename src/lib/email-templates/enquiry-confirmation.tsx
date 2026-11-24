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
  branchLabel?: string;
  branchName?: string;
  branchAddress?: string;
  fullName?: string;
  serviceName?: string;
  phone?: string;
  hoursSummary?: string;
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
  branchLabel = "Kenton",
  branchName = "Kenton Pharmacy Clinic",
  branchAddress = "41 Halewood Avenue, Newcastle upon Tyne, NE3 3RX",
  fullName = "there",
  serviceName = "your enquiry",
  phone = "0191 205 2006",
  hoursSummary = "Monday to Friday 8:30am–6pm and Saturday 9am–6pm",
  content,
}: EnquiryConfirmationProps) {
  const c = { ...defaultEmailSettings.enquiryConfirmation, ...content };
  const vars = {
    branchLabel,
    branchName,
    branchAddress,
    fullName,
    serviceName,
    phone,
    hoursSummary,
  };
  return (
    <Html lang="en" dir="ltr">
      <Head />
      <Preview>{fillTemplate(c.preview, vars)}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading
            style={{ fontSize: "22px", color: "#0f2340", margin: "0 0 4px" }}
          >
            {fillTemplate(c.heading, vars)}
          </Heading>
          <Text
            style={{ fontSize: "14px", color: "#7b8794", margin: "0 0 20px" }}
          >
            {branchName}
          </Text>
          <Hr style={{ borderColor: "#e6e9ef", margin: "0 0 20px" }} />
          <Text style={paragraph}>
            {fillTemplate(c.intro ?? "", vars)}
          </Text>
          <Text style={paragraph}>
            {fillTemplate(c.body ?? "", vars)}
          </Text>
          <Text style={paragraph}>
            {fillTemplate(c.closing ?? "", vars)}
          </Text>
          <Hr style={{ borderColor: "#e6e9ef", margin: "4px 0 16px" }} />
          <Text style={{ fontSize: "13px", color: "#7b8794", margin: 0 }}>
            {branchName} · {branchAddress}
          </Text>
          <Text style={{ fontSize: "13px", color: "#7b8794", margin: "6px 0 0" }}>
            {fillTemplate(c.footer, vars)}
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
      {
        branchLabel: data["branchLabel"] ?? "Kenton",
        branchName: data["branchName"] ?? "Newcastle Pharmacy Clinic",
        serviceName: data["serviceName"] ?? "your enquiry",
        fullName: data["fullName"] ?? "there",
      },
    ),
  previewData: {
    branchLabel: "Kenton",
    branchName: "Kenton Pharmacy Clinic",
    branchAddress: "41 Halewood Avenue, Newcastle upon Tyne, NE3 3RX",
    fullName: "Sarah",
    serviceName: "Weight Loss Clinic",
    phone: "0191 205 2006",
    hoursSummary: "Monday to Friday 8:30am–6pm and Saturday 9am–6pm",
  },
} satisfies TemplateEntry;
