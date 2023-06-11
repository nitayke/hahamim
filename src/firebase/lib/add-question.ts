import { ref, getDatabase, push, set } from "firebase/database";
import { AddQuestion } from "../types";

export async function addQuestion({ question, answer, level }: AddQuestion) {
  const quesionsRef = ref(getDatabase(), "waiting");
  const newQuestionRef = push(quesionsRef);
  try {
    await set(newQuestionRef, {
      question,
      answer,
      level,
    });
    return { success: true };
  } catch (e) {
    console.error(e);
    return { error: e };
  }
}
