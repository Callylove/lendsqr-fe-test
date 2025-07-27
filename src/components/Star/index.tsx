import React from "react";
import { StarProps, StarRatingProps } from "./types";
import { useStarHelpers, useStarRatingHelpers } from "./utils";

const Star: React.FC<StarProps> = ({
  filled = false,
  size = "md",
  color = "default",
  className = "",
  "data-testid": dataTestId,
  onClick,
  ...restProps
}) => {
  const { commonProps } = useStarHelpers(
    filled,
    size,
    color,
    className,
    dataTestId,
  );

  // Handle click events with proper typing
  const handleClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    onClick?.(e);
  };

  const clickProps = onClick
    ? {
        onClick: handleClick,
        role: "button",
        tabIndex: 0,
        style: { cursor: "pointer" },
      }
    : {};

  return (
    <span {...commonProps} {...clickProps} {...restProps}>
      ★
    </span>
  );
};

export const StarRating: React.FC<StarRatingProps> = ({
  rating,
  totalStars = 5,
  size = "md",
  color = "default",
  interactive = false,
  className = "",
  "data-testid": dataTestId,
  onRatingChange,
  ...restProps
}) => {
  const { starRatingClasses } = useStarRatingHelpers(className);

  const handleStarClick = (starIndex: number) => {
    if (interactive && onRatingChange) {
      onRatingChange(starIndex + 1);
    }
  };

  return (
    <div className={starRatingClasses} data-testid={dataTestId} {...restProps}>
      {Array.from({ length: totalStars }, (_, index) => (
        <Star
          key={index}
          filled={index < rating}
          size={size}
          color={color}
          onClick={interactive ? () => handleStarClick(index) : undefined}
        />
      ))}
    </div>
  );
};

export default Star;
