export const navigationItems = [
  {
    label: "Dashboard",
    path: "/dashboard",
    roles: ["ADMIN", "RESIDENT"],
    plans: ["FREE", "PRO", "ENTERPRISE"],
  },
  {
    label: "Reports",
    path: "/reports",
    roles: ["ADMIN", "RESIDENT"],
    plans: ["PRO", "ENTERPRISE"],
  },
  {
    label: "Subscription",
    path: "/subscription",
    roles: ["ADMIN", "RESIDENT"],
    plans: ["FREE", "PRO", "ENTERPRISE"],
  },
  {
    label: "Admin Panel",
    path: "/admin",
    roles: ["ADMIN"],
    plans: ["FREE", "PRO", "ENTERPRISE"],
  },
  {
    label: "Predictive Insights",
    path: "/predictive",
    roles: ["ADMIN"],
    plans: ["ENTERPRISE"],
  },
];
