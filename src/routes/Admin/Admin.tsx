import useUser from "~/hooks/useUser";
import Login from "./Login";
import { LoadingSpinnerModal } from "~/hooks/useLoadingSpinner";

export default function Admin() {
  const { user, isAdmin, isLoadingUser } = useUser();
  const handleAddQuestionToDB = (answer: number) => {
    throw new Error("Not implemented");
  };
  console.log("rendering admin");

  if (isLoadingUser) return <LoadingSpinnerModal />;
  if (!user || !isAdmin) return <Login />;
  return (
    <div>
      <div className="m-8">
        <h2 id="q"></h2>
        <h2 id="answer"></h2>
        <h2 id="diff"></h2>
        <button className="btn" onClick={() => handleAddQuestionToDB(0)}>
          אשר
        </button>
        <button className="btn" onClick={() => handleAddQuestionToDB(1)}>
          דחה
        </button>
        <button className="btn" onClick={() => handleAddQuestionToDB(2)}>
          תשאיר למחר
        </button>
        <a id="google" target="_blank">
          חפש בגוגל
        </a>
      </div>

      <p id="enters"></p>
    </div>
  );
}
