// Date formatting utility
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

// Filter utilities
export const applyFilters = (users: User[], filters: FilterState): User[] => {
  return users.filter((user) => {
    // Organization filter
    if (
      filters.organization &&
      !user.organization
        .toLowerCase()
        .includes(filters.organization.toLowerCase())
    ) {
      return false;
    }

    // Username filter
    if (
      filters.username &&
      !user.username.toLowerCase().includes(filters.username.toLowerCase())
    ) {
      return false;
    }

    // Email filter
    if (
      filters.email &&
      !user.email.toLowerCase().includes(filters.email.toLowerCase())
    ) {
      return false;
    }

    // Phone number filter
    if (
      filters.phoneNumber &&
      !user.phoneNumber.includes(filters.phoneNumber)
    ) {
      return false;
    }

    // Status filter
    if (
      filters.status &&
      user.status.toLowerCase() !== filters.status.toLowerCase()
    ) {
      return false;
    }

    // Date filter
    if (filters.date) {
      const userDate = new Date(user.dateJoined);
      const filterDate = new Date(filters.date);
      if (userDate.toDateString() !== filterDate.toDateString()) {
        return false;
      }
    }

    return true;
  });
};

// Pagination utilities
export const paginateData = <T>(
  data: T[],
  page: number,
  pageSize: number,
): T[] => {
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  return data.slice(startIndex, endIndex);
};

export const getTotalPages = (totalItems: number, pageSize: number): number => {
  return Math.ceil(totalItems / pageSize);
};

import { useState, useEffect, useMemo } from "react";
import { FilterState, User, UserStats } from "../types";

// Mock data generator
const generateMockUsers = (count: number): User[] => {
  const organizations = [
    "TechCorp",
    "DataSoft",
    "CloudInc",
    "DevTeam",
    "StartupXYZ",
    "Enterprise Ltd",
    "Innovation Co",
    "Digital Works",
  ];
  const statuses: User["status"][] = [
    "active",
    "inactive",
    "pending",
    "blacklisted",
  ];
  const domains = [
    "gmail.com",
    "yahoo.com",
    "company.com",
    "techcorp.com",
    "business.net",
  ];

  return Array.from({ length: count }, (_, index) => {
    const firstName = `User${index + 1}`;
    const lastName = `Last${index + 1}`;
    const username = `${firstName.toLowerCase()}${lastName.toLowerCase()}`;
    const org = organizations[Math.floor(Math.random() * organizations.length)];

    return {
      id: `user-${index + 1}`,
      organization: org,
      username,
      email: `${username}@${domains[Math.floor(Math.random() * domains.length)]}`,
      phoneNumber: `+1${Math.floor(Math.random() * 9000000000 + 1000000000)}`,
      dateJoined: new Date(
        2020 + Math.floor(Math.random() * 5),
        Math.floor(Math.random() * 12),
        Math.floor(Math.random() * 28) + 1,
      ).toISOString(),
      status: statuses[Math.floor(Math.random() * statuses.length)],
    };
  });
};

export const useUsersData = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [stats, setStats] = useState<UserStats>({
    totalUsers: 0,
    activeUsers: 0,
    usersWithLoans: 0,
    usersWithSavings: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);

        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const mockUsers = generateMockUsers(500);
        setUsers(mockUsers);

        // Calculate stats
        const activeUsers = mockUsers.filter(
          (user) => user.status === "active",
        ).length;
        const usersWithLoans = Math.floor(mockUsers.length * 0.3); // 30% have loans
        const usersWithSavings = Math.floor(mockUsers.length * 0.7); // 70% have savings

        setStats({
          totalUsers: mockUsers.length,
          activeUsers,
          usersWithLoans,
          usersWithSavings,
        });

        setError(null);
      } catch (err) {
        setError("Failed to fetch users data");
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return { users, stats, loading, error };
};

export const useUsersFilters = (
  users: User[],
  filters: FilterState,
  currentPage: number,
  pageSize: number,
) => {
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesOrganization =
        !filters.organization ||
        user.organization
          .toLowerCase()
          .includes(filters.organization.toLowerCase());

      const matchesUsername =
        !filters.username ||
        user.username.toLowerCase().includes(filters.username.toLowerCase());

      const matchesEmail =
        !filters.email ||
        user.email.toLowerCase().includes(filters.email.toLowerCase());

      const matchesPhoneNumber =
        !filters.phoneNumber || user.phoneNumber.includes(filters.phoneNumber);

      const matchesStatus = !filters.status || user.status === filters.status;

      const matchesDate =
        !filters.date || user.dateJoined.includes(filters.date);

      return (
        matchesOrganization &&
        matchesUsername &&
        matchesEmail &&
        matchesPhoneNumber &&
        matchesStatus &&
        matchesDate
      );
    });
  }, [users, filters]);

  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredUsers.slice(startIndex, endIndex);
  }, [filteredUsers, currentPage, pageSize]);

  const totalPages = Math.ceil(filteredUsers.length / pageSize);

  return {
    filteredUsers: paginatedUsers,
    totalFilteredUsers: filteredUsers.length,
    totalPages,
  };
};
