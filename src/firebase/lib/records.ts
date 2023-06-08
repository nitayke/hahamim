import { ref, getDatabase, query, orderByChild, get } from "firebase/database";
import { DBKeys, Record } from "../types";

export async function getRecords() {
  const qRef = ref(getDatabase(), DBKeys.records);
  const qRecords = query(qRef, orderByChild("score"));

  const snapshot = await get(qRecords);
  const records = [] as Record[];
  snapshot.forEach((child) => {
    records.push(child.val());
  });
  return records;
}
