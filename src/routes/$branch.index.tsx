import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, HeartPulse, Pill, Stethoscope, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { OpeningHours } from "@/components/site/OpeningHours";
import { getBranch, UMBRELLA_BRAND } from "@/lib/branches";
import logoAsset from "@/assets/kenton-pharmacy-logo.jpg.asset.json";
import { BASE_URL } from "@/lib/site-config";

const LOGO_URL = `${BASE_URL}${logoAsset.url}`;

export const Route = createFileRoute("/$branch/")({
  head: ({ params }) => {
    const branch = getBranch(params.branch);
    const url = `${BASE_URL}/${branch.slug}`;
    const schema = {
      "@context": "https://schema.org",
      "@type": "Pharmacy",
      name: branch.name,
      parentOrganization: {
        "@type": "Organization",
        name: UMBRELLA_BRAND,
        url: BASE_URL,
      },
      image: LOGO_URL,
      url,
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
    };

    return {
      meta: [
        { title: `${branch.name} — Newcastle ${branch.postcode}` },
        {
          name: "description",
          content: `Community pharmacy in ${branch.shortLabel}, Newcastle (${branch.postcode}). Full NHS services, free prescription delivery across Newcastle, and private weight loss and insomnia treatments.`,
        },
        { property: "og:title", content: `${branch.name} — Newcastle ${branch.postcode}` },
        {
          property: "og:description",
          content: `Full NHS pharmacy services and free prescription delivery across Newcastle from our ${branch.shortLabel} branch.`,
        },
        { property: "og:url", content: url },
        { property: "og:image", content: LOGO_URL },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: LOGO_URL },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(schema),
        },
      ],
    };
  },
  component: BranchHome,
});

function BranchHome() {
  const { branch: branchSlug } = Route.useParams();
  const branch = getBranch(branchSlug);

  const tiles = [
    {
      icon: Truck,
      title: "Free delivery",
      copy: "Free NHS prescription delivery to any Newcastle address.",
      to: "/$branch/services" as const,
    },
    {
      icon: Stethoscope,
      title: "All NHS services",
      copy: "Pharmacy First, BP checks, vaccinations and more.",
      to: "/$branch/services" as const,
    },
    {
      icon: Pill,
      title: "Prescriptions & EPS",
      copy: "Nominate us and pick up quickly, or have them delivered.",
      to: "/$branch/services" as const,
    },
    {
      icon: HeartPulse,
      title: "Private Treatments",
      copy: "Weight Loss and Insomnia consultations.",
      to: "/$branch/private" as const,
    },
  ];

  return (
    <>
      <section className="border-b border-border bg-gradient-to-b from-muted/60 to-background">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-2 md:py-24">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-accent/15 px-3 py-1 text-xs font-medium text-accent-foreground ring-1 ring-accent/30">
              <Truck className="h-3.5 w-3.5" />
              Free prescription delivery across Newcastle
            </p>
            <h1 className="mt-4 font-serif text-4xl font-semibold tracking-tight text-primary sm:text-5xl">
              Your trusted community pharmacy in {branch.shortLabel}
            </h1>
            <p className="mt-4 max-w-lg text-base text-muted-foreground sm:text-lg">
              We serve all areas of Newcastle upon Tyne with the full range of
              NHS pharmacy services, free prescription delivery, and private
              treatments. Our team of friendly, expert pharmacists is here to help.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/$branch/register" params={{ branch: branch.slug }}>
                  Register your details
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/$branch/services" params={{ branch: branch.slug }}>
                  View NHS services
                </Link>
              </Button>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {tiles.map((t) => (
              <Link
                key={t.title}
                to={t.to}
                params={{ branch: branch.slug }}
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
        <OpeningHours branch={branch} />
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <h2 className="font-serif text-xl font-semibold text-primary">
            Find us
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {branch.addressLine1}
            <br />
            {branch.addressLine2}, {branch.postcode}
          </p>
          <a
            href={branch.phoneHref}
            className="mt-2 inline-block text-primary hover:underline"
          >
            {branch.phone}
          </a>
          <div className="mt-4 overflow-hidden rounded-lg border border-border">
            <iframe
              title={`Map to ${branch.name}`}
              src={branch.mapEmbed}
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