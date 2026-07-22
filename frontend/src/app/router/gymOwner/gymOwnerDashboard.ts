import { createRoute } from "@tanstack/react-router";
import GymOwnerDashboardPage from "@/features/dashboard/pages/GymOwnerDashboardPage";
import { gymOwnerLayoutRoute } from "@/app/router/gymOwner/gymOwnerLayoutRoute";

export const gymOwnerDashboard = createRoute({
  getParentRoute: () => gymOwnerLayoutRoute,
  path: "/dashboard",
  component: GymOwnerDashboardPage,
});