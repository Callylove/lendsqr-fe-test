import React from "react";

import styles from "../../styles/FilterPanel.module.scss";
import { Button } from "../Button";
import { Select } from "../Select";
import { Input } from "../Input";
import { FilterPanelProps, FilterState } from "./types";
import { organizationOptions, statusOptions } from "@/constants";

export const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  onFilterChange,
  onReset,
}) => {
  const handleInputChange = (field: keyof FilterState, value: string) => {
    onFilterChange({
      ...filters,
      [field]: value,
    });
  };

  return (
    <div className={styles.filterPanel}>
      <div className={styles.filterGrid}>
        <Select
          label="Organization"
          name="organization"
          value={filters.organization}
          onChange={(value) => handleInputChange("organization", value)}
          options={organizationOptions}
          placeholder="Select..."
        />

        <Input
          label="Username"
          name="username"
          type="text"
          placeholder="User"
          value={filters.username}
          onChange={(value) => handleInputChange("username", value)}
        />

        <Input
          label="Email"
          name="email"
          type="email"
          placeholder="Email"
          value={filters.email}
          onChange={(value) => handleInputChange("email", value)}
        />

        <Input
          label="Date"
          name="date"
          type="date"
          value={filters.date}
          onChange={(value) => handleInputChange("date", value)}
        />

        <Input
          label="Phone Number"
          name="phoneNumber"
          type="tel"
          placeholder="Phone Number"
          value={filters.phoneNumber}
          onChange={(value) => handleInputChange("phoneNumber", value)}
        />

        <Select
          label="Status"
          name="status"
          value={filters.status}
          onChange={(value) => handleInputChange("status", value)}
          options={statusOptions}
          placeholder="Select..."
        />
      </div>

      <div className={styles.filterActions}>
        <Button type="button" onClick={onReset} className={styles.resetButton}>
          Reset
        </Button>
        <Button type="button" className={styles.filterButton}>
          Filter
        </Button>
      </div>
    </div>
  );
};
