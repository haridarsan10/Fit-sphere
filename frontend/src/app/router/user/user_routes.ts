import { userRoute } from "./userRoute";
import { userDashboard } from "./userDashboard";
import { userLayoutRoute } from "./userLayoutRoute";
import { workoutRoutes } from "./workoutRoutes";

export const user_routes=userRoute.addChildren([
  userLayoutRoute.addChildren([userDashboard,workoutRoutes])
])