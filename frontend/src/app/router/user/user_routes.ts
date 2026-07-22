import { userRoute } from "./userRoute";
import { userDashboard } from "./userDashboard";
import { userLayoutRoute } from "./userLayoutRoute";

export const user_routes=userRoute.addChildren([
  userLayoutRoute.addChildren([userDashboard])
])