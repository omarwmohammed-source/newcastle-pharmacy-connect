import { type ReactNode, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  PATIENT_PRIVACY_INTRO,
  PATIENT_PRIVACY_TITLE,
  PatientPrivacyBody,
} from "@/lib/patient-privacy-content";

export function PatientPrivacyDialog({
  trigger,
  open,
  onOpenChange,
}: {
  trigger?: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = open !== undefined;

  return (
    <Dialog
      open={isControlled ? open : internalOpen}
      onOpenChange={isControlled ? onOpenChange : setInternalOpen}
    >
      {trigger ? <DialogTrigger asChild>{trigger}</DialogTrigger> : null}
      <DialogContent className="max-h-[85vh] max-w-2xl gap-0 p-0">
        <DialogHeader className="border-b border-border px-6 py-5 text-left">
          <DialogTitle className="font-serif text-2xl text-primary">
            {PATIENT_PRIVACY_TITLE}
          </DialogTitle>
          <DialogDescription className="text-sm leading-relaxed">
            {PATIENT_PRIVACY_INTRO}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[55vh] px-6 py-6">
          <PatientPrivacyBody headingLevel="h3" />
        </ScrollArea>
        <div className="border-t border-border px-6 py-4 text-sm">
          <Link
            to="/patient-privacy"
            className="text-primary underline underline-offset-2"
            onClick={() =>
              isControlled ? onOpenChange?.(false) : setInternalOpen(false)
            }
          >
            View as full page
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
}
