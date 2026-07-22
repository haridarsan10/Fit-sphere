import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "@/app/router/rootRoute";
import { requireGymOwner } from "@/app/router/guards/requireGymOwner";

export const gymOwnerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/gym-owner",
  beforeLoad: requireGymOwner,
});