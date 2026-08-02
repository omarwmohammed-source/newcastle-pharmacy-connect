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
import type { TemplateEntry } from "./registry";

interface NewEnquiryEmailProps {
  fullName?: string;
  phone?: string;
  email?: string;
  serviceName?: string;
  message?: string;
  source?: string;
  submittedAt?: string;
}

const label: React.CSSProperties = {
  margin: "0",
  fontSize: "12px",
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "#7b8794",
};

const value: React.CSSProperties = {
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
}: NewEnquiryEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>{`New enquiry: ${serviceName} — ${fullName}`}</Preview>
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
            New enquiry received
          </Heading>
          <Text style={{ margin: "0 0 20px", fontSize: "14px", color: "#7b8794" }}>
            Kenton Pharmacy Clinic website
          </Text>
          <Hr style={{ borderColor: "#e6e9ef", margin: "0 0 20px" }} />
          <Section>
            <Text style={label}>Service</Text>
            <Text style={value}>{serviceName}</Text>
            <Text style={label}>Name</Text>
            <Text style={value}>{fullName}</Text>
            <Text style={label}>Phone</Text>
            <Text style={value}>{phone}</Text>
            <Text style={label}>Email</Text>
            <Text style={value}>{email || "—"}</Text>
            {message ? (
              <>
                <Text style={label}>Message</Text>
                <Text style={value}>{message}</Text>
              </>
            ) : null}
            <Text style={label}>Source</Text>
            <Text style={value}>{source}</Text>
            {submittedAt ? (
              <>
                <Text style={label}>Submitted</Text>
                <Text style={value}>{submittedAt}</Text>
              </>
            ) : null}
          </Section>
          <Hr style={{ borderColor: "#e6e9ef", margin: "4px 0 16px" }} />
          <Text style={{ fontSize: "13px", color: "#7b8794", margin: 0 }}>
            View and manage all enquiries in the staff dashboard.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

export const template = {
  component: NewEnquiryEmail,
  displayName: "New enquiry alert",
  subject: (data: Record<string, any>) =>
    `New enquiry: ${data['serviceName'] ?? "Service"} — ${data['fullName'] ?? "Website"}`,
  previewData: {
    fullName: "Jane Smith",
    phone: "0191 205 2006",
    email: "jane@example.com",
    serviceName: "Weight Loss Clinic",
    message: "Prefer a call in the afternoon.",
    source: "service-card",
    submittedAt: "2 August 2026, 14:20",
  },
} satisfies TemplateEntry;
