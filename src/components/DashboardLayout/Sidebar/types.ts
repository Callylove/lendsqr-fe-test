export interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeItem: string | null;
}
