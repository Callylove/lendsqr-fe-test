export interface InputProps {
  label?: string;
  type?: "text" | "email" | "tel" | "date" | "password";
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  containerClassName?: string;
  name: string;
}
