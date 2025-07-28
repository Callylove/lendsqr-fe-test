"use client";

import React, { useState } from "react";
import { Search, X } from "lucide-react";

import styles from "../../styles/SearchComponent.module.scss";
import { SearchComponentProps } from "./types";
import { handleClear, handleInputChange, handleKeyPress } from "./utils";

const SearchComponent: React.FC<SearchComponentProps> = ({
  placeholder = "Search for anything",
  onSearch,
  className = "",
  size = "md",
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const getSizeClass = (): string => {
    const sizeMap = {
      sm: styles.small,
      md: styles.medium,
      lg: styles.large,
    };
    return sizeMap[size];
  };

  const handleInputChangeInternal = (
    e: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const newValue = e.target.value;
    handleInputChange(newValue, setSearchTerm, onSearch);
  };

  const handleKeyPressInternal = (
    e: React.KeyboardEvent<HTMLInputElement>,
  ): void => {
    handleKeyPress(e, searchTerm, onSearch);
  };

  const handleClearInternal = (): void => {
    handleClear(setSearchTerm, onSearch);
  };

  return (
    <div className={`${styles.searchContainer} ${className}`}>
      <div className={`${styles.searchWrapper} ${getSizeClass()}`}>
        <Search className={styles.searchIcon} />
        <input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={handleInputChangeInternal}
          onKeyUp={handleKeyPressInternal}
          className={styles.searchInput}
        />
        {searchTerm && (
          <button
            type="button"
            onClick={handleClearInternal}
            className={styles.clearButton}
          >
            <X className={styles.clearIcon} />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchComponent;
