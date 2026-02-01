export type SlotType = "run" | "strength" | "hyrox" | "class" | "rest" | "race";

export type DayName =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export interface WorkoutExercise {
  name: string;
  prescription?: string;
  rest?: string;
  notes?: string;
  sets?: string;
}

export interface WorkoutBlock {
  block: string;
  notes?: string;
  exercises: WorkoutExercise[];
}

export interface Slot {
  time?: string;
  type: SlotType;
  session: string;
  distance?: string;
  details?: string;
  ref?: string;
  duration?: string;
  warmup?: string;
  cooldown?: string;
  workout?: WorkoutBlock[];
  notes?: string;
}

export interface Day {
  slots?: Slot[];
  rest?: boolean;
}

export interface Week {
  week: number;
  dates: string;
  phase: string;
  runVolume: string;
  philosophy: string;
  days: Record<DayName, Day>;
}

export interface PaceZone {
  name: string;
  pace: string;
  purpose: string;
}

export interface PeriodPhase {
  name: string;
  weeks: string;
  runVolume: string;
  hyrox: string;
}

export interface CyclePhilosophy {
  name: string;
  philosophy: string;
}

export interface StrengthExercise {
  name: string;
  sets: string;
  notes?: string;
}

export interface StrengthDay {
  name: string;
  intent?: string;
  exercises: StrengthExercise[];
}

export interface StationTarget {
  station: string;
  distance?: string;
  reps?: number;
  weight?: string;
  target: string;
  strategy: string;
}

export interface HyroxReference {
  stationTargets: StationTarget[];
  technique: Record<string, string[]>;
  raceDayStrategy: {
    target: string;
    breakdown: Record<string, string>;
    mentalCues: {
      firstHalf: string;
      secondHalf: string;
      perStation: string[];
    };
  };
  raceDayChecklist: Record<string, string[]>;
}

export interface Meta {
  raceDate: string;
  goalTime: string;
  totalWeeks: number;
  startDate: string;
  startingRunVolume: string;
  equipment: {
    available: string[];
    substitutions: Record<string, string>;
  };
}

export interface Plan {
  meta: Meta;
  paces: Record<string, PaceZone>;
  periodization: PeriodPhase[];
  cyclePhilosophy: Record<string, CyclePhilosophy>;
  strength: Record<string, StrengthDay | string[]>;
  weeks: Week[];
  hyroxReference: HyroxReference;
}
