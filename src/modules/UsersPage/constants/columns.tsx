// constants/columns.tsx
import React from "react";
import Badge from "@/components/Badge";
import { formatDate } from "../utils";
import { ActionsDropdown } from "../components/ActionsDropdown";
import { User } from "../types";
import { TableColumn } from "@/components/Table/types";

// These handlers should be passed from the parent component or moved to a context
const handleViewDetails = (user: User) => {
  console.log("View details for:", user);
  // Implementation will be in the parent component
};

const handleBlacklistUser = (user: User) => {
  console.log("Blacklist user:", user);
  // Implementation will be in the parent component
};

const handleActivateUser = (user: User) => {
  console.log("Activate user:", user);
  // Implementation will be in the parent component
};

export const getUsersTableColumns = (): TableColumn<User>[] => [
  {
    key: "organization",
    title: "ORGANIZATION",
    sortable: true,
    render: (value: unknown) => (
      <span className="font-medium text-gray-900">{String(value)}</span>
    ),
  },
  {
    key: "username",
    title: "USERNAME",
    sortable: true,
    render: (value: unknown) => (
      <span className="text-gray-700">{String(value)}</span>
    ),
  },
  {
    key: "email",
    title: "EMAIL",
    sortable: true,
    render: (value: unknown) => (
      <span className="text-gray-600">{String(value)}</span>
    ),
  },
  {
    key: "phoneNumber",
    title: "PHONE NUMBER",
    sortable: true,
    render: (value: unknown) => (
      <span className="text-gray-600">{String(value)}</span>
    ),
  },
  {
    key: "dateJoined",
    title: "DATE JOINED",
    sortable: true,
    render: (value: unknown) => (
      <span className="text-gray-600">{formatDate(String(value))}</span>
    ),
  },
  {
    key: "status",
    title: "STATUS",
    sortable: true,
    render: (value: unknown) => <Badge status={String(value)} />,
  },
  {
    key: "actions",
    title: "",
    sortable: false,
    render: (_: unknown, row: User) => (
      <ActionsDropdown
        user={row}
        onViewDetails={handleViewDetails}
        onBlacklistUser={handleBlacklistUser}
        onActivateUser={handleActivateUser}
      />
    ),
  },
];
