import { AvatarSize } from "../types";

export const getInitials = (fullName: string): string => {
  if (!fullName || fullName.trim() === "") {
    return "U"; // Default to 'U' for User
  }

  return fullName
    .trim()
    .split(" ")
    .filter((name) => name.length > 0) // Filter out empty strings
    .map((name) => name.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

export const getAvatarSizeClasses = (size: AvatarSize) => {
  const sizeMap = {
    sm: {
      container: "small",
      dimensions: "w-8 h-8",
      text: "text-xs",
    },
    md: {
      container: "medium",
      dimensions: "w-10 h-10",
      text: "text-sm",
    },
    lg: {
      container: "large",
      dimensions: "w-12 h-12",
      text: "text-base",
    },
    xl: {
      container: "extraLarge",
      dimensions: "w-16 h-16",
      text: "text-lg",
    },
  };

  return sizeMap[size] || sizeMap.md;
};

export const handleImageError = (
  event: React.SyntheticEvent<HTMLImageElement>,
  fallbackAction?: () => void,
): void => {
  const target = event.target as HTMLImageElement;
  target.style.display = "none";

  if (fallbackAction) {
    fallbackAction();
  }
};

export const getAvatarAltText = (name?: string, alt?: string): string => {
  if (alt) return alt;
  if (name) return `${name}'s avatar`;
  return "User avatar";
};
