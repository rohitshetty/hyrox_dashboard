"use client";

import { plan } from "@/lib/plan";
import { getTodayContext, getFormattedDate } from "@/lib/dates";
import SlotCard from "@/components/SlotCard";
import Link from "next/link";

const DAY_LABELS: Record<string, string> = {
  monday: "MONDAY",
  tuesday: "TUESDAY",
  wednesday: "WEDNESDAY",
  thursday: "THURSDAY",
  friday: "FRIDAY",
  saturday: "SATURDAY",
  sunday: "SUNDAY",
};

export default function TodayPage() {
  const { week, dayName, day, daysUntilRace } = getTodayContext(plan);

  return (
    <div className="space-y-8">
      {/* Header block */}
      <div className="animate-in">
        {/* Top line: date */}
        <p
          className="text-[10px] tracking-[0.25em] uppercase"
          style={{ fontFamily: "var(--font-mono)", color: "var(--color-dim)" }}
        >
          {getFormattedDate()}
        </p>

        {/* Day name — huge */}
        <h1
          className="mt-1 text-4xl font-extrabold tracking-tight leading-none"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {DAY_LABELS[dayName]}
        </h1>

        {/* Meta row */}
        <div className="mt-4 flex items-center gap-2">
          <Link
            href={`/week/${week.week}`}
            className="tag"
            style={{
              fontFamily: "var(--font-mono)",
              color: "var(--color-slate-text)",
              background: "var(--color-surface-2)",
              borderRadius: 2,
              textDecoration: "none",
            }}
          >
            W{week.week} / {week.phase.toUpperCase()}
          </Link>
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
      </div>

      {/* Race countdown — prominent */}
      {daysUntilRace > 0 && (
        <div className="animate-in animate-in-1">
          <div
            className="rounded border p-4"
            style={{
              borderColor: "rgba(57,255,20,0.15)",
              background: "rgba(57,255,20,0.03)",
            }}
          >
            <div className="flex items-baseline justify-between">
              <span
                className="text-[10px] tracking-[0.2em] uppercase"
                style={{ fontFamily: "var(--font-mono)", color: "var(--color-phosphor-dim)" }}
              >
                RACE DAY
              </span>
              <span
                className="countdown-glow text-2xl font-bold tabular-nums"
                style={{ fontFamily: "var(--font-mono)", color: "var(--color-phosphor)" }}
              >
                {daysUntilRace}
                <span className="ml-1 text-xs font-normal tracking-wider" style={{ color: "var(--color-phosphor-dim)" }}>
                  DAYS
                </span>
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Today's sessions */}
      {day.rest ? (
        <div className="animate-in animate-in-2">
          <div
            className="rounded border p-10 text-center"
            style={{
              borderColor: "var(--color-border)",
              background: "var(--color-surface)",
            }}
          >
            <p
              className="text-xs tracking-[0.4em] uppercase"
              style={{ fontFamily: "var(--font-mono)", color: "var(--color-dim)" }}
            >
              REST PROTOCOL
            </p>
            <p className="mt-3 text-sm" style={{ color: "var(--color-muted)" }}>
              Recovery is training. Stay hydrated. Move gently.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-2.5">
          {day.slots?.map((slot, i) => (
            <SlotCard key={i} slot={slot} delay={i + 2} />
          ))}
        </div>
      )}

      {/* Week briefing */}
      <div className="animate-in animate-in-6">
        <div
          className="rounded border p-4"
          style={{
            borderColor: "var(--color-border)",
            background: "var(--color-surface)",
          }}
        >
          <p className="section-label">BRIEFING</p>
          <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--color-slate-text)" }}>
            {typeof week.philosophy === "string"
              ? week.philosophy.trim().split("\n")[0]
              : ""}
          </p>
        </div>
      </div>
    </div>
  );
}
