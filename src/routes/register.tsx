import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useId } from "react";
import { z } from "zod";
import { CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useServerFn } from "@tanstack/react-start";
import { ALL_SERVICES } from "@/lib/pharmacy-data";
import { submitEnquiry } from "@/lib/enquiries.functions";
import logoAsset from "@/assets/kenton-pharmacy-logo.jpg.asset.json";
import { BASE_URL } from "@/lib/site-config";

const OG_IMAGE = `${BASE_URL}${logoAsset.url}`;


const searchSchema = z.object({
  service: z.string().optional(),
});

export const Route = createFileRoute("/register")({
  validateSearch: (s) => searchSchema.parse(s),
  head: () => ({
    meta: [
      { title: "Register your interest — Kenton Pharmacy Clinic" },
      {
        name: "description",
        content:
          "Leave your details and the service you're interested in. The Kenton Pharmacy Clinic team will get back to you.",
      },
      {
        property: "og:title",
        content: "Register your interest — Kenton Pharmacy Clinic",
      },
      {
        property: "og:description",
        content:
          "Register your details for prescriptions, NHS or private services at Kenton Pharmacy Clinic.",
      },
      { property: "og:url", content: `${BASE_URL}/register` },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:type", content: "website" },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: `${BASE_URL}/register` }],
  }),

  component: RegisterPage,
});

const formSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, "Please enter your full name")
    .max(100, "Name is too long"),
  phone: z
    .string()
    .trim()
    .min(7, "Please enter a valid phone number")
    .max(20, "Phone number is too long")
    .regex(/^[0-9 +()-]+$/, "Only digits, spaces and + ( ) - allowed"),
  email: z
    .string()
    .trim()
    .max(255)
    .email("Enter a valid email")
    .optional()
    .or(z.literal("")),
  dob: z.string().trim().max(20).optional().or(z.literal("")),
  service: z.string().min(1, "Please choose a service"),
  message: z.string().trim().max(1000).optional().or(z.literal("")),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Please tick to agree" }),
  }),
});

type FormValues = {
  fullName: string;
  phone: string;
  email: string;
  dob: string;
  service: string;
  message: string;
  consent: boolean;
};

