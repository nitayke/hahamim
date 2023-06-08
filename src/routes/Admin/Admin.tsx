export default function Admin() {
  const handleAddQuestionToDB = (answer: number) => {
    throw new Error("Not implemented");
  };
  return (
    <div>
      <div className="about-container">
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
