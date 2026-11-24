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

interface ActionNeededProps {
  branchLabel?: string;
  branchName?: string;
  branchAddress?: string;
  submittedAt?: string;
}

export function EnquiryActionNeededEmail({
  branchLabel = "Kenton",
  branchName = "Kenton Pharmacy Clinic",
  branchAddress = "41 Halewood Avenue, Newcastle upon Tyne, NE3 3RX",
  submittedAt = "",
}: ActionNeededProps) {
  return (
    <Html lang="en" dir="ltr">
      <Head />
      <Preview>
        A new {branchLabel} enquiry is waiting in your NHS mailbox
      </Preview>
      <Body
        style={{
          backgroundColor: "#ffffff",
          fontFamily: "Georgia, 'EB Garamond', serif",
          margin: 0,
          padding: "24px 0",
        }}
      >
        <Container
          style={{
            backgroundColor: "#ffffff",
            maxWidth: "560px",
            padding: "28px 32px",
          }}
        >
          <Heading style={{ margin: "0 0 12px", fontSize: "22px", color: "#0f2340" }}>
            Action needed
          </Heading>
          <Text style={{ margin: "0 0 14px", fontSize: "16px", color: "#0f2340" }}>
            A new form has come in for {branchName} from the Newcastle Pharmacy
            Clinic website.
          </Text>
          <Text style={{ margin: "0 0 14px", fontSize: "16px", color: "#0f2340" }}>
            Please open your NHS mailbox (habib.jiwa2@nhs.net), where the full
            details are waiting, and follow it up.
          </Text>
          {submittedAt ? (
            <Text style={{ margin: "0 0 14px", fontSize: "14px", color: "#7b8794" }}>
              Received: {submittedAt}
            </Text>
          ) : null}
          <Hr style={{ borderColor: "#e6e9ef", margin: "4px 0 16px" }} />
          <Text style={{ fontSize: "13px", color: "#7b8794", margin: 0 }}>
            {branchName} · {branchAddress}
          </Text>
          <Text style={{ fontSize: "13px", color: "#7b8794", margin: "6px 0 0" }}>
            No personal information is included in this message.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

export const template = {
  component: EnquiryActionNeededEmail,
  displayName: "Action needed (no patient details)",
  subject: (data: Record<string, any>) => {
    const branch = data["branchLabel"] ? ` (${data["branchLabel"]})` : "";
    return `Action needed: new website form${branch} in your NHS mailbox`;
  },
  previewData: {
    branchLabel: "Kenton",
    branchName: "Kenton Pharmacy Clinic",
    branchAddress: "41 Halewood Avenue, Newcastle upon Tyne, NE3 3RX",
    submittedAt: "2 August 2026, 14:20",
  },
} satisfies TemplateEntry;
