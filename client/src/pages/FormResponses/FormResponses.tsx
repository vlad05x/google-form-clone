import { useParams, Link } from "react-router-dom";
import {
  useGetFormByIdQuery,
  useGetResponsesQuery,
} from "../../app/api.generated";
import styles from "./FormResponses.module.scss";

export const FormResponses = () => {
  const { id } = useParams<{ id: string }>();

  const { data: formData, isLoading: isFormLoading } = useGetFormByIdQuery({
    id: id!,
  });

  const { data: responsesData, isLoading: isResponsesLoading } =
    useGetResponsesQuery({ formId: id! });

  if (isFormLoading || isResponsesLoading) {
    return (
      <div className={styles.pageWrapper}>
        <div className={styles.formContainer}>Loading responses...</div>
      </div>
    );
  }

  if (!formData?.form) {
    return (
      <div className={styles.pageWrapper}>
        <div className={styles.formContainer}>Form not found.</div>
      </div>
    );
  }

  const form = formData.form;
  const responses = responsesData?.responses || [];

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.formContainer}>
        <div className={styles.header}>
          <div>
            <h1>Responses: {form.title}</h1>
            <p>
              Total submissions: <strong>{responses.length}</strong>
            </p>
          </div>
          <Link to="/" className={styles.backBtn}>
            Back to Home
          </Link>
        </div>

        {responses.length === 0 ? (
          <div className={styles.emptyState}>
            <h3>No responses yet</h3>
            <p>Share the form link to start collecting responses.</p>
          </div>
        ) : (
          <div className={styles.responsesContainer}>
            {form.questions.map((question, index) => (
              <div key={question.id} className={styles.questionCard}>
                <h3 className={styles.questionTitle}>
                  {index + 1}. {question.text}
                </h3>

                <div className={styles.answersList}>
                  {responses.map((response) => {
                    const answer = response.answers.find(
                      (a) => a.questionId === question.id,
                    );

                    if (!answer?.value) return null;

                    return (
                      <div key={response.id} className={styles.answerItem}>
                        {answer.value}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};