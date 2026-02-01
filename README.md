# Hyrox Prep Dashboard

(If you are not me, the author, you'll likely not find much value - anyway now that you are here - Hello!)

A mobile-first training dashboard for a 10-week Hyrox race preparation block. Built to open at 5am, see what's scheduled, and get moving.

## What it does

Reads a single `plan.yml` file containing your entire 10-week periodized training plan and renders it as a static web app with five views:

- **OPS (Today)** — Shows today's sessions based on the current date. Auto-detects the week, phase, and day. Displays a race countdown and the week's training philosophy.
- **WK (Week)** — Full 7-day view for any week (1–10). Navigate between weeks. Each day lists all session slots with expandable detail.
- **MAP (Plan)** — Bird's-eye view of the entire block: periodization timeline, weekly run volume graph, phase summaries, race day time budget, and pace zones.
- **STR (Strength)** — The 5-day strength program (Mon/Tue/Wed/Thu/Sat) with exercises, sets, and recovery guardrails. Tab between days.
- **HYX (Hyrox)** — Race reference: 8 station targets with times, technique cues, mental strategy for each half, and a race day checklist.

## The plan

The training plan lives in `plan.yml` at the project root. It contains:

- **Meta**: Race date (April 13, 2026), goal time (sub 70 minutes), equipment list
- **Paces**: 5 running zones (Easy through Repetition) with target paces
- **Periodization**: 5 phases across 10 weeks
  - Weeks 1–3: Base/Build (45–52 km/week)
  - Week 4: Deload + Full Sim (30 km)
  - Weeks 5–7: Build/Peak (50–54 km)
  - Week 8: Deload (35 km)
  - Weeks 9–10: Taper + Race (42 → 14 km)
- **Strength**: 5-day split (Squat / Back+Biceps / Deadlift / Chest+Delts+Triceps / Arms+Delts)
- **Weekly schedules**: Each day has timed slots with session type, workout blocks, warmups, cooldowns, and notes
- **Hyrox reference**: Station targets, technique, race strategy, mental cues, checklist

### Session types

| Type | Color | Description |
|------|-------|-------------|
| `run` | Cyan | Running sessions (easy, tempo, intervals, long runs) |
| `strength` | Orange | Gym sessions referencing the strength program |
| `hyrox` | Crimson | Hyrox-specific station practice and simulations |
| `class` | Gray | External gym classes (not prescribed, just scheduled) |
| `rest` | Dim | Rest days |
| `race` | Green | Race day |

### Modifying the plan

Edit `plan.yml` directly. The YAML is converted to JSON at build time. After editing, rebuild:

```
cd app
npm run build
```

The structure is self-documenting — look at any existing week to see the slot format. Key fields per slot:

```yaml
- time: "5:00-6:00"
  type: run
  session: "Easy Run"
  distance: "7 km"
  details: "Zone 1-2, conversational pace"
  warmup: "5 min walk, dynamic stretches"
  cooldown: "5 min walk"
```

For hyrox sessions with workout blocks:

```yaml
- type: hyrox
  session: "Station Practice"
  workout:
    - block: "Main Set"
      exercises:
        - name: "SkiErg"
          prescription: "4 x 250m\nRest 60s between sets"
```

For strength sessions, use `ref` to link to the strength program:

```yaml
- type: strength
  session: "Squat Day (Lower + Core)"
  ref: "strength.monday"
```

## Setup

```
cd app
npm install
npm run build
```

This runs the prebuild script (`scripts/build-data.ts`) which converts `plan.yml` → `data/plan.json`, then builds the Next.js static export to `out/`.

### Development

```
npm run dev
```

Runs on `http://localhost:3000` with hot reload.

### Serving the static build

```
npx serve out
```

Or deploy the `out/` directory to any static host (Vercel, Netlify, GitHub Pages, S3, etc).

## Tech stack

- Next.js 16 (App Router, static export)
- Tailwind CSS v4
- TypeScript
- `js-yaml` for build-time YAML parsing
- No component library, no database, no backend

## Project structure

```
plan.yml                        # Source of truth — your training plan
app/
  scripts/build-data.ts         # YAML → JSON build script
  data/plan.json                # Generated (gitignored)
  src/
    lib/
      types.ts                  # TypeScript interfaces
      plan.ts                   # Data loader + strength ref resolver
      dates.ts                  # Date/week/day resolution
      colors.ts                 # Session type → color mapping
    components/
      BottomNav.tsx             # Fixed bottom tab navigation
      SlotCard.tsx              # Expandable session card
      DayColumn.tsx             # Day header + slot list
      WeekNav.tsx               # Week prev/next navigation
    app/
      layout.tsx                # Root layout + nav
      page.tsx                  # Today view (client component)
      week/[n]/page.tsx         # Week view (static, 10 pages)
      plan/page.tsx             # Plan overview
      strength/page.tsx         # Strength program
      hyrox/page.tsx            # Hyrox reference
```

## Date logic

The app auto-detects the current date to determine which week and day to show:

- Training starts **February 2, 2026** (Monday of week 1)
- Race is **April 13, 2026**
- If you open the app before training starts, it shows week 1
- If you open it after the race, it shows week 10
- The today view is a client component — date resolution happens in the browser, not at build time

## Design

The UI uses a "war room at dawn" aesthetic — dark matte surfaces, phosphor green race countdown, cyan/orange/crimson accent colors for different session types, JetBrains Mono for data readouts, Outfit for display headers. Designed for glancing at a phone screen at 5am.
