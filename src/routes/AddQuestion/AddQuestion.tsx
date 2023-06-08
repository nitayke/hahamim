export default function AddQuestion() {
  // todo use useHook with validation
  const handleHideMobileMenu = () => {
    throw new Error("Not implemented");
  };
  const handleRemoveValidationFromFormField = (fieldNumber: number) => {
    throw new Error("Not implemented");
  };
  return (
    <div className="all-site" onClick={handleHideMobileMenu}>
      <form className="add-question-form" id="add-question-form" autoComplete="off">
        <h2>הוסף שאלה</h2>
        <div className="main-form-container">
          <div className="box">
            <label>השאלה</label>
            <input
              id="q"
              className="text-box"
              onFocus={() => handleRemoveValidationFromFormField(0)}
              onChange={() => handleRemoveValidationFromFormField(0)}
            />
            <div className="error-place"></div>
            <label>מה התשובה?</label>
            <select
              className="text-box"
              id="answer"
              onChange={() => handleRemoveValidationFromFormField(1)}
            >
              <option value="" selected disabled hidden>
                בחר תשובה
              </option>
              <option value="0">תנא</option>
              <option value="1">אמורא</option>
              <option value="2">ראשון</option>
              <option value="3">אחרון</option>
            </select>
            <div className="error-place"></div>
            <label>דרגת קושי</label>
            <select
              className="text-box"
              id="level"
              onChange={() => handleRemoveValidationFromFormField(2)}
            >
              <option value="" selected disabled hidden>
                בחר דרגת קושי
              </option>
              <option value="0">קל</option>
              <option value="1">בינוני</option>
              <option value="2">כבד</option>
            </select>
            <div className="error-place"></div>
          </div>
        </div>

        <input type="submit" className="btn" value="הוסף שאלה" />
      </form>
    </div>
  );
}
