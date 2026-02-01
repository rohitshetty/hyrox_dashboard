# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Dev Commands

All commands run from `app/`:

```bash
cd app
npm run build      # prebuild (YAML→JSON) + next build → static export to out/
npm run dev        # dev server with hot reload (port 3000)
npm run lint       # eslint
npx serve out      # serve the static build locally
```

The `prebuild` step runs `tsx scripts/build-data.ts` which reads `plan.yml` from the project root and writes `data/plan.json`. This must succeed before Next.js can build.

## Architecture

**Data flow**: `plan.yml` → (build-time) → `data/plan.json` → imported by `src/lib/plan.ts` → consumed by pages/components.

This is a **static-only** Next.js app (`output: "export"` in next.config). No API routes, no server runtime. The `out/` directory is the deploy artifact.

**One exception**: The today page (`src/app/page.tsx`) is a `"use client"` component because it needs `new Date()` at render time to resolve the current week/day. All other pages are server components or statically generated.

**Week pages** use `generateStaticParams` to produce `/week/1` through `/week/10` at build time.

## Key Data Model

The plan has 10 weeks. Each week has 7 days. Each day has `slots` (or `rest: true`). Slot types: `run`, `strength`, `hyrox`, `class`, `rest`, `race`. Strength slots use a `ref` field (e.g., `"strength.monday"`) that resolves to exercise data via `getStrengthDay()` in `src/lib/plan.ts`.

## Date Logic (src/lib/dates.ts)

Training starts Feb 2, 2026. Race is April 13, 2026. Week index is clamped 0–9 (before training = week 1, after race = week 10). Day name comes from `new Date().getDay()`.

## Styling

Tailwind v4 with `@theme inline` CSS variables in `globals.css`. No `tailwind.config.ts` — Tailwind v4 uses CSS-based config. Custom colors use CSS variables (`--color-phosphor`, `--color-ember`, `--color-ice`, `--color-crimson`, etc.) defined in globals.css. Fonts are loaded via CSS `@import` (JetBrains Mono + Outfit) — the font `@import` must stay **before** `@import "tailwindcss"` or Turbopack errors in dev.

## Modifying the Plan

Edit `plan.yml` at the project root, then rebuild. The YAML structure is the source of truth. `src/lib/types.ts` defines the TypeScript interfaces that mirror it.
