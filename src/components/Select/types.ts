export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  className?: string;
  containerClassName?: string;
  name: string;
}
