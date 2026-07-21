import { Clock } from "lucide-react";
import { PHARMACY } from "@/lib/pharmacy-data";

export function OpeningHours() {
  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
      <div className="mb-4 flex items-center gap-2 text-primary">
        <Clock className="h-5 w-5" />
        <h2 className="text-lg font-semibold">Opening hours</h2>
      </div>
      <dl className="divide-y divide-border">
        {PHARMACY.hours.map((h) => (
          <div key={h.day} className="flex items-center justify-between py-2 text-sm">
            <dt className="text-muted-foreground">{h.day}</dt>
            <dd className="font-medium text-foreground">{h.time}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
