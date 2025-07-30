"use client";

import React from "react";
import styles from "../../styles/Table.module.scss";

import { TableProps } from "./types";
import { getRowKey } from "./utils";
import { TableCell, TableEmpty, TableLoading } from "./components";
import Error from "../Error";

export const Table = <T extends Record<string, unknown>>({
  columns,
  data,
  loading = false,
  error = null,
  emptyMessage = "No data available",
  className = "",
  rowKey = "id",
  onRetry,
  ...props
}: TableProps<T>) => {
  const tableClasses = `${styles.table} ${className}`;

  // Loading state
  if (loading) {
    return <TableLoading columns={columns} className={className} />;
  }

  // Error state
  if (error) {
    return <Error message={error} onRetry={onRetry} />;
  }

  // Empty state
  if (!data || data.length === 0) {
    return (
      <TableEmpty
        columns={columns}
        message={emptyMessage}
        className={className}
      />
    );
  }

  // Normal table
  return (
    <div className={styles.tableContainer}>
      <table className={tableClasses} {...props}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className={styles.tableHeader}
                style={{ width: column.width, textAlign: column.align }}
              >
                {column.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={getRowKey(row, index, rowKey)} className={styles.tableRow}>
              {columns.map((column) => (
                <td
                  key={column.key}
                  className={styles.tableCell}
                  style={{ textAlign: column.align }}
                >
                  {TableCell(column, row, index)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
