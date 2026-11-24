import logoAsset from "@/assets/kenton-pharmacy-logo.jpg.asset.json";
import { UMBRELLA_BRAND } from "@/lib/branches";

export function Logo({
  title = UMBRELLA_BRAND,
  compact = false,
  showWordmark = true,
  onDark = false,
}: {
  title?: string;
  compact?: boolean;
  showWordmark?: boolean;
  onDark?: boolean;
}) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <img
        src={logoAsset.url}
        alt={title}
        className={
          (compact ? "h-10 sm:h-11" : "h-12 sm:h-14") +
          " w-auto shrink-0 object-contain select-none"
        }
      />
      {showWordmark && (
        <div className="flex min-w-0 flex-col">
          <span
            className={
              (onDark ? "text-primary-foreground" : "text-primary") +
              " font-serif text-xl font-semibold sm:text-2xl"
            }
          >
            {title}
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
