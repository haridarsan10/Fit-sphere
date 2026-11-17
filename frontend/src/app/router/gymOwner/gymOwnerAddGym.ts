import { gymOwnerLayoutRoute } from "./gymOwnerLayoutRoute";
import { createRoute } from "@tanstack/react-router";
import AddGym from "@/features/gym/pages/AddGym";

export const gymOwnerAddGymRoute = createRoute({
  getParentRoute: () => gymOwnerLayoutRoute,
  path: "/add-gym",
  component: AddGym,
});