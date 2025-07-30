"use client";

import React, { useState, useMemo } from "react";
import Card, { CardBody } from "@/components/Card";
import styles from "../../styles/UsersPage.module.scss";
import DashboardLayout from "@/components/DashboardLayout";
import { StatsCard } from "./components";
import { FilterPanel, Pagination, Table } from "@/components";
import { getUsersTableColumns } from "./constants/columns";
import { FilterState } from "./types";
import { useUsersData, useUsersFilters } from "./utils";

// Icons components (you can replace these with your actual icon components)
const UsersIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zM4 18v-4h3v4h2v-4h3l-1-5c-.37-1.21-1.08-2.09-2.6-2.4L6 6.4c-1.52-.31-2.23-.19-2.6 1.6L2 13h3v5h2zm14.5-13c.83 0 1.5.67 1.5 1.5v9c0 .83-.67 1.5-1.5 1.5h-7c-.83 0-1.5-.67-1.5-1.5v-9c0-.83.67-1.5 1.5-1.5h7z" />
  </svg>
);

const ActiveUsersIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
  </svg>
);

const LoansIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z" />
  </svg>
);

const SavingsIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M7 15h7v2H7zm0-4h10v2H7zm0-4h10v2H7zm12-4h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-.14 0-.27.01-.4.04-.39.08-.74.28-1.01.55-.18.18-.33.4-.43.64-.1.23-.16.49-.16.77v14c0 .27.06.54.16.78.1.23.25.45.43.64.27.27.62.47 1.01.55.13.02.26.03.4.03h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7-.25c.41 0 .75.34.75.75s-.34.75-.75.75-.75-.34-.75-.75.34-.75.75-.75zM19 19H5V5h14v14z" />
  </svg>
);

const UsersPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(100);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    organization: "",
    username: "",
    email: "",
    date: "",
    phoneNumber: "",
    status: "",
  });

  // Get users data and stats
  const { users, stats, loading, error } = useUsersData();

  // Apply filters and pagination
  const { filteredUsers, totalFilteredUsers, totalPages } = useUsersFilters(
    users,
    filters,
    currentPage,
    pageSize,
  );

  // Table columns configuration
  const columns = useMemo(() => getUsersTableColumns(), []);

  // Stats cards data
  const statsData = [
    {
      title: "USERS",
      value: stats.totalUsers.toLocaleString(),
      icon: <UsersIcon />,
      color: "primary",
    },
    {
      title: "ACTIVE USERS",
      value: stats.activeUsers.toLocaleString(),
      icon: <ActiveUsersIcon />,
      color: "info",
    },
    {
      title: "USERS WITH LOANS",
      value: stats.usersWithLoans.toLocaleString(),
      icon: <LoansIcon />,
      color: "warning",
    },
    {
      title: "USERS WITH SAVINGS",
      value: stats.usersWithSavings.toLocaleString(),
      icon: <SavingsIcon />,
      color: "success",
    },
  ];

  // Handlers
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleFilterReset = () => {
    setFilters({
      organization: "",
      username: "",
      email: "",
      date: "",
      phoneNumber: "",
      status: "",
    });
    setCurrentPage(1);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  if (error) {
    return (
      <DashboardLayout>
        <div className={styles.errorContainer}>
          <p>Error loading users: {error}</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className={styles.usersPage}>
        {/* Page Header */}
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>Users</h1>
          <button
            onClick={toggleFilters}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            {showFilters ? "Hide" : "Show"} Filters
          </button>
        </div>

        {/* Stats Cards */}
        <div className={styles.statsGrid}>
          {statsData.map((stat, index) => (
            <StatsCard
              key={index}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
            />
          ))}
        </div>

        <Card>
          <CardBody>
            {/* Filter Panel */}
            {showFilters && (
              <div className={styles.filtersContainer}>
                <FilterPanel
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  onReset={handleFilterReset}
                />
              </div>
            )}

            {/* Table */}
            <div className={styles.tableContainer}>
              <Table
                columns={columns}
                data={filteredUsers}
                loading={loading}
                emptyMessage="No users found"
                className={styles.usersTable}
              />
            </div>

            {/* Pagination */}
            <div className={styles.paginationContainer}>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                pageSize={pageSize}
                totalItems={totalFilteredUsers}
                onPageChange={handlePageChange}
                onPageSizeChange={handlePageSizeChange}
                showPageSizeSelector
                pageSizeOptions={[50, 100, 200, 500]}
              />
            </div>
          </CardBody>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default UsersPage;
