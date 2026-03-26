import { useGetFormsQuery } from "../../app/api.generated";
import { Link } from "react-router-dom";
import styles from "./Home.module.scss";

export const Home = () => {
  const { data, isLoading, error } = useGetFormsQuery();

  if (isLoading)
    return (
      <div className="__container" style={{ padding: "2rem 15px" }}>
        Loading forms...
      </div>
    );
  if (error)
    return (
      <div className="__container" style={{ padding: "2rem 15px" }}>
        An error occurred while loading
      </div>
    );

  const formsList = data?.forms || [];

  return (
    <div className="__container">
      <div className={styles.home}>
        <div className={styles.header}>
          <h1>My forms</h1>
          <Link to="/forms/new" className={styles.createBtn}>
            <span style={{ fontSize: "1.2rem", lineHeight: "1" }}>+</span>
            Create new form
          </Link>
        </div>

        <div className={styles.grid}>
          {formsList.map((form) => (
            <div key={form.id} className={styles.card}>
              <div className={styles.cardIconWrapper}>
                <div className={styles.cardIcon}>📄</div>
              </div>

              <div className={styles.cardInfo}>
                <h3>{form.title}</h3>
                <p>{form.description || "No description"}</p>
              </div>

              <div
                className={styles.cardActions}
                style={{
                  display: "flex",
                  gap: "10px",
                  padding: "15px",
                  borderTop: "1px solid #eee",
                }}
              >
                <Link
                  to={`/forms/${form.id}/fill`}
                  className={styles.fillBtn}
                  style={{
                    textDecoration: "none",
                    color: "#1a73e8",
                    fontWeight: "500",
                  }}
                >
                  Fill Form
                </Link>

                <Link
                  to={`/forms/${form.id}/responses`}
                  className={styles.responsesBtn}
                  style={{
                    textDecoration: "none",
                    color: "#673ab7",
                    fontWeight: "500",
                  }}
                >
                  Responses
                </Link>
              </div>
            </div>
          ))}

          {formsList.length === 0 && (
            <div className={styles.emptyState}>
              <p>You don't have any forms yet. Create your first form!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
