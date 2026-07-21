import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { PHARMACY } from "@/lib/pharmacy-data";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-muted/50">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 md:grid-cols-3">
        <div>
          <Logo />
          <p className="mt-4 text-sm text-muted-foreground">
            A trusted community pharmacy in Kenton, Newcastle upon Tyne.
          </p>
        </div>
        <div className="text-sm">
          <h3 className="mb-2 font-semibold text-foreground">Visit us</h3>
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
          <h3 className="mb-2 font-semibold text-foreground">Opening hours</h3>
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
