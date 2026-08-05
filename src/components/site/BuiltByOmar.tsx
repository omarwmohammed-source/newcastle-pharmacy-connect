import { useState } from "react";
import { ArrowRight, Mail, Phone } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function BuiltByOmar() {
  const [open, setOpen] = useState(false);

  return (
    <p className="mt-2 text-xs text-muted-foreground">
      This website was built by Omar, and I help small businesses use AI to save
      time and money.{" "}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button
            type="button"
            className="inline-flex items-center gap-1 font-medium text-accent underline underline-offset-2 hover:opacity-80"
          >
            Currently building free pilots
            <ArrowRight className="h-3 w-3" />
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl text-primary">
              AI that actually saves you time
            </DialogTitle>
            <DialogDescription className="sr-only">
              Contact details for Omar
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 text-sm text-muted-foreground">
            <p>
              I work with small businesses to integrate AI and build simple,
              practical tools, like booking forms, admin automation, and websites
              like this one, without the jargon or the enterprise price tag.
            </p>
            <p>
              I'm currently taking on a limited number of projects{" "}
              <span className="font-medium text-foreground">
                free of charge
              </span>{" "}
              while building up case studies, so the only cost is a
              conversation.
            </p>
          </div>
          <div className="mt-2 space-y-2">
            <a
              href="mailto:omarwmohammed@gmail.com"
              className="flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-3 text-sm font-medium text-primary transition-colors hover:bg-muted"
            >
              <Mail className="h-4 w-4 text-accent" />
              omarwmohammed@gmail.com
            </a>
            <a
              href="tel:+447392688684"
              className="flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-3 text-sm font-medium text-primary transition-colors hover:bg-muted"
            >
              <Phone className="h-4 w-4 text-accent" />
              +44 7392 688684
            </a>
          </div>
          <p className="text-xs text-muted-foreground">
            No pitch, no obligation, just tell me what's eating your time.
          </p>
        </DialogContent>
      </Dialog>
    </p>
  );
}
