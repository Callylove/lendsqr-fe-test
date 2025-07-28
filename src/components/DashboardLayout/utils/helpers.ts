export const PATH_MAPPINGS: Record<string, string> = {
  "/dashboard": "dashboard",
  "/users": "users",
  "/users/create": "users",
  "/users/edit": "users",
  "/users/details": "users",
  "/guarantors": "guarantors",
  "/loans": "loans",
  "/decision-models": "decision-models",
  "/savings": "savings",
  "/loan-requests": "loan-requests",
  "/whitelist": "whitelist",
  "/karma": "karma",
  "/organizations": "organizations",
  "/loan-products": "loan-products",
  "/savings-products": "savings-products",
  "/fees-charges": "fees-charges",
  "/transactions": "transactions",
  "/services": "services",
  "/service-account": "service-account",
  "/settlements": "settlements",
  "/reports": "reports",
  "/preferences": "preferences",
  "/fees-pricing": "fees-pricing",
  "/audit-logs": "audit-logs",
  "/systems-messages": "systems-messages",
};
export const getActiveNavigationItem = (pathname: string): string | null => {
  if (!pathname) return null;

  // Check exact match first
  if (PATH_MAPPINGS[pathname]) {
    return PATH_MAPPINGS[pathname];
  }

  // Check for partial matches (for nested routes)
  for (const [path, itemId] of Object.entries(PATH_MAPPINGS)) {
    if (pathname.startsWith(path + "/")) {
      return itemId;
    }
  }

  // Return null if no match is found
  return null;
};
