import { User } from "@/constants";

export interface HeaderProps {
  onMenuClick: () => void;
  user?: User;
}
