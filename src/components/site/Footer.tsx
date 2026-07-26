import { Link } from "@tanstack/react-router";
import { Truck } from "lucide-react";
import { Logo } from "./Logo";
import { PHARMACY } from "@/lib/pharmacy-data";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-muted/50">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 md:grid-cols-3">
        <div>
          <Logo />
          <p className="mt-4 text-sm text-muted-foreground">
            A trusted community pharmacy in Kenton, serving all areas of Newcastle
            upon Tyne with free prescription delivery.
          </p>
          <p className="mt-3 inline-flex items-center gap-2 rounded-md bg-accent/15 px-2.5 py-1 text-xs font-medium text-accent-foreground ring-1 ring-accent/30">
            <Truck className="h-3.5 w-3.5" />
            Free delivery across Newcastle
          </p>
        </div>
        <div className="text-sm">
          <h3 className="mb-2 font-serif text-lg font-semibold text-primary">
            Visit us
          </h3>
          <p className="text-muted-foreground">
            {PHARMACY.addressLine1}
            <br />
            {PHARMACY.addressLine2}
            <br />
            {PHARMACY.postcode}
          </p>
          <a
            href={PHARMACY.phoneHref}
            className="mt-2 inline-block text-primary hover:underline"
          >
            {PHARMACY.phone}
          </a>
        </div>
        <div className="text-sm">
          <h3 className="mb-2 font-serif text-lg font-semibold text-primary">
            Opening hours
          </h3>
          <ul className="space-y-1 text-muted-foreground">
            {PHARMACY.hours.map((h) => (
              <li key={h.day} className="flex justify-between gap-4">
                <span>{h.day}</span>
                <span>{h.time}</span>
              </li>
            ))}
          </ul>
          <Link
            to="/register"
            className="mt-3 inline-block text-primary hover:underline"
          >
            Register your interest →
          </Link>
        </div>
      </div>
      <div className="border-t border-border py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} {PHARMACY.name}. All rights reserved.
      </div>
    </footer>
  );
}
