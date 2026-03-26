import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateFormMutation } from "../../app/api.generated";
import styles from "./CreateForm.module.scss";

export type QuestionType = "TEXT" | "MULTIPLE_CHOICE" | "CHECKBOXES" | "DATE";

export interface IQuestion {
  id: string;
  type: QuestionType;
  text: string;
  options: string[];
}

export interface IForm {
  id: string;
  title: string;
  description: string;
  questions: IQuestion[];
}

const generateId = () => Math.random().toString(36).substring(2, 9);

export const CreateForm = () => {
  const navigate = useNavigate();
  const [createForm, { isLoading }] = useCreateFormMutation();
  const [formData, setFormData] = useState<IForm>({
    id: generateId(),
    title: "Untitled Form",
    description: "",
    questions: [],
  });

  const handleSave = async () => {
    if (!formData.title.trim()) {
      alert("Please enter a form title");
      return;
    }

    try {
      await createForm({
        title: formData.title,
        description: formData.description,
        questions: formData.questions.map(({ id, ...q }) => ({
          ...q,
          options: q.options.length > 0 ? q.options : null,
        })),
      }).unwrap();

      navigate("/");
    } catch (error) {
      console.error("Failed to create form:", error);
      alert("Failed to create form");
    }
  };

  const handleMetaChange = (field: "title" | "description", value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleQuestionAdd = () => {
    const newQuestion: IQuestion = {
      id: generateId(),
      type: "TEXT",
      text: "",
      options: [],
    };

    setFormData((prev) => ({
      ...prev,
      questions: [...prev.questions, newQuestion],
    }));
  };

  const handleUpdateQuestion = (
    id: string,
    field: "text" | "type",
    value: string | QuestionType,
  ) => {
    setFormData((prev) => ({
      ...prev,
      questions: prev.questions.map((q) =>
        q.id === id ? { ...q, [field]: value } : q,
      ),
    }));
  };

  const handleAddOption = (questionId: string) => {
    setFormData((prev) => ({
      ...prev,
      questions: prev.questions.map((q) => {
        if (q.id === questionId) {
          return {
            ...q,
            options: [...q.options, `Option ${q.options.length + 1}`],
          };
        }
        return q;
      }),
    }));
  };

  const handleUpdateOption = (
    questionId: string,
    optionIndex: number,
    newValue: string,
  ) => {
    setFormData((prev) => ({
      ...prev,
      questions: prev.questions.map((q) => {
        if (q.id === questionId) {
          const newOptions = [...q.options];
          newOptions[optionIndex] = newValue;
          return { ...q, options: newOptions };
        }
        return q;
      }),
    }));
  };

  const handleRemoveOption = (questionId: string, optionIndex: number) => {
    setFormData((prev) => ({
      ...prev,
      questions: prev.questions.map((q) => {
        if (q.id === questionId) {
          return {
            ...q,
            options: q.options.filter((_, i) => i !== optionIndex),
          };
        }
        return q;
      }),
    }));
  };

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
