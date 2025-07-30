import React from "react";
import { BadgeProps } from "./types";

const Badge: React.FC<BadgeProps> = ({
  size = "md",
  className = "",
  status,
  ...restProps
}) => {
  const baseClasses =
    "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";

  const sizeClasses = {
    sm: "text-xs px-2 py-1",
    md: "text-sm px-2.5 py-1.5",
    lg: "text-base px-3 py-2",
  };

  const classes = `${baseClasses}  ${sizeClasses[size]} ${className}`;

  return (
    <span className={classes} {...restProps}>
      {status}
    </span>
  );
};

export default Badge;
