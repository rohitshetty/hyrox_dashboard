"use client";

import { useState } from "react";
import { plan } from "@/lib/plan";
import type { StrengthDay } from "@/lib/types";

const DAYS = ["monday", "tuesday", "wednesday", "thursday", "saturday"] as const;

const DAY_SHORT: Record<string, string> = {
  monday: "MON",
  tuesday: "TUE",
  wednesday: "WED",
  thursday: "THU",
  saturday: "SAT",
};

export default function StrengthPage() {
  const [active, setActive] = useState<string>("monday");
  const day = plan.strength[active] as StrengthDay;
  const guardrails = plan.strength.recoveryGuardrails as unknown as string[];

  return (
    <div className="space-y-8">
      <div className="animate-in">
        <p className="section-label">PROTOCOL</p>
        <h1
          className="mt-2 text-3xl font-extrabold tracking-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          STRENGTH
        </h1>
      </div>

      {/* Day tabs */}
      <div className="animate-in animate-in-1 flex gap-1 overflow-x-auto">
        {DAYS.map((d) => (
          <button
            key={d}
            onClick={() => setActive(d)}
            className="shrink-0 rounded px-4 py-2.5 text-[11px] font-bold tracking-[0.15em] transition-all"
            style={{
              fontFamily: "var(--font-mono)",
              color: active === d ? "var(--color-background)" : "var(--color-muted)",
              background: active === d ? "var(--color-ember)" : "var(--color-surface)",
            }}
          >
            {DAY_SHORT[d]}
          </button>
        ))}
      </div>

      {/* Day detail */}
      {day && (
        <div className="animate-in animate-in-2 space-y-4">
          <div>
            <h2
              className="text-lg font-bold"
              style={{ fontFamily: "var(--font-display)", color: "var(--color-foreground)" }}
            >
              {day.name}
            </h2>
            {day.intent && (
              <p className="mt-1 text-sm italic" style={{ color: "var(--color-dim)" }}>
                {day.intent}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            {day.exercises.map((ex, i) => (
              <div
                key={i}
                className="rounded border px-4 py-3"
                style={{
                  borderColor: "var(--color-border)",
                  background: "var(--color-surface)",
                }}
              >
                <div className="flex items-baseline justify-between gap-3">
                  <span className="text-sm" style={{ color: "var(--color-foreground)" }}>
                    {ex.name}
                  </span>
                  <span
                    className="shrink-0 text-[11px] font-semibold"
                    style={{ fontFamily: "var(--font-mono)", color: "var(--color-ember)" }}
                  >
                    {ex.sets}
                  </span>
                </div>
                {ex.notes && (
                  <p className="mt-1 text-xs" style={{ color: "var(--color-dim)" }}>
                    {ex.notes}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Guardrails */}
      <div className="animate-in animate-in-3">
        <div
          className="rounded border p-4"
          style={{
            borderColor: "rgba(57,255,20,0.12)",
            background: "rgba(57,255,20,0.03)",
          }}
        >
          <p className="section-label" style={{ color: "var(--color-phosphor-dim)" }}>
            RECOVERY GUARDRAILS
          </p>
          <ul className="mt-2 space-y-1.5">
            {guardrails?.map((rule, i) => (
              <li key={i} className="flex gap-2 text-sm" style={{ color: "var(--color-slate-text)" }}>
                <span style={{ color: "var(--color-phosphor-dim)" }}>&bull;</span>
                {rule}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
