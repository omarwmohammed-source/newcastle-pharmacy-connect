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
import type { TemplateEntry } from "./registry";

interface EnquiryConfirmationProps {
  fullName?: string;
  serviceName?: string;
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
}: EnquiryConfirmationProps) {
  return (
    <Html lang="en" dir="ltr">
      <Head />
      <Preview>{`We've received your enquiry about ${serviceName}`}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading
            style={{ fontSize: "22px", color: "#0f2340", margin: "0 0 4px" }}
          >
            Thanks, {fullName}
          </Heading>
          <Text
            style={{ fontSize: "14px", color: "#7b8794", margin: "0 0 20px" }}
          >
            Kenton Pharmacy Clinic
          </Text>
          <Hr style={{ borderColor: "#e6e9ef", margin: "0 0 20px" }} />
          <Text style={paragraph}>
            We&apos;ve received your details about <strong>{serviceName}</strong>{" "}
            and a member of our team will be in touch shortly.
          </Text>
          <Text style={paragraph}>
            If it&apos;s urgent, please call us on{" "}
            <strong style={{ color: "#0f2340" }}>0191 205 2006</strong>. We&apos;re
            open Monday to Friday 8:30am–6pm and Saturday 9am–6pm.
          </Text>
          <Hr style={{ borderColor: "#e6e9ef", margin: "4px 0 16px" }} />
          <Text style={{ fontSize: "13px", color: "#7b8794", margin: 0 }}>
            Kenton Pharmacy Clinic · 41 Halewood Avenue, Newcastle upon Tyne,
            NE3 3RX
          </Text>
          <Text style={{ fontSize: "13px", color: "#7b8794", margin: "6px 0 0" }}>
            Your details are stored securely and used only to respond to your
            enquiry.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

export const template = {
  component: EnquiryConfirmationEmail,
  displayName: "Enquiry confirmation (customer)",
  subject: (data: Record<string, any>) =>
    `We've received your enquiry — ${data['serviceName'] ?? "Kenton Pharmacy Clinic"}`,
  previewData: {
    fullName: "Jane",
    serviceName: "Weight Loss Clinic",
  },
} satisfies TemplateEntry;
