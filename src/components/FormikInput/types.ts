import React from "react";

// Generic type for form values
export type FormValues = Record<string, unknown>;

// Input value types that Formik commonly handles
export type InputValue = string | number | boolean | Date | null | undefined;

export interface FormikInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "onChange" | "onBlur" | "value" | "name"
  > {
  name: string;
  label?: string;
  type?:
    | "text"
    | "email"
    | "password"
    | "number"
    | "tel"
    | "url"
    | "search"
    | "date"
    | "time"
    | "datetime-local";
  placeholder?: string;
  showPassword?: boolean;
  onFocusCallback?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlurCallback?: (e: React.FocusEvent<HTMLInputElement>) => void;
  className?: string;
  containerClassName?: string;
  disabled?: boolean;
  autoComplete?: string;
  autoFocus?: boolean;
  required?: boolean;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  id?: string;
  "aria-label"?: string;
  "aria-describedby"?: string;
  value?: InputValue;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

export interface ValidationState {
  hasError: boolean;
  isValid: boolean;
  errorMessage?: string;
  isTouched?: boolean;
  isDirty?: boolean;
  isEmpty?: boolean;
}

export interface InputHelpers {
  hasError: boolean;
  isValid: boolean;
  handleFocus: (e: React.FocusEvent<HTMLInputElement>) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  togglePasswordVisibility: () => void;
  inputType: string;
  inputClasses: string;
  labelClasses: string;
  containerClasses: string;
}

export type InputSize = "small" | "medium" | "large";
export type InputVariant = "default" | "filled" | "outlined";
export type InputStatus = "default" | "error" | "success" | "warning";

export interface FormikFieldProps<T = InputValue> {
  name: string;
  value: T;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
}

export interface FormikMetaProps<T = InputValue> {
  value: T;
  error?: string | undefined;
  touched: boolean;
  initialError?: string | undefined;
  initialTouched: boolean;
  initialValue: T;
}

export interface FormikHelpers<T = InputValue> {
  setValue: (value: T, shouldValidate?: boolean) => void;
  setTouched: (touched: boolean, shouldValidate?: boolean) => void;
  setError: (error: string | undefined) => void;
}

export interface HelperParams<T = InputValue> {
  isFocused: boolean;
  setIsFocused: React.Dispatch<React.SetStateAction<boolean>>;
  showPasswordToggle: boolean;
  setShowPasswordToggle: React.Dispatch<React.SetStateAction<boolean>>;
  field: FormikFieldProps<T>;
  meta?: FormikMetaProps<T>;
  type: string;
  showPassword: boolean;
  className: string;
  containerClassName: string;
  onFocusCallback?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlurCallback?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

// Type for the return value of useFormikInputHelpers
export interface FormikInputHelpersReturn {
  hasError: boolean;
  isValid: boolean;
  handleFocus: (e: React.FocusEvent<HTMLInputElement>) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  togglePasswordVisibility: () => void;
  inputType: string;
  inputClasses: string;
  labelClasses: string;
  containerClasses: string;
  errorMessage: string;
}
