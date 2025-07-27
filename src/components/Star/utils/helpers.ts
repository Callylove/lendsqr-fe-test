import styles from "../../styles/Star.module.scss";

// Generate star classes
export const getStarClasses = (
  filled: boolean,
  size: string,
  color: string,
  className: string,
): string => {
  const classes: string[] = [
    styles.star,
    filled ? styles.filled : styles.empty,
    styles[size],
    styles[color],
    className,
  ];

  return classes.filter(Boolean).join(" ");
};

// Generate common props
export const getCommonProps = (
  starClasses: string,
  dataTestId?: string,
): { className: string; "data-testid"?: string } => {
  const props: { className: string; "data-testid"?: string } = {
    className: starClasses,
  };

  if (dataTestId) {
    props["data-testid"] = dataTestId;
  }

  return props;
};

// Generate star rating classes
export const getStarRatingClasses = (className: string): string => {
  const classes: string[] = [styles.starRating, className];

  return classes.filter(Boolean).join(" ");
};

// All-in-one helper function for single star
export const useStarHelpers = (
  filled: boolean,
  size: string,
  color: string,
  className: string,
  dataTestId?: string,
) => {
  const starClasses = getStarClasses(filled, size, color, className);
  const commonProps = getCommonProps(starClasses, dataTestId);

  return {
    starClasses,
    commonProps,
  };
};

// Helper function for star rating
export const useStarRatingHelpers = (className: string) => {
  const starRatingClasses = getStarRatingClasses(className);

  return {
    starRatingClasses,
  };
};
