"use client";

import { useState } from "react";
import type { Slot } from "@/lib/types";
import { slotStyles } from "@/lib/colors";
import { getStrengthDay } from "@/lib/plan";

export default function SlotCard({ slot, delay = 0 }: { slot: Slot; delay?: number }) {
  const [open, setOpen] = useState(false);
  const style = slotStyles[slot.type] || slotStyles.rest;
  const hasDetail =
    slot.details || slot.workout || slot.ref || slot.notes || slot.warmup;

  return (
    <button
      onClick={() => hasDetail && setOpen(!open)}
      className={`animate-in w-full text-left transition-all active:scale-[0.98]`}
      style={{ animationDelay: `${delay * 0.06}s` }}
    >
      <div
        className={`rounded border ${style.borderColor} ${style.bg} p-4`}
        style={{
          borderLeftWidth: 3,
          borderLeftColor: style.accent,
        }}
      >
        {/* Top row: type tag + time */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span
              className="tag"
              style={{
                fontFamily: "var(--font-mono)",
                color: style.accent,
                background: `${style.accent}10`,
              }}
            >
              {style.label}
            </span>
            {slot.distance && (
              <span
                className="text-[11px] font-medium"
                style={{ fontFamily: "var(--font-mono)", color: "var(--color-muted)" }}
              >
                {slot.distance}
              </span>
            )}
            {slot.duration && (
              <span
                className="text-[11px] font-medium"
                style={{ fontFamily: "var(--font-mono)", color: "var(--color-muted)" }}
              >
                {slot.duration}
              </span>
            )}
          </div>
          {slot.time && (
            <span
              className="text-[11px] tabular-nums"
              style={{ fontFamily: "var(--font-mono)", color: "var(--color-dim)" }}
            >
              {slot.time}
            </span>
          )}
        </div>

        {/* Session name */}
        <p className="mt-2 text-[15px] font-medium leading-snug" style={{ color: "var(--color-foreground)" }}>
          {slot.session}
        </p>

        {/* Expand hint */}
        {hasDetail && (
          <div className="mt-2 flex items-center gap-1.5">
            <span
              className="inline-block h-px flex-1"
              style={{ background: "var(--color-border)" }}
            />
            <span
              className="text-[10px] tracking-widest uppercase"
              style={{ fontFamily: "var(--font-mono)", color: "var(--color-dim)" }}
            >
              {open ? "COLLAPSE" : "EXPAND"}
            </span>
            <span
              className="inline-block h-px flex-1"
              style={{ background: "var(--color-border)" }}
            />
          </div>
        )}

        {/* Expanded content */}
        {open && (
          <div className="mt-3 space-y-3">
            {slot.details && (
              <p className="text-sm leading-relaxed" style={{ color: "var(--color-slate-text)" }}>
                {slot.details}
              </p>
            )}

            {slot.warmup && (
              <div>
                <span className="section-label">Warmup</span>
                <p className="mt-1 text-sm" style={{ color: "var(--color-slate-text)" }}>
                  {slot.warmup}
                </p>
              </div>
            )}

            {slot.workout?.map((block, i) => (
              <div key={i} className="rounded p-3" style={{ background: "var(--color-surface)" }}>
                <span className="section-label">{block.block}</span>
                {block.notes && (
                  <p className="mt-1 text-xs italic" style={{ color: "var(--color-dim)" }}>
                    {block.notes}
                  </p>
                )}
                {block.exercises.map((ex, j) => (
                  <div key={j} className="mt-3">
                    <p className="text-sm font-medium" style={{ color: "var(--color-foreground)" }}>
                      {ex.name}
                    </p>
                    {ex.prescription && (
                      <pre
                        className="mt-1.5 whitespace-pre-line text-[13px] leading-relaxed"
                        style={{ fontFamily: "var(--font-mono)", color: "var(--color-slate-text)" }}
                      >
                        {ex.prescription.trim()}
                      </pre>
                    )}
                    {ex.rest && (
                      <p className="mt-1 text-xs" style={{ fontFamily: "var(--font-mono)", color: "var(--color-dim)" }}>
                        REST {ex.rest}
                      </p>
                    )}
                    {ex.notes && (
                      <p className="mt-1 text-xs italic" style={{ color: "var(--color-dim)" }}>
                        {ex.notes}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ))}

            {slot.cooldown && (
              <div>
                <span className="section-label">Cooldown</span>
                <p className="mt-1 text-sm" style={{ color: "var(--color-slate-text)" }}>
                  {slot.cooldown}
                </p>
              </div>
            )}

            {slot.ref && <StrengthRef refKey={slot.ref} />}

            {slot.notes && !slot.workout && (
              <p className="text-xs italic" style={{ color: "var(--color-dim)" }}>
                {slot.notes}
              </p>
            )}
          </div>
        )}
      </div>
    </button>
  );
}

function StrengthRef({ refKey }: { refKey: string }) {
  const day = getStrengthDay(refKey);
  if (!day) return null;

  return (
    <div className="rounded p-3" style={{ background: "var(--color-surface)" }}>
      <span className="section-label">{day.name}</span>
      {day.intent && (
        <p className="mt-0.5 text-xs italic" style={{ color: "var(--color-dim)" }}>
          {day.intent}
        </p>
      )}
      <div className="mt-2 space-y-1.5">
        {day.exercises.map((ex, i) => (
          <div key={i} className="flex items-baseline justify-between gap-3">
            <span className="text-sm" style={{ color: "var(--color-slate-text)" }}>
              {ex.name}
            </span>
            <span
              className="shrink-0 text-[11px]"
              style={{ fontFamily: "var(--font-mono)", color: "var(--color-ember)" }}
            >
              {ex.sets}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
