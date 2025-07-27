import React from "react";
import { BadgeProps } from "./types";
import { useBadgeHelpers } from "./utils";

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "info",
  size = "md",
  className = "",
  ...restProps
}) => {
  const { commonProps } = useBadgeHelpers(variant, size, className);

  return (
    <span {...commonProps} {...restProps}>
      {children}
    </span>
  );
};

export default Badge;
