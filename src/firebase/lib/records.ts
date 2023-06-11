import { ref, getDatabase, query, orderByChild, get } from "firebase/database";
import { DBKeys, RecordScore } from "../types";

export async function getRecords() {
  const qRef = ref(getDatabase(), DBKeys.records);
  const qRecords = query(qRef, orderByChild("score"));

  const snapshot = await get(qRecords);
  const records = [] as RecordScore[];
  snapshot.forEach((child) => {
    records.push(child.val());
  });
  return records;
}

export async function isRecordInTopRank({ score }: { score: number }) {
  const records = await getRecords();
  records.sort((a, b) => b.score - a.score);
  return records.length < 10 || score > records[records.length - 1].score;
}
