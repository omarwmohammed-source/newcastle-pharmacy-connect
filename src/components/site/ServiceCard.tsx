import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Service } from "@/lib/pharmacy-data";
import { RegisterInterestDialog } from "./RegisterInterestDialog";

export function ServiceCard({ service }: { service: Service }) {
  const isPrivate = service.kind === "private";
  return (
    <div className="flex flex-col rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
      <div className="mb-3 flex items-start justify-between gap-2">
        <h3 className="font-serif text-xl font-semibold text-primary">
          {service.name}
        </h3>
        {isPrivate && (
          <span className="rounded-full bg-accent/15 px-2 py-0.5 text-xs font-medium text-accent-foreground/90 ring-1 ring-accent/30">
            Private
          </span>
        )}
      </div>
      <p className="text-sm text-muted-foreground">
        {service.description}
        {service.link && (
          <>
            {" "}
            <a
              href={service.link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline underline-offset-2 hover:text-primary/80"
            >
              {service.link.text}
            </a>
          </>
        )}
      </p>
      {service.details && (
        <ul className="mt-3 grid grid-cols-2 gap-x-3 gap-y-1 text-sm text-foreground/80">
          {service.details.map((d) => (
            <li key={d} className="before:mr-1.5 before:text-accent before:content-['•']">
              {d}
            </li>
          ))}
        </ul>
      )}
      <div className="mt-auto pt-5">
        <RegisterInterestDialog
          service={service}
          trigger={
            <Button variant="outline" className="w-full">
              Register interest
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          }
        />
      </div>
    </div>
  );
}
