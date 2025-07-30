"use client";

import React, { useState } from "react";
import styles from "../../styles/Input.module.scss";
import { InputProps } from "./types";

export const Input: React.FC<InputProps> = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  className = "",
  containerClassName = "",
  name,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const inputClasses = `${styles.filterInput} ${isFocused ? styles.focused : ""} ${className}`;
  const labelClasses = `${styles.filterLabel} ${isFocused || value ? styles.active : ""}`;
  const containerClasses = `${styles.filterInputContainer} ${containerClassName}`;

  return (
    <div className={containerClasses}>
      {label && (
        <label htmlFor={name} className={labelClasses}>
          {label}
        </label>
      )}

      <div className={styles.inputWrapper}>
        <input
          {...props}
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={inputClasses}
        />
      </div>
    </div>
  );
};
