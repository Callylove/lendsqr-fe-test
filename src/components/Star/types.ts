import React from "react";

export interface StarProps {
  filled?: boolean;
  size?: "sm" | "md" | "lg";
  color?: "default" | "warning" | "primary" | "secondary";
  className?: string;
  "data-testid"?: string;
  onClick?: (e: React.MouseEvent<HTMLSpanElement>) => void;
}

export interface StarRatingProps {
  rating: number;
  totalStars?: number;
  size?: "sm" | "md" | "lg";
  color?: "default" | "warning" | "primary" | "secondary";
  interactive?: boolean;
  className?: string;
  "data-testid"?: string;
  onRatingChange?: (rating: number) => void;
}
