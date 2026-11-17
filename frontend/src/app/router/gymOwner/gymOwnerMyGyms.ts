import { createRoute } from "@tanstack/react-router";
import { gymOwnerLayoutRoute } from "@/app/router/gymOwner/gymOwnerLayoutRoute";
import MyGyms from "@/features/gym/pages/MyGyms";

export const gymOwnerMyGymsRoute = createRoute({
  getParentRoute: () => gymOwnerLayoutRoute,
  path: "/gyms",
  component: MyGyms,
});