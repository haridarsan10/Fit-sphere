import { createRouter } from "@tanstack/react-router";
import { rootRoute } from "@/app/router/rootRoute";
import { authRoutes } from "@/app/router/auth/authRoutes";
import { gymOwner_routes } from "@/app/router/gymOwner/gymOwner_routes";
import { user_routes } from "@/app/router/user/user_routes";
import { trainer_routes } from "@/app/router/trainer/trainer_routes";

const routeTree = rootRoute.addChildren([
  ...authRoutes,
  gymOwner_routes,
  user_routes,
  trainer_routes
]);



export const router = createRouter({
  routeTree
});
