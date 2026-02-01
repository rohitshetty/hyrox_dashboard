import { plan } from "@/lib/plan";

export default function HyroxPage() {
  const ref = plan.hyroxReference;

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="animate-in">
        <p className="section-label">INTELLIGENCE</p>
        <h1
          className="mt-2 text-3xl font-extrabold tracking-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          HYROX
        </h1>
        <div className="mt-3">
          <span
            className="tag"
            style={{
              fontFamily: "var(--font-mono)",
              color: "var(--color-phosphor)",
              background: "rgba(57,255,20,0.08)",
            }}
          >
            TARGET: {ref.raceDayStrategy.target}
          </span>
        </div>
      </div>

      {/* Time budget */}
      <div className="animate-in animate-in-1">
        <div
          className="rounded border p-4"
          style={{
            borderColor: "var(--color-border)",
            background: "var(--color-surface)",
          }}
        >
          <p className="section-label mb-3">TIME BUDGET</p>
          {Object.entries(ref.raceDayStrategy.breakdown).map(([key, val]) => (
            <div key={key} className="flex justify-between border-b py-2 last:border-0" style={{ borderColor: "var(--color-border)" }}>
              <span className="text-sm capitalize" style={{ color: "var(--color-slate-text)" }}>
                {key}
              </span>
              <span
                className="text-sm font-semibold tabular-nums"
                style={{ fontFamily: "var(--font-mono)", color: "var(--color-foreground)" }}
              >
                {val}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 8 Stations */}
      <div className="animate-in animate-in-2 space-y-2.5">
        <p className="section-label">8 STATIONS</p>
        {ref.stationTargets.map((st, i) => (
          <div
            key={i}
            className="rounded border p-4"
            style={{
              borderColor: "var(--color-border)",
              background: "var(--color-surface)",
              borderLeftWidth: 3,
              borderLeftColor: "var(--color-crimson)",
            }}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <span
                  className="inline-flex h-7 w-7 items-center justify-center rounded text-xs font-bold"
                  style={{
                    fontFamily: "var(--font-mono)",
                    color: "var(--color-crimson)",
                    background: "rgba(255,45,85,0.1)",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-sm font-semibold" style={{ color: "var(--color-foreground)" }}>
                  {st.station}
                </span>
              </div>
              <span
                className="tag"
                style={{
                  fontFamily: "var(--font-mono)",
                  color: "var(--color-crimson)",
                  background: "rgba(255,45,85,0.08)",
                  fontWeight: 700,
                }}
              >
                {st.target}
              </span>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {st.distance && (
                <span
                  className="text-[11px]"
                  style={{ fontFamily: "var(--font-mono)", color: "var(--color-dim)" }}
                >
                  {st.distance}
                </span>
              )}
              {st.reps && (
                <span
                  className="text-[11px]"
                  style={{ fontFamily: "var(--font-mono)", color: "var(--color-dim)" }}
                >
                  {st.reps} REPS
                </span>
              )}
              {st.weight && (
                <span
                  className="tag"
                  style={{
                    fontFamily: "var(--font-mono)",
                    color: "var(--color-muted)",
                    background: "var(--color-surface-2)",
                  }}
                >
                  {st.weight}
                </span>
              )}
            </div>
            <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--color-slate-text)" }}>
              {st.strategy}
            </p>
          </div>
        ))}
      </div>

      {/* Technique cues */}
      <div className="animate-in animate-in-3 space-y-2.5">
        <p className="section-label">TECHNIQUE CUES</p>
        {Object.entries(ref.technique).map(([station, cues]) => (
          <div
            key={station}
            className="rounded border p-4"
            style={{
              borderColor: "var(--color-border)",
              background: "var(--color-surface)",
            }}
          >
            <p className="text-sm font-semibold capitalize" style={{ color: "var(--color-foreground)" }}>
              {station.replace(/([A-Z])/g, " $1").trim()}
            </p>
            <ul className="mt-2 space-y-1">
              {cues.map((cue, i) => (
                <li key={i} className="flex gap-2 text-sm" style={{ color: "var(--color-slate-text)" }}>
                  <span style={{ color: "var(--color-crimson-dim)" }}>&bull;</span>
                  {cue}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Mental cues */}
      <div className="animate-in animate-in-4 space-y-2.5">
        <p className="section-label">MENTAL WARFARE</p>
        <div
          className="rounded border p-4"
          style={{
            borderColor: "rgba(0,212,255,0.15)",
            background: "rgba(0,212,255,0.03)",
          }}
        >
          <p className="section-label" style={{ color: "var(--color-ice-dim)" }}>
            FIRST HALF
          </p>
          <p className="mt-1.5 text-sm leading-relaxed" style={{ color: "var(--color-foreground)" }}>
            {ref.raceDayStrategy.mentalCues.firstHalf}
          </p>
        </div>
        <div
          className="rounded border p-4"
          style={{
            borderColor: "rgba(255,45,85,0.15)",
            background: "rgba(255,45,85,0.03)",
          }}
        >
          <p className="section-label" style={{ color: "var(--color-crimson-dim)" }}>
            SECOND HALF
          </p>
          <p className="mt-1.5 text-sm leading-relaxed" style={{ color: "var(--color-foreground)" }}>
            {ref.raceDayStrategy.mentalCues.secondHalf}
          </p>
        </div>
        <div className="space-y-1.5 pl-1">
          {ref.raceDayStrategy.mentalCues.perStation.map((cue, i) => (
            <p key={i} className="text-sm" style={{ color: "var(--color-slate-text)" }}>
              {cue}
            </p>
          ))}
        </div>
      </div>

      {/* Checklist */}
      <div className="animate-in animate-in-5 space-y-2.5">
        <p className="section-label">RACE DAY CHECKLIST</p>
        {Object.entries(ref.raceDayChecklist).map(([section, items]) => {
          if (typeof items === "string") {
            return (
              <div
                key={section}
                className="rounded border p-5 text-center"
                style={{
                  borderColor: "rgba(57,255,20,0.2)",
                  background: "rgba(57,255,20,0.03)",
                }}
              >
                <p
                  className="text-sm font-bold tracking-wide"
                  style={{ fontFamily: "var(--font-mono)", color: "var(--color-phosphor)" }}
                >
                  {items}
                </p>
              </div>
            );
          }
          return (
            <div
              key={section}
              className="rounded border p-4"
              style={{
                borderColor: "var(--color-border)",
                background: "var(--color-surface)",
              }}
            >
              <p className="section-label capitalize">{section}</p>
              <ul className="mt-2 space-y-1.5">
                {(items as string[]).map((item, i) => (
                  <li key={i} className="flex gap-2 text-sm" style={{ color: "var(--color-slate-text)" }}>
                    <span
                      className="mt-0.5 inline-block h-3.5 w-3.5 shrink-0 rounded-sm border"
                      style={{ borderColor: "var(--color-border-bright)" }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
