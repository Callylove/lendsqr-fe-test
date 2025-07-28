"use client";

import React, { useState } from "react";
import { Menu, Search, Bell, ChevronDown } from "lucide-react";

import styles from "../../../styles/Header.module.scss";
import { HeaderProps } from "./types";
import { Avatar } from "@/components/Avater";
import Link from "next/link";
import SearchComponent from "@/components/SearchComponent";

export const Header: React.FC<HeaderProps> = ({ onMenuClick, user = {} }) => {
  const [showUserMenu, setShowUserMenu] = useState<boolean>(false);

  const handleSearch = (term: string): void => {
    console.log("Search:", term);
  };

  const handleUserMenuToggle = (): void => {
    setShowUserMenu(!showUserMenu);
  };

  return (
    <header className={styles.header}>
      {/* Left side */}
      <div className={styles.leftSection}>
        {/* Mobile menu button */}
        <button
          onClick={onMenuClick}
          className={styles.mobileMenuButton}
          type="button"
          aria-label="Open mobile menu"
        >
          <Menu />
        </button>

        {/* Logo (mobile) */}
        <div className={styles.mobileLogo}>
          <div className={styles.logoIcon}>
            <span>L</span>
          </div>
          <span className={styles.logoText}>lendsqr</span>
        </div>

        {/* Search (desktop) */}
        <div className={styles.desktopSearchContainer}>
          <SearchComponent
            placeholder="Search for anything"
            onSearch={handleSearch}
          />
        </div>
      </div>

      {/* Right side */}
      <div className={styles.rightSection}>
        {/* Search (mobile) */}
        <button
          className={styles.mobileSearchButton}
          type="button"
          aria-label="Open search"
        >
          <Search />
        </button>

        {/* Docs link */}
        <Link href="#" className={styles.docsLink}>
          Docs
        </Link>

        {/* Notifications */}
        <button
          className={styles.notificationButton}
          type="button"
          aria-label="View notifications"
        >
          <Bell />
          <span className={styles.notificationBadge}></span>
        </button>

        {/* User menu */}
        <div className={styles.userMenuContainer}>
          <button
            onClick={handleUserMenuToggle}
            className={styles.userMenuTrigger}
            type="button"
            aria-label="Open user menu"
            aria-expanded={showUserMenu}
          >
            <Avatar name={user.name || "User"} src={user.avatar} size="sm" />
            <span className={styles.userName}>{user.name || "User"}</span>
            <ChevronDown className={styles.userMenuChevron} />
          </button>

          {/* Dropdown menu */}
          {showUserMenu && (
            <div className={styles.userDropdownMenu}>
              <a href="#" className={styles.userDropdownItem}>
                Profile
              </a>
              <a href="#" className={styles.userDropdownItem}>
                Settings
              </a>
              <hr className={styles.userDropdownDivider} />
              <a href="#" className={styles.userDropdownItem}>
                Sign out
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
