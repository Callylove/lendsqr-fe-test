export interface ErrorProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  retryText?: string;
  icon?: React.ReactNode;
  className?: string;
}
