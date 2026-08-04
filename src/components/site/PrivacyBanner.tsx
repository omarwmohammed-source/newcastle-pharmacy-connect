import { useEffect, useState } from "react";
import { X, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PatientPrivacyDialog } from "./PatientPrivacyNotice";

const STORAGE_KEY = "kpc-patient-privacy-dismissed";

export function PrivacyBanner() {
  const [visible, setVisible] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    try {
      if (window.localStorage.getItem(STORAGE_KEY) !== "1") setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  function dismiss() {
    setVisible(false);
    try {
      window.localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
  }

  return (
    <>
      <PatientPrivacyDialog open={dialogOpen} onOpenChange={setDialogOpen} />
      {visible ? (
        <div
          role="region"
          aria-label="Patient privacy notice"
          className="fixed inset-x-0 bottom-0 z-40 border-t border-accent/30 bg-primary/95 text-primary-foreground backdrop-blur supports-[backdrop-filter]:bg-primary/90"
        >
          <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <p className="flex items-start gap-2 pr-6 text-xs leading-relaxed sm:text-sm">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <span>
                We keep records about you and your care. Read how we look after
                and safeguard information about you.
              </span>
            </p>
            <div className="flex shrink-0 items-center gap-2">
              <Button
                size="sm"
                onClick={() => setDialogOpen(true)}
                className="bg-accent text-accent-foreground hover:bg-accent/90"
              >
                Read notice
              </Button>
              <button
                type="button"
                onClick={dismiss}
                aria-label="Dismiss privacy notice"
                className="rounded-md p-1.5 text-primary-foreground/80 transition-colors hover:bg-primary-foreground/10 hover:text-primary-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
