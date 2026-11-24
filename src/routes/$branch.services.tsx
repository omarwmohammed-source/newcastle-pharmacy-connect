import { createFileRoute } from "@tanstack/react-router";
import { Truck } from "lucide-react";
import { ServiceCard } from "@/components/site/ServiceCard";
import { NHS_SERVICES } from "@/lib/pharmacy-data";
import { getBranch } from "@/lib/branches";
import logoAsset from "@/assets/kenton-pharmacy-logo.jpg.asset.json";
import { BASE_URL } from "@/lib/site-config";

const OG_IMAGE = `${BASE_URL}${logoAsset.url}`;

export const Route = createFileRoute("/$branch/services")({
  head: ({ params }) => {
    const branch = getBranch(params.branch);
    const url = `${BASE_URL}/${branch.slug}/services`;
    return {
      meta: [
        { title: `NHS Services — ${branch.name}` },
        {
          name: "description",
          content: `NHS pharmacy services at ${branch.name} in Newcastle. Pharmacy First, prescriptions, free delivery, blood pressure checks, and more.`,
        },
        { property: "og:title", content: `NHS Services — ${branch.name}` },
        {
          property: "og:description",
          content: `Full range of NHS pharmacy services and free prescription delivery across Newcastle from our ${branch.shortLabel} branch.`,
        },
        { property: "og:url", content: url },
        { property: "og:image", content: OG_IMAGE },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: OG_IMAGE },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  component: BranchServicesPage,
});

function BranchServicesPage() {
  const { branch: branchSlug } = Route.useParams();
  const branch = getBranch(branchSlug);
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
            {branch.name} offers the full range of NHS pharmacy services to
            patients across Newcastle upon Tyne. Register your interest on any
            service below and we&apos;ll be in touch.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pt-12">
        <h2 className="font-serif text-2xl font-semibold text-primary">
          Popular services
        </h2>
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((s) => (
            <ServiceCard key={s.slug} service={s} branch={branch} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <h2 className="font-serif text-2xl font-semibold text-primary">
          All NHS services
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {rest.length} more services available at {branch.name}.
        </p>
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((s) => (
            <ServiceCard key={s.slug} service={s} branch={branch} />
          ))}
        </div>
      </section>
    </>
  );
}