import { convertDifficultyLevelToHebrew, IRabbiType, RabbiTypeKeys } from "~/types/types";
import useTitle from "~/hooks/useTitle";
import "./Questioneer.scss";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { getRecordPosition, isRecordInTopRank } from "~/firebase/lib/records";
import { useMachine } from "@xstate/react";
import { quizMachine } from "./quiz-machine/quiz-machine";
import { useGetNextQuestions } from "./useGetNextQuestions";
import { getFormatedTime } from "./quiz-machine/utils";
import { NUMBER_OF_QUESTIONS_TOTAL } from "~/config";
import { Link, useLocation } from "react-router-dom";
import { useGlobalLoadingSpinner } from "~/hooks/useLoadingSpinner";

const IMachineHookCB = () => useMachine(quizMachine);
type IMachineContext = ReturnType<typeof IMachineHookCB>;
const MachineContext = createContext<IMachineContext>([] as unknown as IMachineContext);

export default function Questioneer() {
  const { from = null } = useLocation().state || {};

  const { open: openLoadingSpinner, close: closeLoadingSpinner } = useGlobalLoadingSpinner();
  const onLoadingQuestion = () => () => {
    openLoadingSpinner();
    return () => {
      closeLoadingSpinner();
    };
  };
  const { getNextQuestion, reset: resetQuestionsIters } = useGetNextQuestions();
  const [state, send, service] = useMachine(quizMachine, {
    services: {
      getNextQuestion,
      onLoadingQuestion,
      invalidatQuestions: async () => resetQuestionsIters(),
    },
  });

  const initState = state.matches("init");
  const endState = state.matches("end");
  const runningState = state.matches("question") || state.matches("feedback");

  return (
    <MachineContext.Provider value={[state, send, service]}>
      <div className="game-page-container">
        {initState && <HeaderStartGame />}
        {runningState && <GameFlow />}
        {endState && <EndGame />}
      </div>
    </MachineContext.Provider>
  );
}

