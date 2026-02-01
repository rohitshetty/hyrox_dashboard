"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { resolveCurrentWeek } from "@/lib/dates";

const tabs = [
  { label: "OPS", href: "/", full: "Today" },
  { label: "WK", href: "/week/", full: "Week" },
  { label: "MAP", href: "/plan", full: "Plan" },
  { label: "STR", href: "/strength", full: "Strength" },
  { label: "HYX", href: "/hyrox", full: "Hyrox" },
];

export default function BottomNav() {
  const pathname = usePathname();
  const currentWeek = resolveCurrentWeek() + 1;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-[var(--color-border)] bg-[var(--color-background)]/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-lg items-center justify-around pb-[env(safe-area-inset-bottom)]">
        {tabs.map((tab) => {
          const href = tab.full === "Week" ? `/week/${currentWeek}` : tab.href;
          const isActive =
            tab.full === "Week"
              ? pathname.startsWith("/week")
              : pathname === tab.href;

          return (
            <Link
              key={tab.label}
              href={href}
              className={`group relative flex flex-col items-center gap-1 px-4 py-3 transition-all ${
                isActive ? "" : "opacity-40"
              }`}
            >
              {/* Active indicator dot */}
              {isActive && (
                <span className="absolute -top-px left-1/2 h-[2px] w-6 -translate-x-1/2 bg-[var(--color-phosphor)]" />
              )}
              <span
                className={`font-[var(--font-mono)] text-[11px] font-semibold tracking-[0.15em] ${
                  isActive ? "text-[var(--color-foreground)]" : "text-[var(--color-muted)]"
                }`}
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
