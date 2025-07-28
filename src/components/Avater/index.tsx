import React, { useState } from "react";
import Image from "next/image";

import styles from "../../styles/Avater.module.scss";
import {
  getAvatarAltText,
  getAvatarSizeClasses,
  getInitials,
  handleImageError,
} from "./utils";
import { AvatarProps } from "./types";

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  name = "User",
  size = "md",
  className = "",
}) => {
  const [imageError, setImageError] = useState<boolean>(false);
  const [imageLoading, setImageLoading] = useState<boolean>(true);

  const sizeClasses = getAvatarSizeClasses(size);
  const initials = getInitials(name);
  const altText = getAvatarAltText(name, alt);

  const handleImageLoadError = (
    event: React.SyntheticEvent<HTMLImageElement>,
  ) => {
    setImageError(true);
    setImageLoading(false);
    handleImageError(event);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const showImage = src && !imageError;
  const showInitials = !showImage;

  return (
    <div className={`${styles.avatarContainer} ${className}`}>
      <div
        className={`
          ${styles.avatar} 
          ${styles[sizeClasses.container]}
          ${showInitials ? styles.noImage : ""}
        `}
      >
        {!imageLoading && showImage ? (
          <Image
            width={100}
            height={100}
            src={src}
            alt={altText}
            className={`${styles.avatarImage} ${imageError ? styles.error : ""}`}
            onError={handleImageLoadError}
            onLoad={handleImageLoad}
            priority={size === "xl"}
          />
        ) : (
          <span className={styles.initials}>{initials}</span>
        )}
      </div>
    </div>
  );
};
