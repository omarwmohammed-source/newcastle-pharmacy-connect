export type Service = {
  slug: string;
  name: string;
  description: string;
  link?: { href: string; text: string };
  details?: string[];
  kind: "nhs" | "private";
  featured?: boolean;
  /** Optional per-service Google Form URL. Overrides the shared form below. */
  formUrl?: string;
};

/**
 * Shared Google Form used for "Register interest".
 * 1. Create your Google Form (name, phone, email, notes...).
 * 2. Paste its share link below (the .../viewform URL).
 * 3. Optional: add a short-answer "Service" question, click the 3-dot menu >
 *    "Get pre-filled link", and paste the entry.XXXXXXX id below so the chosen
 *    service is filled in automatically.
 */
export const GOOGLE_FORM = {
  url: "",
  serviceEntryId: "", // e.g. "entry.1234567890"
};

export function serviceFormUrl(service: {
  name: string;
  slug: string;
  formUrl?: string;
}): string | null {
  const base = service.formUrl ?? GOOGLE_FORM.url;
  if (!base) return null;
  if (!GOOGLE_FORM.serviceEntryId || service.formUrl) return base;
  const sep = base.includes("?") ? "&" : "?";
  return `${base}${sep}usp=pp_url&${GOOGLE_FORM.serviceEntryId}=${encodeURIComponent(
    service.name,
  )}`;
}

export const NHS_SERVICES: Service[] = [
  {
    slug: "pharmacy-first",
    name: "Pharmacy First",
    description:
      "Get NHS advice and treatment for seven common conditions from our pharmacist — no GP appointment needed.",
    details: [
      "Earache",
      "Sinusitis",
      "Sore throat",
      "UTIs in women",
      "Shingles",
      "Impetigo",
      "Infected insect bites",
    ],
    kind: "nhs",
    featured: true,
  },
  {
    slug: "prescriptions",
    name: "Prescriptions & EPS",
    description:
      "Nominate Kenton Pharmacy Clinic for the NHS Electronic Prescription Service and pick up your medicines here.",
    link: {
      href: "https://www.nhs.uk/nhs-app/help/prescriptions/nominating-a-pharmacy/",
      text: "Alternatively, you can also nominate us using the NHS app.",
    },
    kind: "nhs",
    featured: true,
  },
  {
    slug: "free-delivery",
    name: "Free Prescription Delivery",
    description:
      "Free NHS prescription delivery to your door across all areas of Newcastle upon Tyne.",
    kind: "nhs",
    featured: true,
  },
  {
    slug: "blood-pressure",
    name: "Blood Pressure Check",
    description:
      "Free NHS blood pressure checks for eligible adults — no appointment needed.",
    kind: "nhs",
  },
  {
    slug: "contraception",
    name: "Contraception (ongoing supply)",
    description:
      "NHS supply and initiation of the oral contraceptive pill directly from our pharmacist.",
    kind: "nhs",
  },
  {
    slug: "emergency-contraception",
    name: "Emergency Contraception",
    description:
      "Confidential advice and supply of the morning-after pill from our pharmacist.",
    kind: "nhs",
  },
  {
    slug: "stop-smoking",
    name: "Stop Smoking Support",
    description:
      "Friendly, expert support and NHS treatment to help you quit smoking for good.",
    kind: "nhs",
  },
  {
    slug: "flu-vaccination",
    name: "Flu Vaccination (NHS)",
    description:
      "Free NHS seasonal flu jabs for eligible patients, delivered by our trained team.",
    kind: "nhs",
  },
  {
    slug: "covid-vaccination",
    name: "COVID-19 Vaccination",
    description:
      "Seasonal NHS COVID-19 vaccinations for eligible patients when the programme is running.",
    kind: "nhs",
  },
  {
    slug: "new-medicine-service",
    name: "New Medicine Service",
    description:
      "Extra support and follow-up when you start a new medicine for a long-term condition.",
    kind: "nhs",
  },
  {
    slug: "discharge-medicines",
    name: "Discharge Medicines Service",
    description:
      "Help reviewing and continuing the medicines you were started on during a hospital stay.",
    kind: "nhs",
  },
  {
    slug: "emergency-dispensing",
    name: "Emergency Dispensing",
    description:
      "Urgent supply of your regular prescription medicine when you've run out and can't reach your GP.",
    kind: "nhs",
  },
  {
    slug: "disposal-of-medicines",
    name: "Disposal of Unwanted Medicines",
    description:
      "Drop off unused or expired medicines at the pharmacy and we'll dispose of them safely.",
    kind: "nhs",
  },
  {
    slug: "minor-ailments",
    name: "Minor Ailments Advice",
    description:
      "Free pharmacist advice on everyday health concerns like coughs, colds, hay fever and skin conditions.",
    kind: "nhs",
  },
  {
    slug: "healthy-living",
    name: "Healthy Living Advice",
    description:
      "Weight, diet, alcohol and lifestyle advice from a Healthy Living Pharmacy team.",
    kind: "nhs",
  },
  {
    slug: "travel-health",
    name: "Travel Health Advice",
    description:
      "Pre-travel advice on staying well abroad, including guidance on medicines and vaccinations.",
    kind: "nhs",
  },
  {
    slug: "diabetes-support",
    name: "Diabetes Support",
    description:
      "Advice on diabetes medicines, blood glucose monitoring and living well with diabetes.",
    kind: "nhs",
  },
  {
    slug: "inhaler-technique",
    name: "Asthma & Inhaler Technique",
    description:
      "Personal check of your inhaler technique to help you get the most from your asthma or COPD medicines.",
    kind: "nhs",
  },
];

export const PRIVATE_SERVICES: Service[] = [
  {
    slug: "weight-loss-clinic",
    name: "Weight Loss Treatment",
    description:
      "Private consultations and treatment options to support healthy, sustainable weight loss.",
    kind: "private",
  },
  {
    slug: "insomnia-clinic",
    name: "Insomnia Clinic",
    description:
      "Private assessment and treatment for insomnia to help you sleep better.",
    kind: "private",
  },
];

export const ALL_SERVICES: Service[] = [...NHS_SERVICES, ...PRIVATE_SERVICES];

export const PHARMACY = {
  name: "Kenton Pharmacy Clinic",
  phone: "0191 205 2006",
  phoneHref: "tel:+441912052006",
  addressLine1: "41 Halewood Avenue",
  addressLine2: "Newcastle upon Tyne",
  postcode: "NE3 3RX",
  deliveryArea: "All areas of Newcastle upon Tyne",
  freeDelivery: true,
  mapEmbed:
    "https://www.google.com/maps?q=41+Halewood+Avenue+Newcastle+NE3+3RX&output=embed",
  hours: [
    { day: "Monday – Friday", time: "8:30 – 18:00" },
    { day: "Saturday", time: "9:00 – 18:00" },
    { day: "Sunday", time: "Closed" },
  ],
};
