import { Link, useParams } from "@tanstack/react-router";
import { Truck } from "lucide-react";
import { Logo } from "./Logo";
import { BRANCHES, BRANCH_LIST, UMBRELLA_BRAND, isBranchSlug } from "@/lib/branches";
import { BuiltByOmar } from "./BuiltByOmar";

export function Footer() {
  const params = useParams({ strict: false });
  const rawBranch = typeof params.branch === "string" ? params.branch : undefined;
  const activeBranch = isBranchSlug(rawBranch) ? BRANCHES[rawBranch] : null;

  return (
    <footer className="mt-24 border-t border-border bg-muted/50">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 md:grid-cols-3">
        <div>
          <Logo title={UMBRELLA_BRAND} />
          <p className="mt-4 text-sm text-muted-foreground">
            Trusted community pharmacies in Kenton and Chillingham Road, serving
            all areas of Newcastle upon Tyne with free prescription delivery.
          </p>
          <p className="mt-3 inline-flex items-center gap-2 rounded-md bg-accent/15 px-2.5 py-1 text-xs font-medium text-accent-foreground ring-1 ring-accent/30">
            <Truck className="h-3.5 w-3.5" />
            Free delivery across Newcastle
          </p>
          <BuiltByOmar />
        </div>

        {activeBranch ? (
          <>
            <div className="text-sm">
              <h3 className="mb-2 font-serif text-lg font-semibold text-primary">
                Visit {activeBranch.shortLabel}
              </h3>
              <p className="text-muted-foreground">
                {activeBranch.addressLine1}
                <br />
                {activeBranch.addressLine2}
                <br />
                {activeBranch.postcode}
              </p>
              <a
                href={activeBranch.phoneHref}
                className="mt-2 inline-block text-primary hover:underline"
              >
                {activeBranch.phone}
              </a>
              <div>
                <Link to="/" className="mt-2 inline-block text-xs text-muted-foreground hover:text-primary hover:underline">
                  Switch branch →
                </Link>
              </div>
            </div>
            <div className="text-sm">
              <h3 className="mb-2 font-serif text-lg font-semibold text-primary">
                Opening hours
              </h3>
              <ul className="space-y-1 text-muted-foreground">
                {activeBranch.hours.map((h) => (
                  <li key={h.day} className="flex justify-between gap-4">
                    <span>{h.day}</span>
                    <span>{h.time}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/$branch/register"
                params={{ branch: activeBranch.slug }}
                className="mt-3 inline-block text-primary hover:underline"
              >
                Register your interest →
              </Link>
            </div>
          </>
        ) : (
          BRANCH_LIST.map((branch) => (
            <div key={branch.slug} className="text-sm">
              <h3 className="mb-2 font-serif text-lg font-semibold text-primary">
                {branch.shortLabel}
              </h3>
              <p className="text-muted-foreground">
                {branch.addressLine1}
                <br />
                {branch.addressLine2}
                <br />
                {branch.postcode}
              </p>
              <a
                href={branch.phoneHref}
                className="mt-2 inline-block text-primary hover:underline"
              >
                {branch.phone}
              </a>
              <div>
                <Link
                  to="/$branch"
                  params={{ branch: branch.slug }}
                  className="mt-2 inline-block text-primary hover:underline"
                >
                  Visit {branch.shortLabel} branch →
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="border-t border-border py-4 text-center text-xs text-muted-foreground">
        <nav className="mb-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
          <Link to="/patient-privacy" className="hover:text-primary hover:underline">
            Patient privacy notice
          </Link>
          <Link to="/privacy" className="hover:text-primary hover:underline">
            Privacy notice
          </Link>
          <Link to="/cookies" className="hover:text-primary hover:underline">
            Cookie notice
          </Link>
          <Link to="/admin" className="hover:text-primary hover:underline">
            Staff login
          </Link>
        </nav>

        © {new Date().getFullYear()} {UMBRELLA_BRAND}. All rights reserved.
      </div>


    </footer>
  );
}
