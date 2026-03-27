import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateFormMutation } from "../app/api.generated";

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

export const useCreateForm = () => {
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

  return {
    formData,
    isLoading,
    handleSave,
    handleMetaChange,
    handleQuestionAdd,
    handleUpdateQuestion,
    handleAddOption,
    handleUpdateOption,
    handleRemoveOption,
  };
};
