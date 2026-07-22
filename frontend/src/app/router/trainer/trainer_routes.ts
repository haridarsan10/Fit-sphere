import { trainerDashboard } from "./trainerDashboard";
import { trainerLayouteRoute } from "./trainerLayoutRoute";
import { trainerRoute } from "./trainerRoute";

export const trainer_routes=trainerRoute.addChildren([
  trainerLayouteRoute.addChildren([trainerDashboard])
])