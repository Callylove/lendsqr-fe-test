import React, { ReactNode } from "react";
import { TableColumn } from "../../types";

export const TableCell = <T extends Record<string, unknown>>(
  column: TableColumn<T>,
  row: T,
  index: number,
): React.ReactNode => {
  if (column.render) {
    return column.render(row[column.key], row, index);
  }
  return row[column.key] as ReactNode;
};
