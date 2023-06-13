import { ref, getDatabase, query, orderByChild, get, increment, update } from "firebase/database";
import { DB, DBKeys, RecordScore } from "../types";

export async function getRecords() {
  const qRef = ref(getDatabase(), DBKeys.records);
  const qRecords = query(qRef, orderByChild("score"));

  const snapshot = await get(qRecords);
  const records = [] as RecordScore[];
  snapshot.forEach((child) => {
    const record = child.val();
    if (!record?.name || !record?.score) return;
    records.push(record);
  });
  return records;
}

export async function isRecordInTopRank({ score }: { score: number }) {
  const records = await getRecords();
  records.sort((a, b) => b.score - a.score);
  return records.length < 10 || score > records[records.length - 1].score;
}

export async function getRecordPosition(originalScore: number) {
  const score = Math.floor(originalScore / 10);
  const scoresRef = ref(getDatabase(), DBKeys.scores);
  const scores = (await get(scoresRef)).val() as DB["scores"];
  const totalCountPlayed = scores.countPlayed;
  const scoresInDB = scores.scores as unknown as number[];

  const higherScores = Object.keys(scoresInDB).filter((key) => Number(key) >= score);
  const countPlayedWhoHaveHigherScore = higherScores.reduce(
    (acc, key) => acc + scoresInDB[+key],
    0
  );
  console.log("countPlayedWhoHaveHigherScore", countPlayedWhoHaveHigherScore);

  const position = totalCountPlayed - countPlayedWhoHaveHigherScore;

  await update(scoresRef, {
    [score]: increment(1),
    countPlayed: increment(1),
  });
  return `${position}/${totalCountPlayed + 1}`;
}
