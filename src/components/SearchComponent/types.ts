export type SearchSize = "sm" | "md" | "lg";

export interface SearchComponentProps {
  placeholder?: string;
  onSearch?: (value: string) => void;
  className?: string;
  size?: SearchSize;
}
