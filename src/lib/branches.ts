export const UMBRELLA_BRAND = "Newcastle Pharmacy Clinic";

export const BRANCH_SLUGS = ["kenton", "chillingham-road"] as const;
export type BranchSlug = (typeof BRANCH_SLUGS)[number];

export interface OpeningHour {
  day: string;
  time: string;
}

export interface BranchConfig {
  slug: BranchSlug;
  shortLabel: string;
  name: string;
  phone: string;
  phoneHref: string;
  addressLine1: string;
  addressLine2: string;
  postcode: string;
  deliveryArea: string;
  freeDelivery: boolean;
  mapEmbed: string;
  geo: {
    latitude: string;
    longitude: string;
  };
  hours: OpeningHour[];
  hoursSummary: string;
  openingHoursSpecification: Array<{
    "@type": "OpeningHoursSpecification";
    dayOfWeek: string | string[];
    opens: string;
    closes: string;
  }>;
}

export const BRANCHES: Record<BranchSlug, BranchConfig> = {
  kenton: {
    slug: "kenton",
    shortLabel: "Kenton",
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
    geo: {
      latitude: "54.9975",
      longitude: "-1.6505",
    },
    hours: [
      { day: "Monday – Friday", time: "8:30 – 18:00" },
      { day: "Saturday", time: "9:00 – 18:00" },
      { day: "Sunday", time: "Closed" },
    ],
    hoursSummary: "Monday to Friday 8:30am–6pm and Saturday 9am–6pm",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:30",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "09:00",
        closes: "18:00",
      },
    ],
  },
  "chillingham-road": {
    slug: "chillingham-road",
    shortLabel: "Chillingham Road",
    name: "Chillingham Pharmacy Clinic",
    phone: "0191 380 2405",
    phoneHref: "tel:+441913802405",
    addressLine1: "225 Chillingham Road",
    addressLine2: "Newcastle upon Tyne",
    postcode: "NE6 5LJ",
    deliveryArea: "All areas of Newcastle upon Tyne",
    freeDelivery: true,
    mapEmbed:
      "https://www.google.com/maps?q=225+Chillingham+Road+Newcastle+NE6+5LJ&output=embed",
    geo: {
      latitude: "54.9854",
      longitude: "-1.5776",
    },
    hours: [
      { day: "Monday – Friday", time: "8:30 – 18:00" },
      { day: "Saturday", time: "9:00 – 18:00" },
      { day: "Sunday", time: "13:00 – 19:00" },
    ],
    hoursSummary:
      "Monday to Friday 8:30am–6pm, Saturday 9am–6pm and Sunday 1pm–7pm",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:30",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "09:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Sunday",
        opens: "13:00",
        closes: "19:00",
      },
    ],
  },
};

export const BRANCH_LIST: BranchConfig[] = [
  BRANCHES.kenton,
  BRANCHES["chillingham-road"],
];

export function isBranchSlug(value: string | undefined): value is BranchSlug {
  return value === "kenton" || value === "chillingham-road";
}

export function getBranch(slug: string | undefined): BranchConfig {
  return isBranchSlug(slug) ? BRANCHES[slug] : BRANCHES.kenton;
}

export function otherBranch(slug: BranchSlug): BranchConfig {
  return slug === "kenton" ? BRANCHES["chillingham-road"] : BRANCHES.kenton;
}

export function formatBranchAddress(branch: BranchConfig): string {
  return `${branch.addressLine1}, ${branch.addressLine2}, ${branch.postcode}`;
}