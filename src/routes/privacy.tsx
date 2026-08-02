import { createFileRoute, Link } from "@tanstack/react-router";
import { PHARMACY } from "@/lib/pharmacy-data";
import logoAsset from "@/assets/kenton-pharmacy-logo.jpg.asset.json";
import { BASE_URL } from "@/lib/site-config";

const OG_IMAGE = `${BASE_URL}${logoAsset.url}`;

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy notice — Kenton Pharmacy Clinic" },
      {
        name: "description",
        content:
          "How Kenton Pharmacy Clinic in Newcastle collects, stores and protects the personal details you submit through our website enquiry forms.",
      },
      { property: "og:title", content: "Privacy notice — Kenton Pharmacy Clinic" },
      {
        property: "og:description",
        content:
          "How we handle and protect the personal details you share with Kenton Pharmacy Clinic.",
      },
      { property: "og:url", content: `${BASE_URL}/privacy` },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: `${BASE_URL}/privacy` }],
  }),
  component: PrivacyPage,
});


function PrivacyPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
        Privacy notice
      </h1>
      <p className="mt-3 text-muted-foreground">
        How Kenton Pharmacy Clinic handles the information you give us through
        this website. Last updated: {new Date().getFullYear()}.
      </p>

      <div className="prose prose-slate mt-10 max-w-none">
        <Block title="Who we are">
          <p>
            Kenton Pharmacy Clinic, {`${PHARMACY.addressLine1}, ${PHARMACY.addressLine2}, ${PHARMACY.postcode}`}. We are the data
            controller for the personal information you submit through this
            website. You can contact us on {PHARMACY.phone} or in the pharmacy.
          </p>
        </Block>

        <Block title="What we collect">
          <ul>
            <li>Your name</li>
            <li>Your phone number and, if you give it, your email address</li>
            <li>Your date of birth, if you choose to provide it</li>
            <li>The service you are enquiring about</li>
            <li>Anything you write in the message box</li>
          </ul>
          <p>
            Please do not send detailed medical history through the website
            form. If your enquiry is clinical, we will contact you to discuss it
            securely.
          </p>
        </Block>

        <Block title="Why we use it">
          <p>
            Only to respond to your enquiry and to arrange the service you have
            asked about. We do not use your details for marketing and we do not
            sell or share them with third parties for their own purposes.
          </p>
          <p>
            Our lawful bases are your consent (which you give by ticking the box
            on the form) and, where the enquiry relates to your care, the
            provision of health care under Article 6(1)(e)/9(2)(h) UK GDPR.
          </p>
        </Block>

        <Block title="Where your details go">
          <p>
            Submissions are sent over an encrypted HTTPS connection to our
            managed database, which is encrypted at rest and hosted within the
            UK/EU. Access is restricted by row-level security so that only
            authorised pharmacy staff who are signed in can read enquiries.
            Nothing is stored in your browser and the form does not post to any
            third-party service.
          </p>
        </Block>

        <Block title="How long we keep it">
          <p>
            Enquiries are retained until we no longer need them for the purpose
            above. You can ask us to delete your enquiry at any time and we will
            do so unless we are required to keep a record for NHS or pharmacy
            regulatory reasons.
          </p>
        </Block>

        <Block title="Your rights">
          <p>
            You have the right to access your information, have it corrected or
            erased, restrict or object to its use, and withdraw consent at any
            time. Contact us on {PHARMACY.phone} to exercise any of these. If
            you are unhappy with how we have handled your data you can complain
            to the Information Commissioner&apos;s Office at ico.org.uk.
          </p>
        </Block>

        <Block title="Cookies">
          <p>
            See our{" "}
            <Link to="/cookies" className="text-primary underline">
              cookie notice
            </Link>{" "}
            for details of the small number of cookies this site uses.
          </p>
        </Block>
      </div>
    </section>
  );
}

function Block({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-8">
      <h2 className="text-xl font-semibold text-primary">{title}</h2>
      <div className="mt-2 space-y-3 text-muted-foreground [&_li]:ml-5 [&_li]:list-disc">
        {children}
      </div>
    </section>
  );
}
