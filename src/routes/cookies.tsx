import { createFileRoute, Link } from "@tanstack/react-router";
import { PHARMACY } from "@/lib/pharmacy-data";

export const Route = createFileRoute("/cookies")({
  head: () => ({
    meta: [
      { title: "Cookie notice — Kenton Pharmacy Clinic" },
      {
        name: "description",
        content:
          "Kenton Pharmacy Clinic uses no advertising or tracking cookies. Read what the small number of cookies on this site are used for.",
      },
      { property: "og:title", content: "Cookie notice — Kenton Pharmacy Clinic" },
      {
        property: "og:description",
        content:
          "No advertising or tracking cookies — here is exactly what this website stores.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: CookiesPage,
});

function CookiesPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
        Cookie notice
      </h1>
      <p className="mt-3 text-muted-foreground">
        This site does not use advertising, analytics or tracking cookies, so
        there is no cookie banner to click through.
      </p>

      <div className="mt-10 space-y-8 text-muted-foreground">
        <div>
          <h2 className="text-xl font-semibold text-primary">
            What we do store
          </h2>
          <ul className="mt-2 ml-5 list-disc space-y-2">
            <li>
              <strong className="text-foreground">Strictly necessary:</strong>{" "}
              when a member of pharmacy staff signs in to the secure enquiries
              area, a session token is stored in that staff member&apos;s
              browser so they stay signed in. Patients browsing the site never
              receive it.
            </li>
            <li>
              <strong className="text-foreground">Nothing else:</strong> no
              Google Analytics, no advertising pixels, no social media trackers,
              no third-party embeds that set cookies.
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-primary">
            Enquiry forms
          </h2>
          <p className="mt-2">
            Details you type into an enquiry form are sent directly to our
            secure database over an encrypted connection. They are not stored in
            your browser and are not shared with any advertising or analytics
            provider. See the{" "}
            <Link to="/privacy" className="text-primary underline">
              privacy notice
            </Link>{" "}
            for how we handle them.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-primary">Questions</h2>
          <p className="mt-2">
            Call us on {PHARMACY.phone} or pop into the pharmacy at{" "}
            {`${PHARMACY.addressLine1}, ${PHARMACY.addressLine2}, ${PHARMACY.postcode}`}.
          </p>
        </div>
      </div>
    </section>
  );
}
