import { createRoute } from "@tanstack/react-router";
import GymOwnerLayout from "@/components/layouts/gymowner-layout";
import { gymOwnerRoute } from "@/app/router/gymOwner/gymOwnerRoute";

export const gymOwnerLayoutRoute = createRoute({
  getParentRoute: () => gymOwnerRoute,
  id:"gymowner-layout",
  component: GymOwnerLayout,
});
