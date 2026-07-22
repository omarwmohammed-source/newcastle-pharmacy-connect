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
          compact
            ? "h-10 w-10 rounded-full object-cover ring-1 ring-white/15"
            : "h-14 w-14 rounded-full object-cover ring-1 ring-white/15 sm:h-16 sm:w-16"
        }
      />
      {showWordmark && (
        <div className="flex flex-col leading-tight">
          <span
            className={
              (onDark ? "text-primary-foreground" : "text-foreground") +
              " text-base font-semibold tracking-tight sm:text-lg"
            }
          >
            Kenton Pharmacy Clinic
          </span>
          <span
            className={
              (onDark ? "text-primary-foreground/70" : "text-muted-foreground") +
              " text-[11px] uppercase tracking-[0.15em] sm:text-xs"
            }
          >
            Newcastle · NE3
          </span>
        </div>
      )}
    </div>
  );
}
