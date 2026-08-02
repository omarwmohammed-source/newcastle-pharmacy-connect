import { createFileRoute } from "@tanstack/react-router";
import { ServiceCard } from "@/components/site/ServiceCard";
import { PRIVATE_SERVICES } from "@/lib/pharmacy-data";
import { BASE_URL } from "@/lib/site-config";

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
      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {PRIVATE_SERVICES.map((s) => (
          <ServiceCard key={s.slug} service={s} />
        ))}
      </div>
    </section>
  );
}
