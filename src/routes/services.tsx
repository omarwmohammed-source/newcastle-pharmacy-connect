import { createFileRoute } from "@tanstack/react-router";
import { Truck } from "lucide-react";
import { ServiceCard } from "@/components/site/ServiceCard";
import { NHS_SERVICES } from "@/lib/pharmacy-data";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "NHS Services — Kenton Pharmacy Clinic" },
      {
        name: "description",
        content:
          "Browse all NHS pharmacy services at Kenton Pharmacy Clinic in Newcastle: Pharmacy First, prescriptions & EPS, free prescription delivery, blood pressure checks, vaccinations and more.",
      },
      { property: "og:title", content: "NHS Services — Kenton Pharmacy Clinic" },
      {
        property: "og:description",
        content:
          "Full range of NHS pharmacy services and free prescription delivery across Newcastle.",
      },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  const featured = NHS_SERVICES.filter((s) => s.featured);
  const rest = NHS_SERVICES.filter((s) => !s.featured).sort((a, b) =>
    a.name.localeCompare(b.name),
  );

  return (
    <>
      <section className="border-b border-border bg-gradient-to-b from-muted/60 to-background">
        <div className="mx-auto max-w-6xl px-6 py-14 sm:py-20">
          <p className="inline-flex items-center gap-2 rounded-full bg-accent/15 px-3 py-1 text-xs font-medium text-accent-foreground ring-1 ring-accent/30">
            <Truck className="h-3.5 w-3.5" />
            Free prescription delivery across Newcastle
          </p>
          <h1 className="mt-4 font-serif text-4xl font-semibold tracking-tight text-primary sm:text-5xl">
            Browse our NHS pharmacy services
          </h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Kenton Pharmacy Clinic offers the full range of NHS pharmacy
            services to patients across Newcastle upon Tyne. Register your
            interest on any service below and we'll be in touch.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pt-12">
        <h2 className="font-serif text-2xl font-semibold text-primary">
          Popular services
        </h2>
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((s) => (
            <ServiceCard key={s.slug} service={s} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <h2 className="font-serif text-2xl font-semibold text-primary">
          All NHS services
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {rest.length} more services available at Kenton Pharmacy Clinic.
        </p>
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((s) => (
            <ServiceCard key={s.slug} service={s} />
          ))}
        </div>
      </section>
    </>
  );
}
