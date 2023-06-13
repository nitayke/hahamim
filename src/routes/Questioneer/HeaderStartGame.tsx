import { useContext } from "react";
import useTitle from "~/hooks/useTitle";
import { MachineContext } from "./quiz-machine/machineContext";

export default function HeaderStartGame() {
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
