import styles from "../../styles/Card.module.scss";

// Generate card classes
export const getCardClasses = (
  variant: string,
  size: string,
  className: string,
): string => {
  const classes: string[] = [
    styles.card,
    styles[variant],
    styles[size],
    className,
  ];

  return classes.filter(Boolean).join(" ");
};

// Generate common props
export const getCommonProps = (
  cardClasses: string,
  dataTestId?: string,
): { className: string; "data-testid"?: string } => {
  const props: { className: string; "data-testid"?: string } = {
    className: cardClasses,
  };

  if (dataTestId) {
    props["data-testid"] = dataTestId;
  }

  return props;
};

// Generate card header classes
export const getCardHeaderClasses = (className: string): string => {
  const classes: string[] = [styles.cardHeader, className];

  return classes.filter(Boolean).join(" ");
};

// Generate card body classes
export const getCardBodyClasses = (className: string): string => {
  const classes: string[] = [styles.cardBody, className];

  return classes.filter(Boolean).join(" ");
};

// Generate card footer classes
export const getCardFooterClasses = (className: string): string => {
  const classes: string[] = [styles.cardFooter, className];

  return classes.filter(Boolean).join(" ");
};

// All-in-one helper function for card
export const useCardHelpers = (
  variant: string,
  size: string,
  className: string,
  dataTestId?: string,
) => {
  const cardClasses = getCardClasses(variant, size, className);
  const commonProps = getCommonProps(cardClasses, dataTestId);

  return {
    cardClasses,
    commonProps,
  };
};
