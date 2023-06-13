import { Difficulties, IDifficulty } from "~/firebase/types";

export const RabbiTypeKeys = ["תנא", "אמורא", "ראשון", "אחרון"] as const;
export type IRabbiType = (typeof RabbiTypeKeys)[number];

export const hebrewDifficultyLevelTypes: Record<IDifficulty, string> = {
  easy: "קל",
  medium: "בינוני",
  hard: "קשה",
};

export function convertDifficultyLevelToHebrew(difficulty: number | IDifficulty) {
  if (typeof difficulty === "number") {
    return hebrewDifficultyLevelTypes[Difficulties[difficulty]];
  }
  return hebrewDifficultyLevelTypes[difficulty];
}
