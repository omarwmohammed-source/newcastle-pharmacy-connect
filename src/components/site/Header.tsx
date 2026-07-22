import { Link } from "@tanstack/react-router";
import { Menu, Phone } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Logo } from "./Logo";
import { PHARMACY } from "@/lib/pharmacy-data";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/services", label: "NHS Services" },
  { to: "/private", label: "Private Treatments" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-primary/20 bg-primary text-primary-foreground shadow-sm">
      <div className="hidden border-b border-primary-foreground/10 md:block">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-2 text-xs text-primary-foreground/85">
          <a
            href={PHARMACY.phoneHref}
            className="inline-flex items-center gap-2 hover:text-primary-foreground"
          >
            <Phone className="h-3.5 w-3.5" />
            {PHARMACY.phone}
          </a>
          <span>
            {PHARMACY.addressLine1}, {PHARMACY.postcode}
          </span>
        </div>
      </div>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link to="/" aria-label="Kenton Pharmacy Clinic home" className="shrink-0">
          <Logo onDark />
        </Link>
        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              className="rounded-md px-3 py-2 text-sm font-medium text-primary-foreground/80 transition-colors hover:bg-primary-foreground/10 hover:text-primary-foreground data-[status=active]:bg-primary-foreground/15 data-[status=active]:text-primary-foreground"
            >
              {item.label}
            </Link>
          ))}
          <Button
            asChild
            className="ml-2 bg-accent text-accent-foreground hover:bg-accent/90"
          >
            <Link to="/register">Register interest</Link>
          </Button>
        </nav>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="lg:hidden">
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
              {NAV.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  activeOptions={{ exact: item.to === "/" }}
                  className="rounded-md px-3 py-3 text-base font-medium text-foreground/90 hover:bg-muted data-[status=active]:bg-muted data-[status=active]:text-primary"
                >
                  {item.label}
                </Link>
              ))}
              <Button asChild className="mt-3">
                <Link to="/register" onClick={() => setOpen(false)}>
                  Register interest
                </Link>
              </Button>
              <a
                href={PHARMACY.phoneHref}
                className="mt-3 inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground"
              >
                <Phone className="h-4 w-4" />
                {PHARMACY.phone}
              </a>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
