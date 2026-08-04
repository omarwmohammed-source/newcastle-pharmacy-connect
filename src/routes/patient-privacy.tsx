import { createFileRoute, Link } from "@tanstack/react-router";
import { PHARMACY } from "@/lib/pharmacy-data";
import logoAsset from "@/assets/kenton-pharmacy-logo.jpg.asset.json";
import { BASE_URL } from "@/lib/site-config";
import {
  PATIENT_PRIVACY_INTRO,
  PATIENT_PRIVACY_TITLE,
  PatientPrivacyBody,
} from "@/lib/patient-privacy-content";

const OG_IMAGE = `${BASE_URL}${logoAsset.url}`;

export const Route = createFileRoute("/patient-privacy")({
  head: () => ({
    meta: [
      { title: "Patient privacy notice — Kenton Pharmacy Clinic" },
      {
        name: "description",
        content:
          "How Kenton Pharmacy Clinic records, uses and safeguards patient information, your rights under UK GDPR, and how to access your pharmacy record.",
      },
      {
        property: "og:title",
        content: "Patient privacy notice — Kenton Pharmacy Clinic",
      },
      {
        property: "og:description",
        content:
          "How we look after and safeguard information about you at Kenton Pharmacy Clinic in Newcastle.",
      },
      { property: "og:url", content: `${BASE_URL}/patient-privacy` },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: `${BASE_URL}/patient-privacy` }],
  }),
  component: PatientPrivacyPage,
});

function PatientPrivacyPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="font-serif text-3xl font-bold tracking-tight text-primary sm:text-4xl">
        {PATIENT_PRIVACY_TITLE}
      </h1>
      <p className="mt-4 leading-relaxed text-muted-foreground">
        {PATIENT_PRIVACY_INTRO}
      </p>

      <div className="mt-10">
        <PatientPrivacyBody />
      </div>

      <div className="mt-12 rounded-lg border border-border bg-muted/50 p-5 text-sm text-muted-foreground">
        <p>
          Kenton Pharmacy Clinic,{" "}
          {`${PHARMACY.addressLine1}, ${PHARMACY.addressLine2}, ${PHARMACY.postcode}`}
          . Call us on {PHARMACY.phone}.
        </p>
        <p className="mt-2">
          For how we handle details submitted through this website&apos;s
          enquiry forms, see our{" "}
          <Link to="/privacy" className="text-primary underline">
            website privacy notice
          </Link>{" "}
          and{" "}
          <Link to="/cookies" className="text-primary underline">
            cookie notice
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
