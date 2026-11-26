import { adminDashboard } from "./adminDashboardRoute";
import { adminLayoutRoute } from "./adminLayoutRoute";
import { adminRoute } from "./adminRoute";

export const admin_routes = adminRoute.addChildren([
  adminLayoutRoute.addChildren([
    adminDashboard
  ]),
]);