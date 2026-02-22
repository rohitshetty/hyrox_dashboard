import { plan } from "./plan";
import type { DayName, Plan } from "./types";

const DAY_NAMES: DayName[] = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

function parseLocalDate(s: string): Date {
  const d = new Date(s);
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

const TRAINING_START = parseLocalDate(plan.meta.startDate);
const RACE_DATE = parseLocalDate(plan.meta.raceDate);

export function getCurrentDayName(): DayName {
  return DAY_NAMES[new Date().getDay()];
}

export function resolveCurrentWeek(): number {
  const now = new Date();
  const diffMs = now.getTime() - TRAINING_START.getTime();
  const diffDays = Math.floor(diffMs / 86_400_000);
  const weekIndex = Math.floor(diffDays / 7);
  return Math.max(0, Math.min(plan.meta.totalWeeks - 1, weekIndex));
}

export function getDaysUntilRace(): number {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return Math.max(0, Math.ceil((RACE_DATE.getTime() - now.getTime()) / 86_400_000));
}

export function getFormattedDate(): string {
  return new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

export function getDayDate(week: number, dayName: DayName): string {
  const dayIndex = DAY_NAMES.indexOf(dayName);
  // Training starts on Monday (index 1). Adjust so Monday=0 offset.
  const mondayOffset = dayIndex === 0 ? 6 : dayIndex - 1;
  const date = new Date(TRAINING_START);
  date.setDate(date.getDate() + week * 7 + mondayOffset);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function isTrainingActive(): boolean {
  const now = new Date();
  return now >= TRAINING_START && now <= RACE_DATE;
}

export function getTodayContext(plan: Plan) {
  const weekIndex = resolveCurrentWeek();
  const dayName = getCurrentDayName();
  const week = plan.weeks[weekIndex];
  const day = week.days[dayName];
  return { week, dayName, day, weekIndex, daysUntilRace: getDaysUntilRace() };
}
