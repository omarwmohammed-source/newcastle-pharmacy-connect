import { createFileRoute } from "@tanstack/react-router";
import { ServiceCard } from "@/components/site/ServiceCard";
import { NHS_SERVICES } from "@/lib/pharmacy-data";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "NHS Services — Kenton Pharmacy Clinic" },
      {
        name: "description",
        content:
          "NHS services at Kenton Pharmacy Clinic in Newcastle: Pharmacy First, prescriptions & EPS, blood pressure checks, contraception, stop smoking, flu vaccination and more.",
      },
      { property: "og:title", content: "NHS Services — Kenton Pharmacy Clinic" },
      {
        property: "og:description",
        content: "NHS pharmacy services in Kenton, Newcastle upon Tyne.",
      },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <header className="max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
          NHS Services
        </h1>
        <p className="mt-3 text-muted-foreground">
          Free NHS services available at our Kenton pharmacy. Register your
          interest on any card below and we'll be in touch.
        </p>
      </header>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {NHS_SERVICES.map((s) => (
          <ServiceCard key={s.slug} service={s} />
        ))}
      </div>
    </section>
  );
}
