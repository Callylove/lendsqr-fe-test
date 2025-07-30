import React from "react";
import styles from "../../../../styles/TableLoading.module.scss";
import { TableColumn } from "../../types";

interface TableLoadingProps<T extends Record<string, unknown>> {
  columns: TableColumn<T>[];
  className?: string;
  skeletonRows?: number;
}

export const TableLoading = <T extends Record<string, unknown>>({
  columns,
  className = "",
  skeletonRows = 5,
  ...props
}: TableLoadingProps<T>) => {
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
        <tbody>
          {Array.from({ length: skeletonRows }).map((_, index) => (
            <tr key={index} className={styles.skeletonRow}>
              {columns.map((column) => (
                <td key={column.key} className={styles.tableCell}>
                  <div className={styles.skeleton}></div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
