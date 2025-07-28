export const handleInputChange = (
  newValue: string,
  setSearchTerm: (value: string) => void,
  onSearch?: (value: string) => void,
): void => {
  setSearchTerm(newValue);
  onSearch?.(newValue);
};

export const handleKeyPress = (
  e: React.KeyboardEvent<HTMLInputElement>,
  searchTerm: string,
  onSearch?: (value: string) => void,
): void => {
  if (e.key === "Enter") {
    onSearch?.(searchTerm);
  }
};

export const handleClear = (
  setSearchTerm: (value: string) => void,
  onSearch?: (value: string) => void,
): void => {
  setSearchTerm("");
  onSearch?.("");
};
