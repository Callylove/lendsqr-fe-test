import { FieldInputProps, FieldMetaProps } from "formik";

export type InputValue = string | number;

export type FormikFieldProps<T = InputValue> = FieldInputProps<T>;
export type FormikMetaProps<T = InputValue> = FieldMetaProps<T>;

export interface FormikInputProps {
  name: string;
  label?: string;
  type?: string;
  placeholder?: string;
  showPassword?: boolean;
  onFocusCallback?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlurCallback?: (e: React.FocusEvent<HTMLInputElement>) => void;
  className?: string;
  containerClassName?: string;
}

export interface HelperParams<T = InputValue> {
  isFocused: boolean;
  setIsFocused: React.Dispatch<React.SetStateAction<boolean>>;
  showPasswordToggle: boolean;
  setShowPasswordToggle: React.Dispatch<React.SetStateAction<boolean>>;
  field: FormikFieldProps<T>;
  meta: FormikMetaProps<T>; // Now using Formik's actual FieldMetaProps
  type: string;
  showPassword: boolean;
  className: string;
  containerClassName: string;
  onFocusCallback?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlurCallback?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

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
