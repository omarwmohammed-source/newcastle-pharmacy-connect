import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { OpeningHours } from "@/components/site/OpeningHours";
import { PHARMACY } from "@/lib/pharmacy-data";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Kenton Pharmacy Clinic, Newcastle NE3 3RX" },
      {
        name: "description",
        content: `Contact Kenton Pharmacy Clinic on ${PHARMACY.phone}. Visit us at ${PHARMACY.addressLine1}, Newcastle upon Tyne, ${PHARMACY.postcode}.`,
      },
      {
        property: "og:title",
        content: "Contact — Kenton Pharmacy Clinic",
      },
      {
        property: "og:description",
        content: `Visit us at ${PHARMACY.addressLine1}, Newcastle, ${PHARMACY.postcode}.`,
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <header className="max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
          Contact us
        </h1>
        <p className="mt-3 text-muted-foreground">
          Pop in, give us a call, or register your interest online.
        </p>
      </header>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-primary">Get in touch</h2>
          <div className="mt-4 space-y-3 text-sm">
            <a
              href={PHARMACY.phoneHref}
              className="flex items-start gap-3 text-foreground hover:text-primary"
            >
              <Phone className="mt-0.5 h-4 w-4 text-accent" />
              <span>{PHARMACY.phone}</span>
            </a>
            <p className="flex items-start gap-3 text-foreground">
              <MapPin className="mt-0.5 h-4 w-4 text-accent" />
              <span>
                {PHARMACY.addressLine1}
                <br />
                {PHARMACY.addressLine2}
                <br />
                {PHARMACY.postcode}
              </span>
            </p>
          </div>
          <Button asChild className="mt-6">
            <Link to="/register">Register your interest</Link>
          </Button>
        </div>
        <OpeningHours />
      </div>

      <div className="mt-8 overflow-hidden rounded-xl border border-border">
        <iframe
          title="Map to Kenton Pharmacy Clinic"
          src={PHARMACY.mapEmbed}
          className="h-96 w-full"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  );
}
