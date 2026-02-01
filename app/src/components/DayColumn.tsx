import type { Day, DayName } from "@/lib/types";
import SlotCard from "./SlotCard";

const DAY_LABELS: Record<DayName, string> = {
  monday: "MON",
  tuesday: "TUE",
  wednesday: "WED",
  thursday: "THU",
  friday: "FRI",
  saturday: "SAT",
  sunday: "SUN",
};

export default function DayColumn({
  dayName,
  day,
  dateLabel,
  isToday,
}: {
  dayName: DayName;
  day: Day;
  dateLabel?: string;
  isToday?: boolean;
}) {
  return (
    <section className="relative">
      {/* Day header */}
      <div className="sticky top-0 z-10 flex items-center gap-3 py-3 backdrop-blur-md" style={{ background: "rgba(10,10,12,0.85)" }}>
        <span
          className="text-xs font-bold tracking-[0.2em]"
          style={{
            fontFamily: "var(--font-mono)",
            color: isToday ? "var(--color-phosphor)" : "var(--color-muted)",
          }}
        >
          {DAY_LABELS[dayName]}
        </span>
        {dateLabel && (
          <span
            className="text-[11px]"
            style={{ fontFamily: "var(--font-mono)", color: "var(--color-dim)" }}
          >
            {dateLabel}
          </span>
        )}
        {isToday && (
          <span
            className="tag"
            style={{
              fontFamily: "var(--font-mono)",
              color: "var(--color-background)",
              background: "var(--color-phosphor)",
              fontWeight: 700,
            }}
          >
            NOW
          </span>
        )}
        <span className="flex-1 border-b" style={{ borderColor: "var(--color-border)" }} />
      </div>

      {day.rest ? (
        <div
          className="rounded border p-5 text-center"
          style={{
            borderColor: "var(--color-border)",
            background: "var(--color-surface)",
          }}
        >
          <p
            className="text-xs tracking-[0.3em] uppercase"
            style={{ fontFamily: "var(--font-mono)", color: "var(--color-dim)" }}
          >
            REST DAY
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {day.slots?.map((slot, i) => (
            <SlotCard key={i} slot={slot} delay={i} />
          ))}
        </div>
      )}
    </section>
  );
}
