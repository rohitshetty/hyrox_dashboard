import { plan } from "@/lib/plan";
import type { DayName } from "@/lib/types";
import { getDayDate } from "@/lib/dates";
import DayColumn from "@/components/DayColumn";
import WeekNav from "@/components/WeekNav";

const DAYS: DayName[] = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

export function generateStaticParams() {
  return Array.from({ length: plan.meta.totalWeeks }, (_, i) => ({ n: String(i + 1) }));
}

export default async function WeekPage({
  params,
}: {
  params: Promise<{ n: string }>;
}) {
  const { n } = await params;
  const weekNum = parseInt(n, 10);
  const week = plan.weeks[weekNum - 1];
  if (!week) return <p>Week not found</p>;

  return (
    <div className="space-y-6">
      <div className="animate-in">
        <WeekNav weekNum={weekNum} phase={week.phase} />
      </div>

      <div className="animate-in animate-in-1 flex items-center gap-2">
        <span
          className="tag"
          style={{
            fontFamily: "var(--font-mono)",
            color: "var(--color-muted)",
            background: "var(--color-surface-2)",
          }}
        >
          {week.dates}
        </span>
        <span
          className="tag"
          style={{
            fontFamily: "var(--font-mono)",
            color: "var(--color-ice)",
            background: "rgba(0,212,255,0.08)",
          }}
        >
          {week.runVolume}
        </span>
      </div>

      <p className="animate-in animate-in-2 text-sm leading-relaxed" style={{ color: "var(--color-muted)" }}>
        {typeof week.philosophy === "string"
          ? week.philosophy.trim().split("\n")[0]
          : ""}
      </p>

      <div className="space-y-6">
        {DAYS.map((dayName) => (
          <DayColumn
            key={dayName}
            dayName={dayName}
            day={week.days[dayName]}
            dateLabel={getDayDate(weekNum - 1, dayName)}
          />
        ))}
      </div>
    </div>
  );
}
