export interface FilterState {
  organization: string;
  username: string;
  email: string;
  date: string;
  phoneNumber: string;
  status: string;
}

export interface FilterPanelProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onReset: () => void;
}
