import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Clock, MapPin, Phone, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BRANCH_LIST, UMBRELLA_BRAND } from "@/lib/branches";
import logoAsset from "@/assets/kenton-pharmacy-logo.jpg.asset.json";
import { BASE_URL } from "@/lib/site-config";

const LOGO_URL = `${BASE_URL}${logoAsset.url}`;

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: UMBRELLA_BRAND,
  url: BASE_URL,
  logo: LOGO_URL,
  areaServed: {
    "@type": "City",
    name: "Newcastle upon Tyne",
  },
  department: BRANCH_LIST.map((branch) => ({
    "@type": "Pharmacy",
    name: branch.name,
    image: LOGO_URL,
    url: `${BASE_URL}/${branch.slug}`,
    telephone: branch.phoneHref.replace("tel:", ""),
    address: {
      "@type": "PostalAddress",
      streetAddress: branch.addressLine1,
      addressLocality: branch.addressLine2,
      postalCode: branch.postcode,
      addressCountry: "GB",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: branch.geo.latitude,
      longitude: branch.geo.longitude,
    },
    openingHoursSpecification: branch.openingHoursSpecification,
    areaServed: {
      "@type": "City",
      name: "Newcastle upon Tyne",
    },
    priceRange: "£",
  })),
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${UMBRELLA_BRAND} — Kenton & Chillingham Road, Newcastle` },
      {
        name: "description",
        content:
          "Newcastle Pharmacy Clinic serves Kenton (NE3 3RX) and Chillingham Road (NE6 5LJ). Full NHS pharmacy services, free prescription delivery across Newcastle, and private treatments.",
      },
      {
        property: "og:title",
        content: `${UMBRELLA_BRAND} — Kenton & Chillingham Road`,
      },
      {
        property: "og:description",
        content:
          "Choose your Newcastle Pharmacy Clinic branch in Kenton or Chillingham Road for NHS services, free delivery, and private treatments.",
      },
      { property: "og:url", content: BASE_URL },
      { property: "og:image", content: LOGO_URL },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: LOGO_URL },
    ],
    links: [{ rel: "canonical", href: BASE_URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(organizationSchema),
      },
    ],
  }),
  component: BranchSelectorPage,
});

function BranchSelectorPage() {
  return (
    <section className="bg-gradient-to-b from-muted/60 to-background">
      <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full bg-accent/15 px-3 py-1 text-xs font-medium text-accent-foreground ring-1 ring-accent/30">
            <Truck className="h-3.5 w-3.5" />
            Free prescription delivery across all of Newcastle
          </p>
          <h1 className="mt-5 font-serif text-4xl font-semibold tracking-tight text-primary sm:text-5xl">
            {UMBRELLA_BRAND}
          </h1>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            Select your local branch below for NHS pharmacy services, free
            prescription delivery across Newcastle upon Tyne, and private
            treatments.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {BRANCH_LIST.map((branch) => (
            <article
              key={branch.slug}
              className="flex flex-col rounded-2xl border border-border bg-card p-7 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-serif text-2xl font-semibold text-primary sm:text-3xl">
                    {branch.shortLabel}
                  </h2>
                  <p className="mt-1 text-sm font-medium text-muted-foreground">
                    {branch.name}
                  </p>
                </div>
                <span className="shrink-0 rounded-full bg-accent/15 px-2.5 py-1 text-xs font-medium text-accent-foreground ring-1 ring-accent/30">
                  {branch.postcode}
                </span>
              </div>

              <div className="mt-6 space-y-3 text-sm">
                <p className="flex items-start gap-3 text-foreground">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <span>
                    {branch.addressLine1}, {branch.addressLine2},{" "}
                    {branch.postcode}
                  </span>
                </p>
                <a
                  href={branch.phoneHref}
                  className="flex items-center gap-3 text-primary hover:underline"
                >
                  <Phone className="h-4 w-4 shrink-0 text-accent" />
                  <span>{branch.phone}</span>
                </a>
                <div className="flex items-start gap-3 pt-1 text-muted-foreground">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <dl className="w-full space-y-1">
                    {branch.hours.map((h) => (
                      <div
                        key={h.day}
                        className="flex justify-between gap-4 text-xs sm:text-sm"
                      >
                        <dt>{h.day}</dt>
                        <dd className="font-medium text-foreground">{h.time}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>

              <div className="mt-8 pt-2">
                <Button asChild size="lg" className="w-full">
                  <Link to="/$branch" params={{ branch: branch.slug }}>
                    Visit {branch.shortLabel} branch
                    <ArrowRight className="ml-1.5 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
