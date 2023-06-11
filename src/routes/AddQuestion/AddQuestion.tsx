import useIsMobile from "~/hooks/useIsMobile";

export default function AddQuestion() {
  const isMobile = useIsMobile();
  // todo use useHook with validation
  const handleHideMobileMenu = () => {
    throw new Error("Not implemented");
  };
  const handleRemoveValidationFromFormField = (fieldNumber: number) => {
    throw new Error("Not implemented");
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    throw new Error("Not implemented");
  };
  return (
    <div className="all-site" onClick={handleHideMobileMenu}>
      <form
        className="flex flex-col items-center justify-start p-4"
        id="add-question-form"
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <h2>הוסף שאלה</h2>
        <div className={`flex items-center justify-around w-4/5 ${isMobile ? "flex-col" : ""}`}>
          <div className={`w-2/5 flex flex-col items-start ${isMobile ? "w-full" : ""}`}>
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
              defaultValue={-1}
              className="text-box"
              id="answer"
              onChange={() => handleRemoveValidationFromFormField(1)}
            >
              <option value="" disabled hidden>
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
              defaultValue={-1}
              className="text-box"
              id="level"
              onChange={() => handleRemoveValidationFromFormField(2)}
            >
              <option value="" disabled hidden>
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
