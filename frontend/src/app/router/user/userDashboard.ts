import { createRoute } from "@tanstack/react-router";
import { userLayoutRoute } from "./userLayoutRoute";
import UserDashboardPage from "@/features/dashboard/pages/UserDashboardPage";

export const userDashboard=createRoute({
  getParentRoute:()=>userLayoutRoute,
  path:'/dashboard',
  component:UserDashboardPage
})