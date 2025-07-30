export interface User extends Record<string, unknown> {
  id: string;
  organization: string;
  username: string;
  email: string;
  phoneNumber: string;
  dateJoined: string;
  status: "active" | "inactive" | "pending" | "blacklisted";
}
export interface UserStats {
  totalUsers: number;
  activeUsers: number;
  usersWithLoans: number;
  usersWithSavings: number;
}

export interface FilterState {
  organization: string;
  username: string;
  email: string;
  date: string;
  phoneNumber: string;
  status: string;
}

export interface ActionsDropdownProps {
  user: User;
  onViewDetails: (user: User) => void;
  onBlacklistUser: (user: User) => void;
  onActivateUser: (user: User) => void;
}
