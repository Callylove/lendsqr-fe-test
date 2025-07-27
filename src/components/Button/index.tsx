import React from "react";
import styles from "../../styles/Button.module.scss";
import { ButtonProps } from "./types";
import { useButtonHelpers } from "./utils";

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  type = "button",
  disabled = false,
  loading = false,
  fullWidth = false,
  className = "",
  loadingText,
  "data-testid": dataTestId,
  onClick,
  ...restProps
}) => {
  const { commonProps } = useButtonHelpers(
    variant,
    size,
    fullWidth,
    loading,
    disabled,
    className,
    dataTestId,
    onClick,
  );

  return (
    <button
      {...commonProps}
      {...restProps}
      type={type}
      disabled={disabled || loading}
    >
      {loading && (
        <>
          <span className={styles.loadingSpinner} aria-hidden="true" />
          {loadingText && (
            <span className={styles.loadingText}>{loadingText}</span>
          )}
        </>
      )}

      {!loading && children}
    </button>
  );
};
