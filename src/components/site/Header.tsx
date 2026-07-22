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
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <div className="hidden bg-primary text-primary-foreground md:block">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-2 text-sm">
          <a
            href={PHARMACY.phoneHref}
            className="inline-flex items-center gap-2 hover:underline"
          >
            <Phone className="h-4 w-4" />
            {PHARMACY.phone}
          </a>
          <span className="text-primary-foreground/80">
            {PHARMACY.addressLine1}, {PHARMACY.postcode}
          </span>
        </div>
      </div>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link to="/" aria-label="Kenton Pharmacy Clinic home">
          <Logo />
        </Link>
        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-muted hover:text-foreground data-[status=active]:bg-muted data-[status=active]:text-primary"
            >
              {item.label}
            </Link>
          ))}
          <Button asChild className="ml-2">
            <Link to="/register">Register interest</Link>
          </Button>
        </nav>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon" aria-label="Open menu">
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
