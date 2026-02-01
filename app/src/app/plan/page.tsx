import { plan } from "@/lib/plan";

const phaseAccents: Record<string, string> = {
  "Cycle 1 - Base/Build": "#00d4ff",
  "Deload 1 + Full Sim": "#39ff14",
  "Cycle 2 - Build/Peak": "#ff2d55",
  "Deload 2": "#39ff14",
  "Taper + Race": "#ff6b00",
};

const volumeData = [
  { week: 1, km: 45 },
  { week: 2, km: 48 },
  { week: 3, km: 52 },
  { week: 4, km: 30 },
  { week: 5, km: 50 },
  { week: 6, km: 54 },
  { week: 7, km: 54 },
  { week: 8, km: 35 },
  { week: 9, km: 42 },
  { week: 10, km: 14 },
];

const maxKm = 54;

export default function PlanPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="animate-in">
        <p className="section-label">OPERATION</p>
        <h1
          className="mt-2 text-3xl font-extrabold tracking-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          RACE MAP
        </h1>
        <p className="mt-2 text-sm" style={{ color: "var(--color-muted)" }}>
          {plan.meta.totalWeeks} weeks &middot; {plan.meta.startDate} &rarr;{" "}
          {plan.meta.raceDate}
        </p>
        <div className="mt-3">
          <span
            className="tag"
            style={{
              fontFamily: "var(--font-mono)",
              color: "var(--color-phosphor)",
              background: "rgba(57,255,20,0.08)",
            }}
          >
            TARGET: {plan.meta.goalTime?.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Phase timeline */}
      <div className="animate-in animate-in-1">
        <p className="section-label mb-3">PERIODIZATION</p>
        <div className="flex gap-px overflow-hidden rounded">
          {plan.periodization.map((phase) => {
            const accent = phaseAccents[phase.name] || "#5a5a68";
            const weekRange = phase.weeks.split("-");
            const span =
              weekRange.length === 2
                ? parseInt(weekRange[1]) - parseInt(weekRange[0]) + 1
                : 1;

            return (
              <div
                key={phase.name}
                className="flex flex-col justify-between p-2.5"
                style={{
                  flex: span,
                  background: `${accent}12`,
                  borderBottom: `2px solid ${accent}`,
                }}
              >
                <p
                  className="text-[10px] font-bold leading-tight"
                  style={{ fontFamily: "var(--font-mono)", color: accent }}
                >
                  {phase.name.split(" - ").pop()?.toUpperCase()}
                </p>
                <p
                  className="mt-1 text-[10px]"
                  style={{ fontFamily: "var(--font-mono)", color: "var(--color-dim)" }}
                >
                  W{phase.weeks}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Volume chart — SVG area graph */}
      <div className="animate-in animate-in-2">
        <p className="section-label mb-4">WEEKLY RUN VOLUME</p>
        <VolumeGraph data={volumeData} max={maxKm} />
      </div>

      {/* Phase details */}
      <div className="animate-in animate-in-3 space-y-2.5">
        <p className="section-label">PHASE INTEL</p>
        {plan.periodization.map((phase) => {
          const accent = phaseAccents[phase.name] || "#5a5a68";
          return (
            <div
              key={phase.name}
              className="rounded border p-4"
              style={{
                borderColor: "var(--color-border)",
                background: "var(--color-surface)",
                borderLeftWidth: 3,
                borderLeftColor: accent,
              }}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-sm font-semibold" style={{ color: "var(--color-foreground)" }}>
                    {phase.name}
                  </p>
                  <p
                    className="mt-0.5 text-[11px]"
                    style={{ fontFamily: "var(--font-mono)", color: "var(--color-dim)" }}
                  >
                    WEEKS {phase.weeks}
                  </p>
                </div>
                <span
                  className="tag"
                  style={{
                    fontFamily: "var(--font-mono)",
                    color: "var(--color-ice)",
                    background: "rgba(0,212,255,0.08)",
                  }}
                >
                  {phase.runVolume}
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--color-slate-text)" }}>
                {phase.hyrox}
              </p>
            </div>
          );
        })}
      </div>

      {/* Race day targets */}
      <div className="animate-in animate-in-4">
        <p className="section-label mb-3">RACE DAY TIME BUDGET</p>
        <div className="space-y-1.5">
          {Object.entries(plan.hyroxReference.raceDayStrategy.breakdown).map(
            ([key, val]) => (
              <div
                key={key}
                className="flex items-center justify-between rounded border px-4 py-3"
                style={{
                  borderColor: "var(--color-border)",
                  background: "var(--color-surface)",
                }}
              >
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
            )
          )}
        </div>
      </div>

      {/* Pace zones */}
      <div className="animate-in animate-in-5">
        <p className="section-label mb-3">PACE ZONES</p>
        <div className="space-y-1.5">
          {Object.entries(plan.paces).map(([key, zone]) => (
            <div
              key={key}
              className="flex items-center justify-between rounded border px-4 py-3"
              style={{
                borderColor: "var(--color-border)",
                background: "var(--color-surface)",
              }}
            >
              <div className="flex items-center gap-3">
                <span
                  className="inline-flex h-6 w-6 items-center justify-center rounded text-xs font-bold"
                  style={{
                    fontFamily: "var(--font-mono)",
                    color: "var(--color-ice)",
                    background: "rgba(0,212,255,0.1)",
                  }}
                >
                  {key}
                </span>
                <span className="text-sm" style={{ color: "var(--color-slate-text)" }}>
                  {zone.name}
                </span>
              </div>
              <span
                className="text-sm font-semibold tabular-nums"
                style={{ fontFamily: "var(--font-mono)", color: "var(--color-foreground)" }}
              >
                {zone.pace}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── SVG Area Graph ── */

const CHART_W = 340;
const CHART_H = 160;
const PAD_L = 32;
const PAD_R = 12;
const PAD_T = 20;
const PAD_B = 28;
const PLOT_W = CHART_W - PAD_L - PAD_R;
const PLOT_H = CHART_H - PAD_T - PAD_B;

function VolumeGraph({
  data,
  max,
}: {
  data: { week: number; km: number }[];
  max: number;
}) {
  const yMax = Math.ceil(max / 10) * 10; // round up to nearest 10
  const gridLines = [0, 20, 40, 60];

  // Map data to SVG coordinates
  const points = data.map((d, i) => ({
    x: PAD_L + (i / (data.length - 1)) * PLOT_W,
    y: PAD_T + PLOT_H - (d.km / yMax) * PLOT_H,
    km: d.km,
    week: d.week,
  }));

  // Catmull-Rom to smooth cubic bezier path
  function smoothPath(pts: { x: number; y: number }[]): string {
    if (pts.length < 2) return "";
    let d = `M${pts[0].x},${pts[0].y}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[Math.max(i - 1, 0)];
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const p3 = pts[Math.min(i + 2, pts.length - 1)];
      const tension = 0.3;
      const cp1x = p1.x + ((p2.x - p0.x) * tension);
      const cp1y = p1.y + ((p2.y - p0.y) * tension);
      const cp2x = p2.x - ((p3.x - p1.x) * tension);
      const cp2y = p2.y - ((p3.y - p1.y) * tension);
      d += ` C${cp1x},${cp1y} ${cp2x},${cp2y} ${p2.x},${p2.y}`;
    }
    return d;
  }

  const linePath = smoothPath(points);
  // Area: same path but close down to bottom
  const areaPath = `${linePath} L${points[points.length - 1].x},${PAD_T + PLOT_H} L${points[0].x},${PAD_T + PLOT_H} Z`;

  // Deload weeks (4, 8) get a different dot style
  const deloadWeeks = new Set([4, 8]);

  return (
    <div
      className="rounded border p-3"
      style={{ borderColor: "var(--color-border)", background: "var(--color-surface)" }}
    >
      <svg
        viewBox={`0 0 ${CHART_W} ${CHART_H}`}
        className="w-full"
        style={{ overflow: "visible" }}
      >
        <defs>
          {/* Area gradient */}
          <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#00d4ff" stopOpacity="0.01" />
          </linearGradient>
          {/* Line glow filter */}
          <filter id="lineGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {/* Dot glow */}
          <filter id="dotGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
          </filter>
        </defs>

        {/* Horizontal grid lines */}
        {gridLines.map((val) => {
          const y = PAD_T + PLOT_H - (val / yMax) * PLOT_H;
          return (
            <g key={val}>
              <line
                x1={PAD_L}
                y1={y}
                x2={PAD_L + PLOT_W}
                y2={y}
                stroke="var(--color-border)"
                strokeWidth={0.5}
                strokeDasharray={val === 0 ? "none" : "2,4"}
              />
              <text
                x={PAD_L - 6}
                y={y + 3}
                textAnchor="end"
                fill="var(--color-dim)"
                fontSize="8"
                fontFamily="var(--font-mono)"
              >
                {val}
              </text>
            </g>
          );
        })}

        {/* Area fill */}
        <path d={areaPath} fill="url(#areaGrad)" />

        {/* Glow behind line */}
        <path
          d={linePath}
          fill="none"
          stroke="#00d4ff"
          strokeWidth={3}
          strokeLinecap="round"
          filter="url(#lineGlow)"
          opacity={0.4}
        />

        {/* Main line */}
        <path
          d={linePath}
          fill="none"
          stroke="#00d4ff"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Data points */}
        {points.map((p, i) => {
          const isDeload = deloadWeeks.has(data[i].week);
          return (
            <g key={i}>
              {/* Glow behind dot */}
              <circle
                cx={p.x}
                cy={p.y}
                r={isDeload ? 4 : 5}
                fill="#00d4ff"
                filter="url(#dotGlow)"
                opacity={0.5}
              />
              {/* Dot */}
              <circle
                cx={p.x}
                cy={p.y}
                r={isDeload ? 2.5 : 3}
                fill={isDeload ? "var(--color-surface)" : "#00d4ff"}
                stroke={isDeload ? "var(--color-phosphor)" : "#00d4ff"}
                strokeWidth={isDeload ? 1 : 0}
              />
              {/* Value label */}
              <text
                x={p.x}
                y={p.y - 9}
                textAnchor="middle"
                fill={isDeload ? "var(--color-phosphor)" : "var(--color-ice)"}
                fontSize="9"
                fontWeight="600"
                fontFamily="var(--font-mono)"
              >
                {p.km}
              </text>
              {/* Week label */}
              <text
                x={p.x}
                y={PAD_T + PLOT_H + 16}
                textAnchor="middle"
                fill="var(--color-dim)"
                fontSize="8"
                fontFamily="var(--font-mono)"
              >
                W{data[i].week}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
