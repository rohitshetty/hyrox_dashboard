import Link from "next/link";
import { plan } from "@/lib/plan";

export default function WeekNav({
  weekNum,
  phase,
}: {
  weekNum: number;
  phase: string;
}) {
  return (
    <div className="flex items-center justify-between">
      {weekNum > 1 ? (
        <Link
          href={`/week/${weekNum - 1}`}
          className="rounded p-2 transition-colors active:bg-[var(--color-surface-2)]"
          style={{ color: "var(--color-muted)" }}
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
      ) : (
        <div className="w-9" />
      )}

      <div className="text-center">
        <p
          className="text-2xl font-extrabold tracking-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          W{weekNum}
        </p>
        <p
          className="mt-0.5 text-[10px] tracking-[0.2em] uppercase"
          style={{ fontFamily: "var(--font-mono)", color: "var(--color-muted)" }}
        >
          {phase}
        </p>
      </div>

      {weekNum < plan.meta.totalWeeks ? (
        <Link
          href={`/week/${weekNum + 1}`}
          className="rounded p-2 transition-colors active:bg-[var(--color-surface-2)]"
          style={{ color: "var(--color-muted)" }}
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      ) : (
        <div className="w-9" />
      )}
    </div>
  );
}