function RegisterPage() {
  const { service } = Route.useSearch();
  const [values, setValues] = useState<FormValues>({
    fullName: "",
    phone: "",
    email: "",
    dob: "",
    service: service ?? "",
    message: "",
    consent: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [pending, setPending] = useState(false);
  const send = useServerFn(submitEnquiry);

  const set = <K extends keyof FormValues>(k: K, v: FormValues[K]) =>
    setValues((prev) => ({ ...prev, [k]: v }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = formSchema.safeParse(values);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0];
        if (typeof key === "string" && !fieldErrors[key]) {
          fieldErrors[key] = issue.message;
        }
      }
      setErrors(fieldErrors);
      toast.error("Please check the form and try again");
      return;
    }
    setErrors({});
    setPending(true);
    try {
      const chosen = ALL_SERVICES.find((s) => s.slug === result.data.service);
      await send({
        data: {
          fullName: result.data.fullName,
          phone: result.data.phone,
          email: result.data.email ?? "",
          dob: result.data.dob ?? "",
          serviceSlug: result.data.service,
          serviceName: chosen?.name ?? result.data.service,
          message: result.data.message ?? "",
          consent: true,
          source: "register-page",
        },
      });
      setSubmitted(true);
      toast.success("Thanks — we'll be in touch shortly");
    } catch {
      toast.error(
        "Sorry, we couldn't send that. Please try again or call us on 0191 205 2006.",
      );
    } finally {
      setPending(false);
    }
  };


  if (submitted) {
    return (
      <section className="mx-auto max-w-2xl px-6 py-24 text-center">
        <CheckCircle2 className="mx-auto h-14 w-14 text-accent" />
        <h1 className="mt-4 text-3xl font-bold text-primary">Thanks!</h1>
        <p className="mt-3 text-muted-foreground">
          We've received your details and a member of the Kenton Pharmacy
          Clinic team will be in touch shortly.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Button asChild variant="outline">
            <Link to="/">Back to home</Link>
          </Button>
          <Button asChild>
            <Link to="/services">Explore services</Link>
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-2xl px-6 py-16">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
          Register your interest
        </h1>
        <p className="mt-3 text-muted-foreground">
          Leave your details and the service you're interested in. We'll get
          back to you as soon as we can.
        </p>
      </header>

      <form onSubmit={onSubmit} className="mt-10 space-y-5" noValidate>
        <Field label="Full name" error={errors.fullName} required>
          {(id) => (
            <Input
              id={id}
              value={values.fullName}
              onChange={(e) => set("fullName", e.target.value)}
              autoComplete="name"
              maxLength={100}
            />
          )}
        </Field>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Phone" error={errors.phone} required>
            {(id) => (
              <Input
                id={id}
                type="tel"
                value={values.phone}
                onChange={(e) => set("phone", e.target.value)}
                autoComplete="tel"
                maxLength={20}
              />
            )}
          </Field>
          <Field label="Email (optional)" error={errors.email}>
            {(id) => (
              <Input
                id={id}
                type="email"
                value={values.email}
                onChange={(e) => set("email", e.target.value)}
                autoComplete="email"
                maxLength={255}
              />
            )}
          </Field>
        </div>

        <Field
          label="Date of birth (optional)"
          error={errors.dob}
          hint="Helps us match your NHS records"
        >
          {(id) => (
            <Input
              id={id}
              type="date"
              value={values.dob}
              onChange={(e) => set("dob", e.target.value)}
            />
          )}
        </Field>

        <Field label="Service" error={errors.service} required>
          {(id) => (
            <Select
              value={values.service}
              onValueChange={(v) => set("service", v)}
            >
              <SelectTrigger id={id}>
                <SelectValue placeholder="Choose a service" />
              </SelectTrigger>
              <SelectContent>
                {ALL_SERVICES.map((s) => (
                  <SelectItem key={s.slug} value={s.slug}>
                    {s.name}
                    {s.kind === "private" ? " (Private)" : ""}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </Field>

        <Field label="Anything else? (optional)" error={errors.message}>
          {(id) => (
            <Textarea
              id={id}
              value={values.message}
              onChange={(e) => set("message", e.target.value)}
              maxLength={1000}
              rows={4}
              placeholder="Medication name, preferred times, etc."
            />
          )}
        </Field>

        <div className="flex items-start gap-3">
          <Checkbox
            id="consent"
            checked={values.consent}
            onCheckedChange={(v) => set("consent", v === true)}
          />
          <div>
            <Label htmlFor="consent" className="text-sm font-normal">
              I agree to be contacted about this enquiry by Kenton Pharmacy
              Clinic. Your details are stored securely and used only to respond
              to you — see our{" "}
              <Link
                to="/privacy"
                className="text-primary underline underline-offset-2"
              >
                privacy notice
              </Link>
              .
            </Label>
            {errors.consent && (
              <p className="mt-1 text-sm text-destructive">{errors.consent}</p>
            )}
          </div>
        </div>

        <Button
          type="submit"
          size="lg"
          className="w-full sm:w-auto"
          disabled={pending}
        >
          {pending ? "Sending…" : "Submit"}
        </Button>

      </form>
    </section>
  );
}

function Field({
  label,
  error,
  hint,
  required,
  children,
}: {
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode | ((id: string) => React.ReactNode);
}) {
  const id = useId();
  return (
    <div>
      <Label
        htmlFor={id}
        className="mb-1.5 flex items-center gap-1 text-sm font-medium"
      >
        {label}
        {required && <span className="text-destructive">*</span>}
      </Label>
      {typeof children === "function" ? children(id) : children}
      {hint && !error && (
        <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
      )}
      {error && <p className="mt-1 text-sm text-destructive">{error}</p>}
    </div>
  );
}
