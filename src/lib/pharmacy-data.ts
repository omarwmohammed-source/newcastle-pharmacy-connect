export type Service = {
  slug: string;
  name: string;
  description: string;
  details?: string[];
  kind: "nhs" | "private";
};

export const NHS_SERVICES: Service[] = [
  {
    slug: "pharmacy-first",
    name: "Pharmacy First",
    description:
      "Get treatment for seven common conditions without seeing your GP.",
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
  },
  {
    slug: "prescriptions",
    name: "Prescriptions & EPS",
    description:
      "Nominate us for the NHS Electronic Prescription Service and collect your medicine here.",
    kind: "nhs",
  },
  {
    slug: "blood-pressure",
    name: "Blood Pressure Check",
    description:
      "Free NHS blood pressure checks for eligible adults, no appointment needed.",
    kind: "nhs",
  },
  {
    slug: "contraception",
    name: "Contraception",
    description:
      "Ongoing supply and initiation of oral contraception on the NHS.",
    kind: "nhs",
  },
  {
    slug: "stop-smoking",
    name: "Stop Smoking Service",
    description:
      "Friendly support and NHS treatment to help you quit for good.",
    kind: "nhs",
  },
  {
    slug: "flu-vaccination",
    name: "Flu Vaccination",
    description: "Free NHS seasonal flu jabs for eligible patients.",
    kind: "nhs",
  },
  {
    slug: "new-medicine-service",
    name: "New Medicine Service",
    description:
      "Extra support when you start a new medicine for a long-term condition.",
    kind: "nhs",
  },
  {
    slug: "discharge-medicines",
    name: "Discharge Medicines",
    description:
      "Help reviewing and continuing medicines started after a hospital stay.",
    kind: "nhs",
  },
  {
    slug: "disposal-of-medicines",
    name: "Disposal of Medicines",
    description:
      "Drop off unused or expired medicines and we'll dispose of them safely.",
    kind: "nhs",
  },
  {
    slug: "emergency-dispensing",
    name: "Emergency Dispensing",
    description:
      "Urgent supply of your regular prescription medicine when you've run out.",
    kind: "nhs",
  },
];

export const PRIVATE_SERVICES: Service[] = [
  {
    slug: "weight-loss-clinic",
    name: "Weight Loss Clinic",
    description:
      "Private consultations and treatment options to support healthy, sustainable weight loss.",
    kind: "private",
  },
  {
    slug: "insomnia-clinic",
    name: "Insomnia Clinic",
    description:
      "Private assessment and treatment for short-term insomnia to help you sleep better.",
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
  mapEmbed:
    "https://www.google.com/maps?q=41+Halewood+Avenue+Newcastle+NE3+3RX&output=embed",
  hours: [
    { day: "Monday – Friday", time: "8:30 – 18:00" },
    { day: "Saturday", time: "9:00 – 18:00" },
    { day: "Sunday", time: "Closed" },
  ],
};
