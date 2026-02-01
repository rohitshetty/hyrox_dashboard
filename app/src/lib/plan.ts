import planData from "../../data/plan.json";
import type { Plan, StrengthDay } from "./types";

export const plan = planData as unknown as Plan;

export function getStrengthDay(ref: string): StrengthDay | null {
  const parts = ref.split(".");
  if (parts.length !== 2 || parts[0] !== "strength") return null;
  const day = plan.strength[parts[1]];
  if (!day || typeof day !== "object" || Array.isArray(day)) return null;
  return day as StrengthDay;
}
