import { StaticImageData } from "next/image";

export interface NavItem {
  id: string;
  label: string;
  icon: StaticImageData;
  href: string;
  badge?: string | number;
}

export interface NavSectionProps {
  title?: string;
  items: NavItem[];
  activeItem: string | null;
}
