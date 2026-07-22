import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, HeartPulse, Pill, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { OpeningHours } from "@/components/site/OpeningHours";
import { PHARMACY } from "@/lib/pharmacy-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kenton Pharmacy Clinic — Newcastle NE3 3RX" },
      {
        name: "description",
        content:
          "Community pharmacy in Kenton, Newcastle. NHS prescriptions, Pharmacy First, vaccinations and private weight loss and insomnia clinics.",
      },
      {
        property: "og:title",
        content: "Kenton Pharmacy Clinic — Newcastle NE3",
      },
      {
        property: "og:description",
        content:
          "NHS and private pharmacy services in Kenton, Newcastle upon Tyne.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <section className="border-b border-border bg-gradient-to-b from-muted/60 to-background">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-2 md:py-24">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">
              Your trusted community pharmacy in Kenton
            </h1>
            <p className="mt-4 max-w-lg text-base text-muted-foreground sm:text-lg">
              Friendly, expert pharmacy care in the heart of Kenton. We offer
              NHS services, private treatments and everyday prescription
              support.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/register">
                  Register your details
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/services">View services</Link>
              </Button>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                icon: Stethoscope,
                title: "NHS Services",
                copy: "Pharmacy First, vaccinations, BP checks and more.",
                to: "/services" as const,
              },
              {
                icon: HeartPulse,
                title: "Private Treatments",
                copy: "Weight Loss and Insomnia consultations.",
                to: "/private" as const,
              },
              {
                icon: Pill,
                title: "Prescriptions",
                copy: "Nominate us for EPS and collect quickly.",
                to: "/services" as const,
              },
            ].map((t) => (
              <Link
                key={t.title}
                to={t.to}
                className="rounded-xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md"
              >
                <t.icon className="h-6 w-6 text-accent" />
                <h2 className="mt-3 font-semibold text-primary">{t.title}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{t.copy}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-6 py-16 md:grid-cols-2">
        <OpeningHours />
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-primary">Find us</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {PHARMACY.addressLine1}
            <br />
            {PHARMACY.addressLine2}, {PHARMACY.postcode}
          </p>
          <a
            href={PHARMACY.phoneHref}
            className="mt-2 inline-block text-primary hover:underline"
          >
            {PHARMACY.phone}
          </a>
          <div className="mt-4 overflow-hidden rounded-lg border border-border">
            <iframe
              title="Map to Kenton Pharmacy Clinic"
              src={PHARMACY.mapEmbed}
              className="h-56 w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  );
}
