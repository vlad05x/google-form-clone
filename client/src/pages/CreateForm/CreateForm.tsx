import styles from "./CreateForm.module.scss";
import { useCreateForm } from "../../hooks/useCreateForm";
import type { QuestionType } from "../../hooks/useCreateForm";

export const CreateForm = () => {
  const {
    formData,
    isLoading,
    handleSave,
    handleMetaChange,
    handleQuestionAdd,
    handleUpdateQuestion,
    handleAddOption,
    handleUpdateOption,
    handleRemoveOption,
  } = useCreateForm();

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.topBar}>
        <button
          onClick={handleSave}
          className={styles.saveBtn}
          disabled={isLoading}
        >
          {isLoading ? "Publishing..." : "Publish"}
        </button>
      </div>
      <div className="__container">
        <div className={styles.formHeader}>
          <input
            type="text"
            className={styles.titleInput}
            value={formData.title}
            onChange={(e) => handleMetaChange("title", e.target.value)}
            placeholder="Form Title"
          />

          <input
            type="text"
            className={styles.descInput}
            value={formData.description}
            onChange={(e) => handleMetaChange("description", e.target.value)}
            placeholder="Description"
          />
        </div>

        <div className={styles.questionsList}>
          {formData.questions.map((q, index) => (
            <div key={q.id} className={styles.questionCard}>
              <div className={styles.questionCardHeader}>
                <input
                  type="text"
                  className={styles.questionInput}
                  value={q.text}
                  onChange={(e) =>
                    handleUpdateQuestion(q.id, "text", e.target.value)
                  }
                  placeholder={`Question ${index + 1}`}
                />

                <select
                  className={styles.typeSelect}
                  value={q.type}
                  onChange={(e) =>
                    handleUpdateQuestion(
                      q.id,
                      "type",
                      e.target.value as QuestionType,
                    )
                  }
                >
                  <option value="TEXT">Short Answer</option>
                  <option value="MULTIPLE_CHOICE">Multiple Choice</option>
                  <option value="CHECKBOXES">Checkboxes</option>
                  <option value="DATE">Date</option>
                </select>
              </div>

              {(q.type === "MULTIPLE_CHOICE" || q.type === "CHECKBOXES") && (
                <div className={styles.optionsList}>
                  {q.options.map((opt, optIndex) => (
                    <div key={optIndex} className={styles.optionItem}>
                      <input
                        type={
                          q.type === "MULTIPLE_CHOICE" ? "radio" : "checkbox"
                        }
                        className={styles.optionMarker}
                        name={
                          q.type === "MULTIPLE_CHOICE"
                            ? `question-${q.id}`
                            : undefined
                        }
                        onClick={(e) => e.stopPropagation()}
                      />
                      <input
                        type="text"
                        value={opt}
                        onChange={(e) =>
                          handleUpdateOption(q.id, optIndex, e.target.value)
                        }
                        className={styles.optionInput}
                      />
                      <button
                        className={styles.removeOptionBtn}
                        onClick={() => handleRemoveOption(q.id, optIndex)}
                        title="Remove option"
                      >
                        &times;
                      </button>
                    </div>
                  ))}

                  <button
                    onClick={() => handleAddOption(q.id)}
                    className={styles.addOptionBtn}
                  >
                    Add Option
                  </button>
                </div>
              )}

              {q.type === "TEXT" && (
                <div className={styles.placeholderText}>Short answer</div>
              )}
              {q.type === "DATE" && (
                <input type="date" className={styles.datePlaceholder} />
              )}
            </div>
          ))}
        </div>

        <button onClick={handleQuestionAdd} className={styles.addBtn}>
          + Add question
        </button>
      </div>
    </div>
  );
};
