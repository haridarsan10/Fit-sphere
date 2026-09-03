import { createRoute } from "@tanstack/react-router";
import { userLayoutRoute } from "./userLayoutRoute";
import WorkoutPage from "@/features/workout/pages/WorkoutPage";

export const workoutRoutes=createRoute({
  getParentRoute:()=>userLayoutRoute,
  path:'/workouts',
  component:WorkoutPage
})