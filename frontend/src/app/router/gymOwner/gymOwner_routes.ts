import { gymOwnerRoute } from "@/app/router/gymOwner/gymOwnerRoute";
import { gymOwnerLayoutRoute } from "@/app/router/gymOwner/gymOwnerLayoutRoute";
import { gymOwnerDashboard } from "@/app/router/gymOwner/gymOwnerDashboard";

export const gymOwner_routes = gymOwnerRoute.addChildren([
  gymOwnerLayoutRoute.addChildren([gymOwnerDashboard]),
]);