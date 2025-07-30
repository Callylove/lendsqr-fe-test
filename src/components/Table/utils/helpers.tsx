export const getRowKey = <T extends Record<string, unknown>>(
  row: T,
  index: number,
  rowKey: string | ((row: T) => string) = "id",
): string => {
  if (typeof rowKey === "function") {
    return rowKey(row);
  }
  const keyValue = row[rowKey];
  return String(keyValue) || index.toString();
};
