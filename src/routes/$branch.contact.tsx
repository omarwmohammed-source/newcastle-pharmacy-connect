import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { OpeningHours } from "@/components/site/OpeningHours";
import { getBranch } from "@/lib/branches";
import logoAsset from "@/assets/kenton-pharmacy-logo.jpg.asset.json";
import { BASE_URL } from "@/lib/site-config";

const OG_IMAGE = `${BASE_URL}${logoAsset.url}`;

export const Route = createFileRoute("/$branch/contact")({
  head: ({ params }) => {
    const branch = getBranch(params.branch);
    const url = `${BASE_URL}/${branch.slug}/contact`;
    return {
      meta: [
        { title: `Contact — ${branch.name}, Newcastle ${branch.postcode}` },
        {
          name: "description",
          content: `Contact ${branch.name} on ${branch.phone}. Visit us at ${branch.addressLine1}, ${branch.addressLine2}, ${branch.postcode}.`,
        },
        { property: "og:title", content: `Contact — ${branch.name}` },
        {
          property: "og:description",
          content: `Visit us at ${branch.addressLine1}, Newcastle, ${branch.postcode}.`,
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
  component: BranchContactPage,
});

function BranchContactPage() {
  const { branch: branchSlug } = Route.useParams();
  const branch = getBranch(branchSlug);

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <header className="max-w-2xl">
        <h1 className="font-serif text-3xl font-bold tracking-tight text-primary sm:text-4xl">
          Contact {branch.name}
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
              href={branch.phoneHref}
              className="flex items-start gap-3 text-foreground hover:text-primary"
            >
              <Phone className="mt-0.5 h-4 w-4 text-accent" />
              <span>{branch.phone}</span>
            </a>
            <p className="flex items-start gap-3 text-foreground">
              <MapPin className="mt-0.5 h-4 w-4 text-accent" />
              <span>
                {branch.addressLine1}
                <br />
                {branch.addressLine2}
                <br />
                {branch.postcode}
              </span>
            </p>
          </div>
          <Button asChild className="mt-6">
            <Link to="/$branch/register" params={{ branch: branch.slug }}>
              Register your interest
            </Link>
          </Button>
        </div>
        <OpeningHours branch={branch} />
      </div>

      <div className="mt-8 overflow-hidden rounded-xl border border-border">
        <iframe
          title={`Map to ${branch.name}`}
          src={branch.mapEmbed}
          className="h-96 w-full"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  );
}