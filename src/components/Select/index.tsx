"use client";

import React, { useState } from "react";
import styles from "../../styles/Select.module.scss";
import { SelectProps } from "./types";

export const Select: React.FC<SelectProps> = ({
  label,
  placeholder = "Select...",
  value,
  onChange,
  options,
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

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  const selectClasses = `${styles.filterSelect} ${isFocused ? styles.focused : ""} ${className}`;
  const labelClasses = `${styles.filterLabel} ${isFocused || value ? styles.active : ""}`;
  const containerClasses = `${styles.filterSelectContainer} ${containerClassName}`;

  return (
    <div className={containerClasses}>
      {label && (
        <label htmlFor={name} className={labelClasses}>
          {label}
        </label>
      )}

      <div className={styles.selectWrapper}>
        <select
          {...props}
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={selectClasses}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
