import { z } from "zod";

export const enquiryInputSchema = z.object({
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
  dob: z.string().trim().max(20).optional().or(z.literal("")),
  serviceSlug: z.string().trim().max(100).optional().or(z.literal("")),
  serviceName: z.string().trim().min(1).max(150),
  message: z.string().trim().max(1000).optional().or(z.literal("")),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Please tick to agree" }),
  }),
  source: z.string().trim().max(120).optional().or(z.literal("")),
});

export type EnquiryInput = z.infer<typeof enquiryInputSchema>;

export type EnquiryRow = {
  id: string;
  full_name: string;
  phone: string;
  email: string | null;
  dob: string | null;
  service_slug: string | null;
  service_name: string;
  message: string | null;
  consent: boolean;
  source: string | null;
  status: string;
  staff_notes: string | null;
  created_at: string;
};

export const ENQUIRY_STATUSES = ["new", "in_progress", "done"] as const;
