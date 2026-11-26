import { createRoute } from "@tanstack/react-router";
import { adminRoute } from "./adminRoute";
import AdminLayout from "@/components/layouts/admin-layout";

export const adminLayoutRoute = createRoute({
  getParentRoute: () => adminRoute,
  id:"admin-layout",
  component: AdminLayout,
});
