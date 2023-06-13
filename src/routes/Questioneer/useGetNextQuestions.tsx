import { useState, useCallback } from "react";
import { NUMBER_OF_QUESTIONS_FOR_EACH_LEVEL } from "~/config";
import { getQuestionsByDifficulty } from "~/firebase/lib/get-questions";
import { RabbiInfo, RabbiInfoWithDifficulty } from "~/firebase/types";
import { asyncChain } from "~/utils/helpers";
import { IQuestion } from "./quiz-machine/quiz-machine";

export function getQuestsionIterators() {
  const iters = (["easy", "medium", "hard"] as const).map((level) =>
    getQuestionsByDifficulty({
      difficultyLevel: level,
      numberOfQuestions: NUMBER_OF_QUESTIONS_FOR_EACH_LEVEL,
    })
  );
  return asyncChain(...iters);
}

export function getNextQuestion(questionsIterators: AsyncGenerator<RabbiInfoWithDifficulty, void>) {
  return async () => {
    const { value, done } = await questionsIterators.next();
    if (done || !value) {
      return null;
    }
    const question: IQuestion = {
      title: value.name,
      options: [
        { label: "תנא", value: "תנא" },
        { label: "אמורא", value: "אמורא" },
        { label: "ראשון", value: "ראשון" },
        { label: "אחרון", value: "אחרון" },
      ],
      correctIndex: value.type,
      difficultyLevel: value.difficultyLevel,
    };
    return question;
  };
}

export function useGetNextQuestions() {
  const [questionsIterators, setQuestionsIterators] = useState(() => getQuestsionIterators());

  const reset = useCallback(() => {
    setQuestionsIterators(getQuestsionIterators());
  }, []);

  const getNextQuestionCB = useCallback(
    () => getNextQuestion(questionsIterators),
    [questionsIterators]
  );

  return { getNextQuestion: getNextQuestionCB, reset };
}
