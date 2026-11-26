import { createRoute } from "@tanstack/react-router";
import AdminDashboardPage from "@/features/dashboard/pages/AdminDashboardPage";
import { adminLayoutRoute } from "./adminLayoutRoute";

export const adminDashboard = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/dashboard",
  component:AdminDashboardPage,
});