import { createFileRoute } from "@tanstack/react-router";
import { ServiceCard } from "@/components/site/ServiceCard";
import { PRIVATE_SERVICES } from "@/lib/pharmacy-data";

export const Route = createFileRoute("/private")({
  head: () => ({
    meta: [
      { title: "Private Clinics — Kenton Pharmacy Clinic" },
      {
        name: "description",
        content:
          "Private weight loss and insomnia clinics at Kenton Pharmacy Clinic in Newcastle upon Tyne.",
      },
      {
        property: "og:title",
        content: "Private Clinics — Kenton Pharmacy Clinic",
      },
      {
        property: "og:description",
        content:
          "Private weight loss and insomnia consultations in Kenton, Newcastle.",
      },
    ],
  }),
  component: PrivatePage,
});

function PrivatePage() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <header className="max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
          Private Clinics
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
