import React from "react";
import styles from "../../styles/Error.module.scss";
import { ErrorProps } from "./types";

const Error: React.FC<ErrorProps> = ({
  title = "Something went wrong",
  message,
  onRetry,
  retryText = "Try again",
  icon,
  className = "",
}) => {
  const defaultIcon = (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
    </svg>
  );

  return (
    <div className={`${styles.errorContainer} ${className}`}>
      <div className={styles.errorState}>
        <div className={styles.errorIcon}>{icon || defaultIcon}</div>
        <h3 className={styles.errorTitle}>{title}</h3>
        <p className={styles.errorMessage}>{message}</p>
        {onRetry && (
          <button className={styles.retryButton} onClick={onRetry}>
            {retryText}
          </button>
        )}
      </div>
    </div>
  );
};

export default Error;
