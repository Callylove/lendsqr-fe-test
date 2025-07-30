"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { user } from "@/constants";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { getActiveNavigationItem } from "./utils";
import styles from "../../styles/DashboardLayout.module.scss";
import { LayoutProps } from "./types";

const DashboardLayout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const pathname = usePathname();

  // Get active item based on current path
  const getActiveItem = (): string | null => {
    if (!pathname) return null;

    return getActiveNavigationItem(pathname);
  };

  const activeItem = getActiveItem();

  // Handle responsive behavior and cleanup
  useEffect(() => {
    const handleResize = (): void => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(false);
      }
    };

    const handleClickOutside = (event: MouseEvent): void => {
      const target = event.target as Element;

      // Close sidebar on mobile when clicking outside
      if (window.innerWidth < 1024 && sidebarOpen) {
        if (
          !target.closest("[data-sidebar]") &&
          !target.closest("[data-menu-button]")
        ) {
          setSidebarOpen(false);
        }
      }
    };

    // Handle escape key to close sidebar
    const handleEscapeKey = (event: KeyboardEvent): void => {
      if (event.key === "Escape" && sidebarOpen) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    document.addEventListener("click", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [sidebarOpen]);

  // Close sidebar when route changes (mobile)
  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  }, [pathname]);

  const handleSidebarClose = (): void => {
    setSidebarOpen(false);
  };

  const handleMenuClick = (): void => {
    setSidebarOpen(true);
  };

  return (
    <div className={styles.dashboardContainer}>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className={`${styles.mobileOverlay} ${sidebarOpen ? styles.visible : ""}`}
          onClick={handleSidebarClose}
        />
      )}

      {/* Sidebar */}
      <div className={styles.sidebarSection} data-sidebar>
        <Sidebar
          isOpen={sidebarOpen}
          onClose={handleSidebarClose}
          activeItem={activeItem}
        />
      </div>

      {/* Main content */}
      <div className={styles.mainContent}>
        {/* Header */}
        <Header onMenuClick={handleMenuClick} user={user} />

        {/* Main content area */}
        <main className={styles.contentArea}>
          <div className={styles.contentWrapper}>{children}</div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
