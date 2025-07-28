import { StaticImageData } from "next/image";

export type AvatarSize = "sm" | "md" | "lg" | "xl";

export interface AvatarProps {
  src?: StaticImageData;
  alt?: string;
  name?: string;
  size?: AvatarSize;
  className?: string;
}
