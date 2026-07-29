import logoAsset from "@/assets/kenton-pharmacy-logo.jpg.asset.json";

export function Logo({
  compact = false,
  showWordmark = true,
  onDark = false,
}: {
  compact?: boolean;
  showWordmark?: boolean;
  onDark?: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      <img
        src={logoAsset.url}
        alt="Kenton Pharmacy Clinic"
        className={
          (compact ? "h-10 sm:h-11" : "h-12 sm:h-14") +
          " w-auto object-contain select-none"
        }
      />
      {showWordmark && (
        <div className="flex flex-col">
          <span
            className={
              (onDark ? "text-primary-foreground" : "text-primary") +
              " font-serif text-xl font-semibold tracking-wide sm:text-2xl"
            }
          >
            Kenton Pharmacy Clinic
          </span>
          <span
            className={
              (onDark ? "text-primary-foreground/80" : "text-muted-foreground") +
              " mt-0.5 inline-flex items-center gap-1.5 text-xs font-medium"
            }
          >
            <span className="inline-flex items-center rounded bg-[#005EB8] px-1.5 py-0.5 text-white">
              <span className="font-bold tracking-tight">NHS</span>
            </span>
            Registered pharmacy
          </span>
        </div>
      )}
    </div>
  );
}
