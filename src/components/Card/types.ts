import React from "react";

export interface CardProps {
  children: React.ReactNode;
  variant?: "default" | "outlined" | "elevated" | "filled";
  size?: "sm" | "md" | "lg";
  className?: string;
  "data-testid"?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
}

export interface CardBodyProps {
  children: React.ReactNode;
  className?: string;
}

export interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}
