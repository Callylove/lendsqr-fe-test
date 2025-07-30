import React from "react";
import styles from "../../../../styles/TableEmpty.module.scss";
import { TableColumn } from "../../types";

interface TableEmptyProps<T extends Record<string, unknown>> {
  columns: TableColumn<T>[];
  message?: string;
  className?: string;
}

export const TableEmpty = <T extends Record<string, unknown>>({
  columns,
  message = "No data available",
  className = "",
  ...props
}: TableEmptyProps<T>) => {
  const tableClasses = `${styles.table} ${className}`;

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
      </table>
      <div className={styles.emptyState}>
        <div className={styles.emptyIcon}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
            <path d="M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20C20.55 4 21 4.45 21 5S20.55 6 20 6H19V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V6H4C3.45 6 3 5.55 3 5S3.45 4 4 4H7ZM9 3V4H15V3H9ZM7 6V19H17V6H7Z" />
          </svg>
        </div>
        <h3 className={styles.emptyTitle}>No data found</h3>
        <p className={styles.emptyMessage}>{message}</p>
      </div>
    </div>
  );
};
