export const DBKeys = {
  questions: "questions",
  records: "records",
  scores: "scores",
} as const;

export interface DB {
  questions: Questions;
  records: { [key: string]: RecordScore };
  scores: {
    scores: { [key: string]: number };
    sum: number;
  };
}
export const Difficulties = ["easy", "medium", "hard"] as const;
export type IDifficulty = (typeof Difficulties)[number];
export type Questions = Record<IDifficulty, DifficultyTable>;

export interface DifficultyTable {
  [key: string]: RabbiInfo;
}

export interface RabbiInfo {
  name: string;
  type: number;
}

export interface RecordScore {
  name: string;
  score: number;
}

export type AddQuestion = {
  question: string;
  answer: string;
  level: string;
};
