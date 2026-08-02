import { useState, type ReactNode } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { submitEnquiry } from "@/lib/enquiries.functions";
import type { Service } from "@/lib/pharmacy-data";


const schema = z.object({
  fullName: z.string().trim().min(1, "Please enter your full name").max(100),
  phone: z
    .string()
    .trim()
    .min(7, "Please enter a valid phone number")
    .max(20)
    .regex(/^[0-9 +()-]+$/, "Only digits, spaces and + ( ) - allowed"),
  email: z
    .string()
    .trim()
    .max(255)
    .email("Enter a valid email")
    .optional()
    .or(z.literal("")),
  notes: z.string().trim().max(1000).optional().or(z.literal("")),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Please tick to agree" }),
  }),
});

type Values = {
  fullName: string;
  phone: string;
  email: string;
  notes: string;
  consent: boolean;
};

const empty: Values = {
  fullName: "",
  phone: "",
  email: "",
  notes: "",
  consent: false,
};

export function RegisterInterestDialog({
  service,
  trigger,
}: {
  service: Service;
  trigger: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState<Values>(empty);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pending, setPending] = useState(false);
  const send = useServerFn(submitEnquiry);

  const set = <K extends keyof Values>(k: K, v: Values[K]) =>
    setValues((prev) => ({ ...prev, [k]: v }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse(values);
    if (!result.success) {
      const f: Record<string, string> = {};
      for (const i of result.error.issues) {
        const k = i.path[0];
        if (typeof k === "string" && !f[k]) f[k] = i.message;
      }
      setErrors(f);
      return;
    }
    setErrors({});
    setPending(true);
    try {
      await send({
        data: {
          fullName: result.data.fullName,
          phone: result.data.phone,
          email: result.data.email ?? "",
          dob: "",
          serviceSlug: service.slug,
          serviceName: service.name,
          message: result.data.notes ?? "",
          consent: true,
          source: "service-card",
        },
      });
      toast.success(`Thanks — we'll be in touch about ${service.name}.`);
      setValues(empty);
      setOpen(false);
    } catch {
      toast.error(
        "Sorry, we couldn't send that. Please try again or call us on 0191 205 2006.",
      );
    } finally {
      setPending(false);
    }
  };


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl text-primary">
            Register interest — {service.name}
          </DialogTitle>
          <DialogDescription>
            Leave your details and a member of the Kenton Pharmacy Clinic team
            will be in touch shortly.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="mt-2 space-y-4" noValidate>
          <div>
            <Label className="mb-1.5 block text-sm font-medium">
              Full name <span className="text-destructive">*</span>
            </Label>
            <Input
              value={values.fullName}
              onChange={(e) => set("fullName", e.target.value)}
              autoComplete="name"
              maxLength={100}
            />
            {errors.fullName && (
              <p className="mt-1 text-sm text-destructive">{errors.fullName}</p>
            )}
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label className="mb-1.5 block text-sm font-medium">
                Phone <span className="text-destructive">*</span>
              </Label>
              <Input
                type="tel"
                value={values.phone}
                onChange={(e) => set("phone", e.target.value)}
                autoComplete="tel"
                maxLength={20}
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-destructive">{errors.phone}</p>
              )}
            </div>
            <div>
              <Label className="mb-1.5 block text-sm font-medium">
                Email (optional)
              </Label>
              <Input
                type="email"
                value={values.email}
                onChange={(e) => set("email", e.target.value)}
                autoComplete="email"
                maxLength={255}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-destructive">{errors.email}</p>
              )}
            </div>
          </div>
          <div>
            <Label className="mb-1.5 block text-sm font-medium">
              Anything else? (optional)
            </Label>
            <Textarea
              value={values.notes}
              onChange={(e) => set("notes", e.target.value)}
              rows={3}
              maxLength={1000}
              placeholder="Medication, preferred contact times, etc."
            />
          </div>
          <div className="flex items-start gap-3">
            <Checkbox
              id={`consent-${service.slug}`}
              checked={values.consent}
              onCheckedChange={(v) => set("consent", v === true)}
            />
            <div>
              <Label
                htmlFor={`consent-${service.slug}`}
                className="text-sm font-normal"
              >
                I agree to be contacted about this enquiry by Kenton Pharmacy
                Clinic. Your details are stored securely and used only to
                respond to you — see our{" "}
                <Link
                  to="/privacy"
                  className="text-primary underline underline-offset-2"
                >
                  privacy notice
                </Link>
                .
              </Label>
              {errors.consent && (
                <p className="mt-1 text-sm text-destructive">
                  {errors.consent}
                </p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className="w-full sm:w-auto"
              disabled={pending}
            >
              {pending ? "Sending…" : "Submit"}
            </Button>
          </DialogFooter>

        </form>
      </DialogContent>
    </Dialog>
  );
}
