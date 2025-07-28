import React from "react";
import { NavSectionProps } from "./types";
import Image from "next/image";
import Link from "next/link";
import styles from "../../../styles/NavSection.module.scss";

export const NavSection: React.FC<NavSectionProps> = ({
  title,
  items,
  activeItem,
}) => {
  return (
    <div className={styles.navSection}>
      {title && <h3 className={styles.sectionTitle}>{title}</h3>}
      <nav className={styles.navigation}>
        {items.map((item) => {
          const isActive = activeItem === item.id;

          return (
            <Link
              href={item.href}
              key={item.id}
              className={`${styles.navLink} ${isActive ? styles.active : ""}`}
            >
              <Image
                src={item.icon}
                alt={`${item.label} icon`}
                width={16}
                height={16}
              />
              <span className={styles.linkText}>{item.label}</span>
              {item.badge && <span className={styles.badge}>{item.badge}</span>}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};
