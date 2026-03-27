import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useGetFormByIdQuery,
  useSubmitResponseMutation,
} from "../app/api.generated";

export type AnswersState = Record<string, string | string[]>;

export const useFillForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data, isLoading, error } = useGetFormByIdQuery({ id: id! });
  const [submitResponse, { isLoading: isSubmitting }] =
    useSubmitResponseMutation();

  const [answers, setAnswers] = useState<AnswersState>({});

  const handleChange = (questionId: string, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleCheckboxChange = (
    questionId: string,
    optionValue: string,
    isChecked: boolean,
  ) => {
    setAnswers((prev) => {
      const currentSelected = (prev[questionId] as string[]) || [];

      let newSelected;
      if (isChecked) {
        newSelected = [...currentSelected, optionValue];
      } else {
        newSelected = currentSelected.filter((val) => val !== optionValue);
      }

      return {
        ...prev,
        [questionId]: newSelected,
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formattedAnswers = Object.entries(answers).map(
      ([questionId, value]) => ({
        questionId,
        value: Array.isArray(value) ? value.join(", ") : value,
      }),
    );

    try {
      await submitResponse({
        formId: id!,
        answers: formattedAnswers,
      }).unwrap();

      alert("Response submitted successfully!");
      navigate("/");
    } catch (err) {
      console.error("Failed to submit form:", err);
      alert("Failed to submit form.");
    }
  };

  return {
    data,
    isLoading,
    error,
    isSubmitting,
    answers,
    handleChange,
    handleCheckboxChange,
    handleSubmit,
  };
};
