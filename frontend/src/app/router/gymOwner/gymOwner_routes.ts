import { gymOwnerRoute } from "@/app/router/gymOwner/gymOwnerRoute";
import { gymOwnerLayoutRoute } from "@/app/router/gymOwner/gymOwnerLayoutRoute";
import { gymOwnerDashboard } from "@/app/router/gymOwner/gymOwnerDashboard";
import { gymOwnerMyGymsRoute } from "@/app/router/gymOwner/gymOwnerMyGyms";
import { gymOwnerAddGymRoute } from "./gymOwnerAddGym";

export const gymOwner_routes = gymOwnerRoute.addChildren([
  gymOwnerLayoutRoute.addChildren([
    gymOwnerDashboard,
    gymOwnerMyGymsRoute,
    gymOwnerAddGymRoute
  ]),
]);