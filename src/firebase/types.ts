export const DBKeys = {
  questions: "questions",
  records: "records",
  scores: "scores",
} as const;

export interface DB {
  questions: Questions;
  records: { [key: string]: Record };
  scores: {
    scores: { [key: string]: number };
    sum: number;
  };
}

export interface Questions {
  easy: Difficulty;
  hard: Difficulty;
  medium: Difficulty;
}

export interface Difficulty {
  [key: string]: RabbiInfo;
}

export interface RabbiInfo {
  name: string;
  type: number;
}

export interface Record {
  name: string;
  score: number;
}
