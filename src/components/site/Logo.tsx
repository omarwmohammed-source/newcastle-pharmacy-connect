import logoAsset from "@/assets/kenton-pharmacy-logo.jpg.asset.json";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <img
      src={logoAsset.url}
      alt="Kenton Pharmacy Clinic"
      className={
        compact
          ? "h-10 w-auto rounded-md"
          : "h-14 w-auto rounded-md sm:h-16"
      }
    />
  );
}
