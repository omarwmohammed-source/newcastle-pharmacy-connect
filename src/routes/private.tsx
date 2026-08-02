import { createFileRoute } from "@tanstack/react-router";
import { ServiceCard } from "@/components/site/ServiceCard";
import { PRIVATE_SERVICES } from "@/lib/pharmacy-data";
import logoAsset from "@/assets/kenton-pharmacy-logo.jpg.asset.json";
import { BASE_URL } from "@/lib/site-config";

const OG_IMAGE = `${BASE_URL}${logoAsset.url}`;

export const Route = createFileRoute("/private")({
  head: () => ({
    meta: [
      { title: "Private Treatments — Kenton Pharmacy Clinic" },
      {
        name: "description",
        content:
          "Private weight loss and insomnia treatments at Kenton Pharmacy Clinic in Newcastle upon Tyne.",
      },
      {
        property: "og:title",
        content: "Private Treatments — Kenton Pharmacy Clinic",
      },
      {
        property: "og:description",
        content:
          "Private weight loss and insomnia treatments in Kenton, Newcastle.",
      },
      { property: "og:url", content: `${BASE_URL}/private` },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:type", content: "website" },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: `${BASE_URL}/private` }],
  }),
  component: PrivatePage,
});


function PrivatePage() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <header className="max-w-2xl">
        <h1 className="font-serif text-4xl font-semibold tracking-tight text-primary sm:text-5xl">
          Private Treatments
        </h1>

        <p className="mt-3 text-muted-foreground">
          Private consultations with our pharmacy team. Register your interest
          and we'll contact you to arrange an appointment.
        </p>
      </header>
      <h2 className="mt-10 font-serif text-2xl font-semibold text-primary">
        Available private treatments
      </h2>
      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        {PRIVATE_SERVICES.map((s) => (
          <ServiceCard key={s.slug} service={s} />
        ))}
      </div>
    </section>
  );
}
