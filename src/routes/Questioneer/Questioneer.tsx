import { IRabbiType } from "~/types/types";
import useTitle from "~/hooks/useTitle";
import "./Questioneer.scss";
import { useEffect, useState } from "react";
import { isRecordInTopRank } from "~/firebase/lib/records";
import { atom, useAtom } from "jotai";

const scoreAtom = atom(0);

export default function Questioneer() {
  const [score] = useAtom(scoreAtom);

  const [startGame, setStartGame] = useState(false);
  const handleStartGame = () => {
    setStartGame(true);
  };

  return (
    <>
      <div className="game-page-container">
        {!startGame && <HeaderStartGame onStartGame={handleStartGame} />}
        {startGame && <GameFlow />}
        {!startGame && <EndGame />}
      </div>
    </>
  );
}
function GameFlow() {
  const handleCheckAnswer = (rabbiType: IRabbiType) => {
    throw new Error("Not implemented");
  };
  const handleGoToNextQuestion = () => {
    throw new Error("Not implemented");
  };
  return (
    <div id="game-container" hidden>
      <h3 id="level"></h3> <h3></h3>
      <div className="answer-btn-group">
        <button className="answer-btn" onClick={() => handleCheckAnswer("תנא")}>
          תנא
        </button>
        <button className="answer-btn" onClick={() => handleCheckAnswer("אמורא")}>
          אמורא
        </button>
        <button className="answer-btn" onClick={() => handleCheckAnswer("ראשון")}>
          ראשון
        </button>
        <button className="answer-btn" onClick={() => handleCheckAnswer("אחרון")}>
          אחרון
        </button>
      </div>
      <p id="time"></p>
      <p id="question-count"></p>
      <div className="game-footer" id="game-footer" hidden>
        <div className="game-footer-top">
          <span className="after-answer-text"></span>
          <button onClick={handleGoToNextQuestion} className="btn">
            לשאלה הבאה
          </button>
        </div>
        <div className="game-footer-bottom">
          <span id="smaller-score"></span>
          <a id="google" hidden>
            תלמד עליו קצת
          </a>
        </div>
      </div>
    </div>
  );
}

function EndGame() {
  const [score] = useAtom(scoreAtom);

  return (
    <div className="mt-12 w-3/5 text-center" id="end-game-container" hidden>
      <p>
        הניקוד שלך הוא: <span id="score"></span> <br /> המיקום שלך בציבור הוא:
        <span id="location"></span>
        שכוייח !
      </p>
      <RegisterRecord />
      <EndGameLinks />
    </div>
  );
}
function EndGameLinks() {
  const handleRestartGame = () => {
    throw new Error("Not implemented");
  };

  const handleNavigateToAddNewQuestion = () => {
    throw new Error("Not implemented");
  };

  const handleNavigateToRecordsPage = () => {
    throw new Error("Not implemented");
  };
  return (
    <div className="game-page-container">
      <button onClick={handleRestartGame} className="btn">
        משחק חוזר
      </button>
      <p>(השאלות נבחרות רנדומלית מתוך מאגר גדול)</p>
      <button onClick={handleNavigateToAddNewQuestion} className="btn">
        להוספת שאלה למאגר השאלות
      </button>
      <button onClick={handleNavigateToRecordsPage} className="btn">
        לרשימת השיאים
      </button>
    </div>
  );
}
function RegisterRecord() {
  const [score] = useAtom(scoreAtom);
  const [isInTopRank, setIsInTopRank] = useState(false);

  const handleAddRecord = () => {
    throw new Error("Not implemented");
  };
  useEffect(() => {
    async function checkTopRank() {
      const isTopRank = await isRecordInTopRank({ score });
      if (isTopRank) {
        setIsInTopRank(isTopRank);
      }
    }
    checkTopRank();
  }, [score]);
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

function HeaderStartGame({ onStartGame }: { onStartGame: () => void }) {
  const { title, subtitle } = useTitle();

  return (
    <div id="start-container" className="m-12 text-center">
      <h2>
        {title}- {subtitle}
      </h2>
      <p>לפניכם שעשועון שמטרתו להכיר יותר את חכמינו ז"ל.</p>
      <p>בכל שאלה יהיה שם של חכם ואתם תצטרכו לדעת מאיזה דור הוא.</p>
      <p>יש שלוש רמות קושי - קל, בינוני, כבד.</p>
      <p>בכל דרגת קושי יהיו 6 שאלות, בסה"כ 18 שאלות.</p>
      <p>השעשועון על זמן, ויש ניקוד לפי הזמן.</p> <p>בהצלחה !</p>
      <button onClick={onStartGame} className="btn">
        התחל משחק
      </button>
    </div>
  );
}
