import styles from "./FillForm.module.scss";
import { useFillForm } from "../../hooks/useFillForm";

export const FillForm = () => {
  const {
    data,
    isLoading,
    error,
    isSubmitting,
    answers,
    handleChange,
    handleCheckboxChange,
    handleSubmit,
  } = useFillForm();

  if (isLoading) return (
    <div className={styles.pageWrapper}>
      <div className={styles.formContainer}>
        Loading form...
      </div>
    </div>
  );

  if (error || !data?.form) return (
    <div className={styles.pageWrapper}>
      <div className={styles.formContainer}>
        Error or form not found.
      </div>
    </div>
  );

  const form = data.form;

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.formContainer}>
        <div className={styles.formHeader}>
          <h1>{form.title}</h1>
          {form.description && <p>{form.description}</p>}
        </div>

        <form onSubmit={handleSubmit}>
          <div className={styles.questionsList}>
            {form.questions.map((q, index) => (
              <div key={q.id} className={styles.questionCard}>
                <h3>
                  {index + 1}. {q.text}
                </h3>

                <div className={styles.answerArea}>
                  {q.type === "TEXT" && (
                    <input
                      type="text"
                      className={styles.textInput}
                      placeholder="Your answer"
                      value={(answers[q.id] as string) || ""}
                      onChange={(e) => handleChange(q.id, e.target.value)}
                      required
                    />
                  )}

                  {q.type === "DATE" && (
                    <input
                      type="date"
                      className={styles.dateInput}
                      value={(answers[q.id] as string) || ""}
                      onChange={(e) => handleChange(q.id, e.target.value)}
                      required
                    />
                  )}

                  {q.type === "MULTIPLE_CHOICE" && (
                    <div className={styles.optionsGroup}>
                      {q.options?.map((opt, i) => (
                        <label key={i} className={styles.radioLabel}>
                          <input
                            type="radio"
                            name={`question_${q.id}`}
                            value={opt}
                            checked={answers[q.id] === opt}
                            onChange={(e) => handleChange(q.id, e.target.value)}
                            required
                          />
                          {opt}
                        </label>
                      ))}
                    </div>
                  )}

                  {q.type === "CHECKBOXES" && (
                    <div className={styles.optionsGroup}>
                      {q.options?.map((opt, i) => {
                        const isChecked = (
                          (answers[q.id] as string[]) || []
                        ).includes(opt);

                        return (
                          <label key={i} className={styles.checkboxLabel}>
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={(e) =>
                                handleCheckboxChange(q.id, opt, e.target.checked)
                              }
                            />
                            {opt}
                          </label>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <button
            type="submit"
            className={styles.submitBtn}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};
