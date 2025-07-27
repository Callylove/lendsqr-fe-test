import React from "react";
import styles from "../../styles/Card.module.scss";
import {
  CardProps,
  CardHeaderProps,
  CardBodyProps,
  CardFooterProps,
} from "./types";
import {
  useCardHelpers,
  getCardHeaderClasses,
  getCardBodyClasses,
  getCardFooterClasses,
} from "./utils";

const Card: React.FC<CardProps> = ({
  children,
  variant = "default",
  size = "md",
  className = "",
  "data-testid": dataTestId,
  onClick,
  ...restProps
}) => {
  const { commonProps } = useCardHelpers(variant, size, className, dataTestId);

  // Handle click events with proper typing
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
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
    <div {...commonProps} {...clickProps} {...restProps}>
      {children}
    </div>
  );
};

export const CardHeader: React.FC<CardHeaderProps> = ({
  children,
  className = "",
  icon,
  ...restProps
}) => {
  const headerClasses = getCardHeaderClasses(className);

  return (
    <div className={headerClasses} {...restProps}>
      {icon && <div className={styles.cardIcon}>{icon}</div>}
      <div className={styles.cardHeaderContent}>{children}</div>
    </div>
  );
};

export const CardBody: React.FC<CardBodyProps> = ({
  children,
  className = "",
  ...restProps
}) => {
  const bodyClasses = getCardBodyClasses(className);

  return (
    <div className={bodyClasses} {...restProps}>
      {children}
    </div>
  );
};

export const CardFooter: React.FC<CardFooterProps> = ({
  children,
  className = "",
  ...restProps
}) => {
  const footerClasses = getCardFooterClasses(className);

  return (
    <div className={footerClasses} {...restProps}>
      {children}
    </div>
  );
};

export default Card;
