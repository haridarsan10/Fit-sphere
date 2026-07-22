import { createRoute } from "@tanstack/react-router";
import TrainerDashboardPage from "@/features/dashboard/pages/TrainerDashboardPage";
import { trainerLayouteRoute } from "./trainerLayoutRoute";

export const trainerDashboard=createRoute({
  getParentRoute:()=>trainerLayouteRoute,
  path:"/dashboard",
  component:TrainerDashboardPage
})