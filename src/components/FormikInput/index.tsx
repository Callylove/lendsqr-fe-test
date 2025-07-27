import React, { useState } from "react";
import { useField } from "formik";
import styles from "./FormikInput.module.scss";
import { FormikInputProps } from "./types";
import { useFormikInputHelpers } from "./utils";

const FormikInput: React.FC<FormikInputProps> = ({
  label,
  type = "text",
  placeholder,
  showPassword = false,
  onFocusCallback,
  onBlurCallback,
  className = "",
  containerClassName = "",
  ...props
}) => {
  const [field] = useField(props.name);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [showPasswordToggle, setShowPasswordToggle] = useState<boolean>(false);

  const {
    hasError,
    errorMessage,
    handleFocus,
    handleBlur,
    togglePasswordVisibility,
    inputType,
    inputClasses,
    labelClasses,
    containerClasses,
  } = useFormikInputHelpers({
    isFocused,
    setIsFocused,
    showPasswordToggle,
    setShowPasswordToggle,
    field,
    type,
    showPassword,
    className,
    containerClassName,
    onFocusCallback,
    onBlurCallback,
  });

  return (
    <div className={containerClasses}>
      {label && (
        <label htmlFor={props.name} className={labelClasses}>
          {label}
        </label>
      )}

      <div className={styles.inputWrapper}>
        <input
          {...field}
          {...props}
          id={props.name}
          type={inputType}
          placeholder={placeholder}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={inputClasses}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${props.name}-error` : undefined}
        />

        {type === "password" && showPassword && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className={styles.passwordToggle}
            tabIndex={-1}
            aria-label={showPasswordToggle ? "Hide password" : "Show password"}
          >
            {showPasswordToggle ? "HIDE" : "SHOW"}
          </button>
        )}
      </div>

      {hasError && errorMessage && (
        <div
          id={`${props.name}-error`}
          className={styles.errorMessage}
          role="alert"
          aria-live="polite"
        >
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default FormikInput;
