import { Link, useParams } from "@tanstack/react-router";
import { ArrowLeftRight, Menu, Phone, Truck } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Logo } from "./Logo";
import { BRANCHES, BRANCH_LIST, UMBRELLA_BRAND, isBranchSlug } from "@/lib/branches";

export function Header() {
  const [open, setOpen] = useState(false);
  const params = useParams({ strict: false });
  const rawBranch = typeof params.branch === "string" ? params.branch : undefined;
  const activeBranch = isBranchSlug(rawBranch) ? BRANCHES[rawBranch] : null;

  return (
    <header className="sticky top-0 z-40 shadow-sm">
      {/* Announcement strip */}
      <div className="bg-accent text-accent-foreground">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-4 gap-y-1 px-4 py-1.5 text-center text-xs font-medium sm:px-6 sm:text-sm">
          <span className="inline-flex items-center gap-1.5">
            <Truck className="h-3.5 w-3.5" />
            Free prescription delivery across all of Newcastle
          </span>
          <span className="hidden opacity-40 sm:inline">•</span>
          {activeBranch ? (
            <a
              href={activeBranch.phoneHref}
              className="inline-flex items-center gap-1.5 hover:underline"
            >
              <Phone className="h-3.5 w-3.5" />
              {activeBranch.phone}
            </a>
          ) : (
            <span className="inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-0.5">
              {BRANCH_LIST.map((b) => (
                <a
                  key={b.slug}
                  href={b.phoneHref}
                  className="inline-flex items-center gap-1 hover:underline"
                >
                  <Phone className="h-3 w-3" />
                  {b.shortLabel}: {b.phone}
                </a>
              ))}
            </span>
          )}
        </div>
      </div>

      {/* Main bar */}
      <div className="bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3 sm:px-6">
          {activeBranch ? (
            <Link
              to="/$branch"
              params={{ branch: activeBranch.slug }}
              aria-label={`${activeBranch.name} home`}
              className="shrink-0"
            >
              <Logo title={activeBranch.name} onDark />
            </Link>
          ) : (
            <Link to="/" aria-label={`${UMBRELLA_BRAND} home`} className="shrink-0">
              <Logo title={UMBRELLA_BRAND} onDark />
            </Link>
          )}

          <div className="ml-auto flex items-center gap-2">
          <nav className="hidden items-center gap-0.5 whitespace-nowrap xl:flex">
            {activeBranch ? (
              <>
                <Link
                  to="/$branch"
                  params={{ branch: activeBranch.slug }}
                  activeOptions={{ exact: true }}
                  className="rounded-md px-2.5 py-2 text-sm font-medium text-primary-foreground/80 transition-colors hover:bg-primary-foreground/10 hover:text-primary-foreground data-[status=active]:bg-primary-foreground/15 data-[status=active]:text-primary-foreground"
                >
                  Home
                </Link>
                <Link
                  to="/$branch/services"
                  params={{ branch: activeBranch.slug }}
                  className="rounded-md px-2.5 py-2 text-sm font-medium text-primary-foreground/80 transition-colors hover:bg-primary-foreground/10 hover:text-primary-foreground data-[status=active]:bg-primary-foreground/15 data-[status=active]:text-primary-foreground"
                >
                  NHS Services
                </Link>
                <Link
                  to="/$branch/private"
                  params={{ branch: activeBranch.slug }}
                  className="rounded-md px-2.5 py-2 text-sm font-medium text-primary-foreground/80 transition-colors hover:bg-primary-foreground/10 hover:text-primary-foreground data-[status=active]:bg-primary-foreground/15 data-[status=active]:text-primary-foreground"
                >
                  Private Treatments
                </Link>
                <Link
                  to="/$branch/contact"
                  params={{ branch: activeBranch.slug }}
                  className="rounded-md px-2.5 py-2 text-sm font-medium text-primary-foreground/80 transition-colors hover:bg-primary-foreground/10 hover:text-primary-foreground data-[status=active]:bg-primary-foreground/15 data-[status=active]:text-primary-foreground"
                >
                  Contact
                </Link>
                <Button
                  asChild
                  className="ml-2 bg-accent text-accent-foreground hover:bg-accent/90"
                >
                  <Link to="/$branch/register" params={{ branch: activeBranch.slug }}>
                    Register interest
                  </Link>
                </Button>
              </>
            ) : (
              BRANCH_LIST.map((b) => (
                <Link
                  key={b.slug}
                  to="/$branch"
                  params={{ branch: b.slug }}
                  className="rounded-md px-3 py-2 text-sm font-medium text-primary-foreground/85 transition-colors hover:bg-primary-foreground/10 hover:text-primary-foreground"
                >
                  {b.shortLabel}
                </Link>
              ))
            )}
          </nav>
          {activeBranch && (
            <Link
              to="/"
              aria-label="Change branch"
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-accent/50 bg-primary-foreground/10 px-3 py-1.5 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary-foreground/20 sm:text-sm"
            >
              <ArrowLeftRight className="h-3.5 w-3.5" />
              Change branch
            </Link>
          )}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="xl:hidden">
              <Button
                variant="ghost"
                size="icon"
                aria-label="Open menu"
                className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <div className="mt-4 flex flex-col gap-1">
                {activeBranch ? (
                  <>
                    <Link
                      to="/$branch"
                      params={{ branch: activeBranch.slug }}
                      onClick={() => setOpen(false)}
                      activeOptions={{ exact: true }}
                      className="rounded-md px-3 py-3 text-base font-medium text-foreground/90 hover:bg-muted data-[status=active]:bg-muted data-[status=active]:text-primary"
                    >
                      Home
                    </Link>
                    <Link
                      to="/$branch/services"
                      params={{ branch: activeBranch.slug }}
                      onClick={() => setOpen(false)}
                      className="rounded-md px-3 py-3 text-base font-medium text-foreground/90 hover:bg-muted data-[status=active]:bg-muted data-[status=active]:text-primary"
                    >
                      NHS Services
                    </Link>
                    <Link
                      to="/$branch/private"
                      params={{ branch: activeBranch.slug }}
                      onClick={() => setOpen(false)}
                      className="rounded-md px-3 py-3 text-base font-medium text-foreground/90 hover:bg-muted data-[status=active]:bg-muted data-[status=active]:text-primary"
                    >
                      Private Treatments
                    </Link>
                    <Link
                      to="/$branch/contact"
                      params={{ branch: activeBranch.slug }}
                      onClick={() => setOpen(false)}
                      className="rounded-md px-3 py-3 text-base font-medium text-foreground/90 hover:bg-muted data-[status=active]:bg-muted data-[status=active]:text-primary"
                    >
                      Contact
                    </Link>
                    <Button asChild className="mt-3">
                      <Link
                        to="/$branch/register"
                        params={{ branch: activeBranch.slug }}
                        onClick={() => setOpen(false)}
                      >
                        Register interest
                      </Link>
                    </Button>
                    <Link
                      to="/"
                      onClick={() => setOpen(false)}
                      className="mt-2 inline-flex items-center gap-2 rounded-md border border-border px-3 py-2.5 text-sm font-medium text-primary hover:bg-muted"
                    >
                      <ArrowLeftRight className="h-4 w-4" />
                      Switch branch
                    </Link>
                    <a
                      href={activeBranch.phoneHref}
                      className="mt-3 inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground"
                    >
                      <Phone className="h-4 w-4" />
                      {activeBranch.phone}
                    </a>
                  </>
                ) : (
                  <>
                    <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Choose a branch
                    </p>
                    {BRANCH_LIST.map((b) => (
                      <Link
                        key={b.slug}
                        to="/$branch"
                        params={{ branch: b.slug }}
                        onClick={() => setOpen(false)}
                        className="rounded-md px-3 py-3 text-base font-medium text-foreground/90 hover:bg-muted"
                      >
                        {b.shortLabel}
                        <span className="block text-xs font-normal text-muted-foreground">
                          {b.addressLine1}, {b.postcode}
                        </span>
                      </Link>
                    ))}
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
