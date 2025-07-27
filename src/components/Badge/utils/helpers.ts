import styles from "../../styles/Badge.module.scss";

// Generate badge classes
export const getBadgeClasses = (
  variant: string,
  size: string,
  className: string,
): string => {
  const classes: string[] = [
    styles.badge,
    styles[variant],
    styles[size],
    className,
  ];

  return classes.filter(Boolean).join(" ");
};

// Generate common props
export const getCommonProps = (badgeClasses: string): { className: string } => {
  return {
    className: badgeClasses,
  };
};

// All-in-one helper function that returns everything needed
export const useBadgeHelpers = (
  variant: string,
  size: string,
  className: string,
) => {
  const badgeClasses = getBadgeClasses(variant, size, className);
  const commonProps = getCommonProps(badgeClasses);

  return {
    badgeClasses,
    commonProps,
  };
};
