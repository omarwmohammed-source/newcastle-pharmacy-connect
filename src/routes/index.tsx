import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, HeartPulse, Pill, Stethoscope, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { OpeningHours } from "@/components/site/OpeningHours";
import { PHARMACY } from "@/lib/pharmacy-data";
import logoAsset from "@/assets/kenton-pharmacy-logo.jpg.asset.json";

const BASE_URL = "https://kenton-pharmacy-clinic.lovable.app";
const LOGO_URL = `${BASE_URL}${logoAsset.url}`;

const pharmacySchema = {
  "@context": "https://schema.org",
  "@type": "Pharmacy",
  name: PHARMACY.name,
  image: LOGO_URL,
  url: BASE_URL,
  telephone: PHARMACY.phoneHref.replace("tel:", ""),
  address: {
    "@type": "PostalAddress",
    streetAddress: PHARMACY.addressLine1,
    addressLocality: PHARMACY.addressLine2,
    postalCode: PHARMACY.postcode,
    addressCountry: "GB",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "54.9975",
    longitude: "-1.6505",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:30",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "09:00",
      closes: "18:00",
    },
  ],
  areaServed: {
    "@type": "City",
    name: "Newcastle upon Tyne",
  },
  priceRange: "£",
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kenton Pharmacy Clinic — Newcastle NE3 3RX" },
      {
        name: "description",
        content:
          "Community pharmacy in Kenton, Newcastle. Full NHS services, free prescription delivery across Newcastle, and private weight loss and insomnia treatments.",
      },
      {
        property: "og:title",
        content: "Kenton Pharmacy Clinic — Newcastle NE3",
      },
      {
        property: "og:description",
        content:
          "Full NHS pharmacy services and free prescription delivery across Newcastle.",
      },
    ],
    links: [
      { rel: "canonical", href: BASE_URL },
    ],
  }),
  component: Home,
});


function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pharmacySchema) }}
      />
      <section className="border-b border-border bg-gradient-to-b from-muted/60 to-background">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-2 md:py-24">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-accent/15 px-3 py-1 text-xs font-medium text-accent-foreground ring-1 ring-accent/30">
              <Truck className="h-3.5 w-3.5" />
              Free prescription delivery across Newcastle
            </p>
            <h1 className="mt-4 font-serif text-4xl font-semibold tracking-tight text-primary sm:text-5xl">
              Your trusted community pharmacy in Kenton
            </h1>
            <p className="mt-4 max-w-lg text-base text-muted-foreground sm:text-lg">
              We serve all areas of Newcastle upon Tyne with the full range of
              NHS pharmacy services, free prescription delivery, and private
              treatments. Our team of friendly, expert pharmacists is here to help.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/register">
                  Register your details
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/services">View NHS services</Link>
              </Button>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                icon: Truck,
                title: "Free delivery",
                copy: "Free NHS prescription delivery to any Newcastle address.",
                to: "/services" as const,
              },
              {
                icon: Stethoscope,
                title: "All NHS services",
                copy: "Pharmacy First, BP checks, vaccinations and more.",
                to: "/services" as const,
              },
              {
                icon: Pill,
                title: "Prescriptions & EPS",
                copy: "Nominate us and pick up quickly, or have them delivered.",
                to: "/services" as const,
              },
              {
                icon: HeartPulse,
                title: "Private Treatments",
                copy: "Weight Loss and Insomnia consultations.",
                to: "/private" as const,
              },
            ].map((t) => (
              <Link
                key={t.title}
                to={t.to}
                className="rounded-xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md"
              >
                <t.icon className="h-6 w-6 text-accent" />
                <h2 className="mt-3 font-serif text-lg font-semibold text-primary">
                  {t.title}
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">{t.copy}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-6 py-16 md:grid-cols-2">
        <OpeningHours />
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <h2 className="font-serif text-xl font-semibold text-primary">
            Find us
          </h2>
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
