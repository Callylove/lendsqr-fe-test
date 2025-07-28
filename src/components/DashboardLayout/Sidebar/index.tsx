"use client";

import {
  BriefcaseIcon,
  navigationData,
  Organization,
  organizations,
} from "@/constants";
import Image from "next/image";
import { useState } from "react";
import { SidebarProps } from "./types";
import { ChevronDown, X } from "lucide-react";
import { NavSection } from "../NavSection";
import styles from "../../../styles/Sidebar.module.scss";

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  activeItem,
}) => {
  const [showOrgDropdown, setShowOrgDropdown] = useState<boolean>(false);
  const [selectedOrg, setSelectedOrg] = useState<Organization>(
    organizations[0],
  );

  const handleOrgChange = (org: Organization): void => {
    setSelectedOrg(org);
    setShowOrgDropdown(false);
    console.log("Switched to organization:", org);
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && <div className={styles.sidebarOverlay} onClick={onClose} />}

      {/* Sidebar */}
      <div className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
        {/* Logo */}
        <div className={styles.logoContainer}>
          <Image
            src="/logo.svg"
            alt="Lendsqr Logo"
            width={174}
            height={36}
            priority
          />
          <button onClick={onClose} className={styles.closeButton}>
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <div className={styles.navigationContainer}>
          {/* Switch Organization Dropdown */}
          <div className={styles.dropdownContainer}>
            <button
              onClick={() => setShowOrgDropdown(!showOrgDropdown)}
              className={styles.dropdownTrigger}
            >
              <Image
                src={BriefcaseIcon}
                alt="briefcase icon"
                width={16}
                height={16}
              />
              <div className={styles.dropdownContent}>
                <div className={styles.orgName}>{selectedOrg.name}</div>
                <div className={styles.switchLabel}>Switch Organization</div>
              </div>
              <ChevronDown
                className={`${styles.chevronIcon} ${showOrgDropdown ? styles.rotated : ""}`}
              />
            </button>

            {/* Dropdown Menu */}
            {showOrgDropdown && (
              <div className={styles.dropdownMenu}>
                <div className={styles.menuContent}>
                  {organizations.map((org) => (
                    <button
                      key={org.id}
                      onClick={() => handleOrgChange(org)}
                      className={`${styles.orgOption} ${selectedOrg.id === org.id ? styles.selected : ""}`}
                    >
                      <Image
                        src={BriefcaseIcon}
                        alt="briefcase icon"
                        width={16}
                        height={16}
                      />
                      <div className={styles.optionContent}>
                        <div className={styles.optionName}>{org.name}</div>
                        <div className={styles.optionType}>{org.type}</div>
                      </div>
                      {selectedOrg.id === org.id && (
                        <div className={styles.selectedIndicator}></div>
                      )}
                    </button>
                  ))}
                </div>

                {/* Add Organization Option */}
                <div className={styles.addOrgSection}>
                  <button className={styles.addOrgButton}>
                    <div className={styles.addIcon}>
                      <span>+</span>
                    </div>
                    <span>Add New Organization</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Sections */}
          <NavSection items={navigationData.main} activeItem={activeItem} />
          <NavSection
            title="Customers"
            items={navigationData.customers}
            activeItem={activeItem}
          />
          <NavSection
            title="Businesses"
            items={navigationData.businesses}
            activeItem={activeItem}
          />
          <NavSection
            title="Settings"
            items={navigationData.settings}
            activeItem={activeItem}
          />
        </div>
      </div>
    </>
  );
};
