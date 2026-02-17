export const navigationItems = [
  {
    label: "Dashboard",
    path: "/dashboard",
    roles: ["ROLE_ADMIN", "ROLE_RESIDENT"],
    plans: ["FREE", "PRO", "ENTERPRISE"],
  },
  {
    label: "Reports",
    path: "/reports",
    roles: ["ROLE_ADMIN", "ROLE_RESIDENT"],
    plans: ["PRO", "ENTERPRISE"],
  },
  {
    label: "Admin Panel",
    path: "/admin",
    roles: ["ROLE_ADMIN"],
    plans: ["FREE", "PRO", "ENTERPRISE"],
  },
  {
    label: "Predictive Insights",
    path: "/predictive",
    roles: ["ROLE_ADMIN"],
    plans: ["ENTERPRISE"],
  },
];
