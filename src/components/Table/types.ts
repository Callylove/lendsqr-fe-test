import React from "react";

export interface TableColumn<
  T extends Record<string, unknown> = Record<string, unknown>,
> {
  key: Extract<keyof T, string> | string;
  title: string;
  sortable: boolean;
  render?: (value: unknown, row: T, index: number) => React.ReactNode;
  width?: string;
  align?: "left" | "center" | "right";
}

export interface TableProps<
  T extends Record<string, unknown> = Record<string, unknown>,
> {
  columns: TableColumn<T>[];
  data: T[];
  loading?: boolean;
  error?: string | null;
  emptyMessage?: string;
  className?: string;
  rowKey?: string | ((row: T) => string);
  onRetry?: () => void;
}
