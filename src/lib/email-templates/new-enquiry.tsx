import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";
import { defaultEmailSettings, fillTemplate, type EnquiryEmailSection } from "../email-settings-schema";
import type { TemplateEntry } from "./registry";

interface NewEnquiryEmailProps {
  fullName?: string;
  phone?: string;
  email?: string;
  serviceName?: string;
  message?: string;
  source?: string;
  submittedAt?: string;
  content?: Partial<EnquiryEmailSection>;
}

const labelStyle: React.CSSProperties = {
  margin: "0",
  fontSize: "12px",
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "#7b8794",
};

const valueStyle: React.CSSProperties = {
  margin: "2px 0 14px",
  fontSize: "16px",
  color: "#0f2340",
};

export function NewEnquiryEmail({
  fullName = "—",
  phone = "—",
  email = "—",
  serviceName = "—",
  message = "",
  source = "—",
  submittedAt = "",
  content,
}: NewEnquiryEmailProps) {
  const c = { ...defaultEmailSettings.newEnquiry, ...content };
  return (
    <Html>
      <Head />
      <Preview>{fillTemplate(c.preview, { fullName, serviceName })}</Preview>
      <Body
        style={{
          backgroundColor: "#f4f6f9",
          fontFamily: "Georgia, 'EB Garamond', serif",
          margin: 0,
          padding: "24px 0",
        }}
      >
        <Container
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "10px",
            maxWidth: "560px",
            padding: "28px 32px",
          }}
        >
          <Heading
            style={{
              margin: "0 0 4px",
              fontSize: "22px",
              color: "#0f2340",
            }}
          >
            {fillTemplate(c.heading, { fullName, serviceName })}
          </Heading>
          <Text style={{ margin: "0 0 20px", fontSize: "14px", color: "#7b8794" }}>
            {fillTemplate(c.subheading ?? "", { fullName, serviceName })}
          </Text>
          <Hr style={{ borderColor: "#e6e9ef", margin: "0 0 20px" }} />
          <Section>
            <Text style={{ ...labelStyle, textTransform: "none" }}>{fillTemplate(c.intro ?? "", { fullName, serviceName })}</Text>
            <Text style={labelStyle}>Service</Text>
            <Text style={valueStyle}>{serviceName}</Text>
            <Text style={labelStyle}>Name</Text>
            <Text style={valueStyle}>{fullName}</Text>
            <Text style={labelStyle}>Phone</Text>
            <Text style={valueStyle}>{phone}</Text>
            <Text style={labelStyle}>Email</Text>
            <Text style={valueStyle}>{email || "—"}</Text>
            {message ? (
              <>
                <Text style={labelStyle}>Message</Text>
                <Text style={valueStyle}>{message}</Text>
              </>
            ) : null}
            <Text style={labelStyle}>Source</Text>
            <Text style={valueStyle}>{source}</Text>
            {submittedAt ? (
              <>
                <Text style={labelStyle}>Submitted</Text>
                <Text style={valueStyle}>{submittedAt}</Text>
              </>
            ) : null}
          </Section>
          <Hr style={{ borderColor: "#e6e9ef", margin: "4px 0 16px" }} />
          <Text style={{ fontSize: "13px", color: "#7b8794", margin: 0 }}>
            {fillTemplate(c.footer, { fullName, serviceName })}
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

export const template = {
  component: NewEnquiryEmail,
  displayName: "New enquiry alert",
  subject: (data: Record<string, any>, settings?: { newEnquiry?: Partial<EnquiryEmailSection> }) =>
    fillTemplate(
      settings?.newEnquiry?.subject ?? defaultEmailSettings.newEnquiry.subject,
      { serviceName: data['serviceName'] ?? "Service", fullName: data['fullName'] ?? "Website" },
    ),
  previewData: {
    fullName: "Sarah Ahmed",
    phone: "0191 205 2006",
    email: "jane@example.com",
    serviceName: "Weight Loss Clinic",
    message: "Prefer a call in the afternoon.",
    source: "service-card",
    submittedAt: "2 August 2026, 14:20",
  },
} satisfies TemplateEntry;