function GameFlow() {
  const [state, send] = useContext(MachineContext);

  const { currentQuestion: question, elapsedTime, questionNumber, answeredIndex } = state.context;
  if (question === null) {
    return <>Error Question is Null. Should Go To End Of The Game.</>;
  }

  const handleCheckAnswer = (rabbiType: IRabbiType | string) => {
    if (!RabbiTypeKeys.includes(rabbiType as any)) {
      throw new Error(`Invalid Rabbi Type: ${rabbiType}`);
    }
    if (!state.matches("question")) return;
    const index = question.options.findIndex((option) => option.value === rabbiType);
    if (index === -1) {
      const options = question.options.map((o) => o.value);
      throw new Error(`Answer not found: ${rabbiType} in ${options.join(",")}`);
    }
    send({ type: "ANSWER", answerIndex: index });
  };

  const difficultyHebrewFormat = convertDifficultyLevelToHebrew(question.difficultyLevel);

  const answeredStyles = (index: number) => {
    if (!state.matches("feedback") || answeredIndex === null) return "";
    if (index === question.correctIndex) return "correct-answer";

    return answeredIndex === index ? "wrong-answer" : "";
  };
  const optionsDisabled = !state.matches("question");
  return (
    <div className="game-container">
      <h3 className="font-bold text-lg self-center">{`רמת קושי: ${difficultyHebrewFormat}`}</h3>
      <h3 className="font-bold text-lg self-center">{question.title}</h3>
      <div className="answer-btn-group">
        {question.options.map((option, index) => (
          <button
            key={option.value}
            className={`answer-btn ${answeredStyles(index)}`}
            onClick={() => handleCheckAnswer(option.value)}
            disabled={optionsDisabled}
          >
            {option.label}
          </button>
        ))}
      </div>
      <p>{getFormatedTime(elapsedTime)}</p>
      <p>
        שאלה {questionNumber} מתוך {NUMBER_OF_QUESTIONS_TOTAL}
      </p>
      {state.matches("feedback") && <FeedBack />}
    </div>
  );
}
function FeedBack() {
  const [state, send] = useContext(MachineContext);
  const { currentQuestion: question, score, answeredCorrectly } = state.context;
  const nextQuestionBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (nextQuestionBtnRef.current) {
      nextQuestionBtnRef.current.focus();
    }
  }, [nextQuestionBtnRef]);

  return (
    <div className="game-footer" id="game-footer">
      <div className="game-footer-top">
        <span className="after-answer-text"></span>
        <button onClick={() => send("NEXT")} className="btn" ref={nextQuestionBtnRef}>
          לשאלה הבאה
        </button>
      </div>
      <div className="game-footer-bottom">
        <span id="smaller-score">ניקוד: {score}</span>
        {!answeredCorrectly && (
          <a href={`https://google.com/search?q=${question?.title}`} target="_blank">
            תלמד עליו קצת
          </a>
        )}
      </div>
    </div>
  );
}
function EndGame() {
  const [state] = useContext(MachineContext);
  const [recordLocation, setRecordLocation] = useState("");
  const score = state.context.score;

  useEffect(() => {
    if (recordLocation !== "") return;
    getRecordPosition(score).then((location) => {
      setRecordLocation(location);
    });
  }, []);

  return (
    <div className="mt-12 w-3/5 text-center" id="end-game-container">
      <p>הניקוד שלך הוא: {score}</p>
      <p>המיקום שלך בציבור הוא: {recordLocation} שכוייח!</p>
      <RegisterRecord score={score} />
      <EndGameLinks />
    </div>
  );
}
function EndGameLinks() {
  const [, send] = useContext(MachineContext);

  return (
    <div className="game-page-container">
      <button onClick={() => send("RESET")} className="btn">
        משחק חוזר
      </button>
      <p>(השאלות נבחרות רנדומלית מתוך מאגר גדול)</p>
      <Link to="/add-question" className="btn">
        להוספת שאלה למאגר השאלות
      </Link>
      <Link to="/records" className="btn">
        לרשימת השיאים
      </Link>
    </div>
  );
}
function RegisterRecord({ score }: { score: number }) {
  const [isInTopRank, setIsInTopRank] = useState(false);

  const handleAddRecord = () => {
    throw new Error("Not implemented");
  };
  useEffect(() => {
    isRecordInTopRank(score).then((isTopRank) => {
      if (isTopRank) {
        setIsInTopRank(isTopRank);
      }
    });
  }, [score]);

  if (!isInTopRank) return null;

  return (
    <div
      id="enter-record"
      className="game-page-container"
      style={{
        display: "none",
      }}
    >
      <label>כתוב את שמך בשביל לרשום את השיא בטבלה:</label>
      <input id="name" className="text-box" /> <div className="error-place"></div>
      <button className="btn" onClick={handleAddRecord}>
        הוסף שיא
      </button>
      <br />
    </div>
  );
}

function HeaderStartGame() {
  const [state, send] = useContext(MachineContext);
  const { title, subtitle } = useTitle();

  return (
    <div className="start-container m-12 text-center">
      <h2>
        {title} - {subtitle}
      </h2>
      <p>לפניכם שעשועון שמטרתו להכיר יותר את חכמינו ז"ל.</p>
      <p>בכל שאלה יהיה שם של חכם ואתם תצטרכו לדעת מאיזה דור הוא.</p>
      <p>יש שלוש רמות קושי - קל, בינוני, כבד.</p>
      <p>בכל דרגת קושי יהיו 6 שאלות, בסה"כ 18 שאלות.</p>
      <p>השעשועון על זמן, ויש ניקוד לפי הזמן.</p> <p>בהצלחה !</p>
      <button onClick={() => send("START")} className="btn">
        התחל משחק
      </button>
    </div>
  );
}
