import React from "react";
import styles from "../../../styles/FormikInput.module.scss";
import {
  FormikFieldProps,
  FormikInputHelpersReturn,
  FormikMetaProps,
  HelperParams,
  InputValue,
} from "../types";

// Focus handler
export const createHandleFocus = (
  setIsFocused: React.Dispatch<React.SetStateAction<boolean>>,
  onFocusCallback?: (e: React.FocusEvent<HTMLInputElement>) => void,
): ((e: React.FocusEvent<HTMLInputElement>) => void) => {
  return (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    if (onFocusCallback) {
      onFocusCallback(e);
    }
  };
};

// Blur handler
export const createHandleBlur = <T = InputValue>(
  setIsFocused: React.Dispatch<React.SetStateAction<boolean>>,
  field: FormikFieldProps<T>,
  onBlurCallback?: (e: React.FocusEvent<HTMLInputElement>) => void,
): ((e: React.FocusEvent<HTMLInputElement>) => void) => {
  return (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    field.onBlur(e);
    if (onBlurCallback) {
      onBlurCallback(e);
    }
  };
};

// Password visibility toggle
export const createTogglePasswordVisibility = (
  setShowPasswordToggle: React.Dispatch<React.SetStateAction<boolean>>,
): (() => void) => {
  return () => {
    setShowPasswordToggle((prev) => !prev);
  };
};

// Get input type based on password visibility
export const getInputType = (
  type: string,
  showPassword: boolean,
  showPasswordToggle: boolean,
): string => {
  if (type === "password" && showPassword) {
    return showPasswordToggle ? "text" : "password";
  }
  return type;
};

// Generate input classes
export const getInputClasses = (
  className: string,
  isFocused: boolean,
  hasError: boolean,
  isValid: boolean,
): string => {
  const classes: string[] = [styles.inputField, className];

  if (isFocused) classes.push(styles.focused);
  if (hasError) classes.push(styles.error);
  if (isValid) classes.push(styles.valid);

  return classes.filter(Boolean).join(" ");
};

// Generate label classes
export const getLabelClasses = (
  isFocused: boolean,
  hasError: boolean,
): string => {
  const classes: string[] = [styles.inputLabel];

  if (isFocused) classes.push(styles.focused);
  if (hasError) classes.push(styles.error);

  return classes.filter(Boolean).join(" ");
};

// Generate container classes
export const getContainerClasses = (containerClassName: string): string => {
  return [styles.inputContainer, containerClassName].filter(Boolean).join(" ");
};

// Validation state helpers with proper typing
export const getValidationState = <T = InputValue>(
  meta?: FormikMetaProps<T>,
): { hasError: boolean; isValid: boolean } => {
  if (!meta) {
    return { hasError: false, isValid: false };
  }

  const hasError = Boolean(meta.touched && meta.error);
  const isValid = Boolean(meta.touched && !meta.error);

  return { hasError, isValid };
};

// Helper to get error message safely
export const getErrorMessage = <T = InputValue>(
  meta?: FormikMetaProps<T>,
): string => {
  if (!meta || !meta.touched || !meta.error || typeof meta.error !== "string") {
    return "";
  }
  return meta.error;
};

// Helper to check if field should show error styling
export const shouldShowError = <T = InputValue>(
  meta?: FormikMetaProps<T>,
): boolean => {
  if (!meta) return false;
  return Boolean(meta.touched && meta.error);
};

// Helper to check if field should show success styling
export const shouldShowSuccess = <T = InputValue>(
  meta?: FormikMetaProps<T>,
): boolean => {
  if (!meta) return false;
  return Boolean(meta.touched && !meta.error);
};

// All-in-one helper function that returns everything needed with proper typing
export const useFormikInputHelpers = <T = InputValue>(
  params: HelperParams<T>,
): FormikInputHelpersReturn => {
  const { hasError, isValid } = getValidationState(params.meta);

  const handleFocus = createHandleFocus(
    params.setIsFocused,
    params.onFocusCallback,
  );
  const handleBlur = createHandleBlur(
    params.setIsFocused,
    params.field,
    params.onBlurCallback,
  );
  const togglePasswordVisibility = createTogglePasswordVisibility(
    params.setShowPasswordToggle,
  );

  const inputType = getInputType(
    params.type,
    params.showPassword,
    params.showPasswordToggle,
  );
  const inputClasses = getInputClasses(
    params.className,
    params.isFocused,
    hasError,
    isValid,
  );
  const labelClasses = getLabelClasses(params.isFocused, hasError);
  const containerClasses = getContainerClasses(params.containerClassName);
  const errorMessage = getErrorMessage(params.meta);

  return {
    hasError,
    isValid,
    handleFocus,
    handleBlur,
    togglePasswordVisibility,
    inputType,
    inputClasses,
    labelClasses,
    containerClasses,
    errorMessage,
  };
};
