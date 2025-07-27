import React from "react";

export interface BadgeProps {
  children: React.ReactNode;
  variant?:
    | "active"
    | "inactive"
    | "blacklisted"
    | "success"
    | "warning"
    | "error"
    | "info";
  size?: "sm" | "md" | "lg";
  className?: string;
}
