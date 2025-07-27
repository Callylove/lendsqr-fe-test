import React from "react";
import styles from "../../styles/Button.module.scss";

export const getButtonClasses = (
  variant: string,
  size: string,
  fullWidth: boolean,
  loading: boolean,
  className: string,
): string => {
  const classes: string[] = [
    styles.button,
    styles[variant],
    styles[size],
    fullWidth ? styles.fullWidth : "",
    loading ? styles.loading : "",
    className,
  ];

  return classes.filter(Boolean).join(" ");
};

// Create click handler with proper typing
export const createHandleClick = (
  disabled: boolean,
  loading: boolean,
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void,
): ((e: React.MouseEvent<HTMLElement>) => void) => {
  return (e: React.MouseEvent<HTMLElement>) => {
    if (disabled || loading) {
      e.preventDefault();
      return;
    }
    onClick?.(e as React.MouseEvent<HTMLButtonElement>);
  };
};

// Generate common props
export const getCommonProps = (
  buttonClasses: string,
  handleClick: (e: React.MouseEvent<HTMLElement>) => void,
  dataTestId?: string,
  disabled?: boolean,
  loading?: boolean,
) => {
  return {
    className: buttonClasses,
    onClick: handleClick,
    "data-testid": dataTestId,
    "aria-disabled": disabled || loading,
  };
};

// All-in-one helper function that returns everything needed
export const useButtonHelpers = (
  variant: string,
  size: string,
  fullWidth: boolean,
  loading: boolean,
  disabled: boolean,
  className: string,
  dataTestId?: string,
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void,
) => {
  const buttonClasses = getButtonClasses(
    variant,
    size,
    fullWidth,
    loading,
    className,
  );
  const handleClick = createHandleClick(disabled, loading, onClick);
  const commonProps = getCommonProps(
    buttonClasses,
    handleClick,
    dataTestId,
    disabled,
    loading,
  );

  return {
    buttonClasses,
    handleClick,
    commonProps,
  };
};
