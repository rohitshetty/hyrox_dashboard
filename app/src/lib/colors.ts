import type { SlotType } from "./types";

export const slotStyles: Record<
  SlotType,
  { accent: string; bg: string; text: string; borderColor: string; label: string }
> = {
  run: {
    accent: "#00d4ff",
    bg: "bg-[#00d4ff]/5",
    text: "text-[#00d4ff]",
    borderColor: "border-[#00d4ff]/30",
    label: "RUN",
  },
  strength: {
    accent: "#ff6b00",
    bg: "bg-[#ff6b00]/5",
    text: "text-[#ff6b00]",
    borderColor: "border-[#ff6b00]/30",
    label: "STR",
  },
  hyrox: {
    accent: "#ff2d55",
    bg: "bg-[#ff2d55]/5",
    text: "text-[#ff2d55]",
    borderColor: "border-[#ff2d55]/30",
    label: "HYX",
  },
  class: {
    accent: "#5a5a68",
    bg: "bg-[#5a5a68]/5",
    text: "text-[#5a5a68]",
    borderColor: "border-[#5a5a68]/20",
    label: "CLS",
  },
  rest: {
    accent: "#3a3a44",
    bg: "bg-[#3a3a44]/5",
    text: "text-[#3a3a44]",
    borderColor: "border-[#3a3a44]/20",
    label: "REST",
  },
  race: {
    accent: "#39ff14",
    bg: "bg-[#39ff14]/5",
    text: "text-[#39ff14]",
    borderColor: "border-[#39ff14]/30",
    label: "RACE",
  },
};
