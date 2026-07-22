import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "@/app/router/rootRoute";
import { requireTrainer } from "@/app/router/guards/requireTrainer";

export const trainerRoute=createRoute({
  getParentRoute:()=>rootRoute,
  path:'/trainer',
  beforeLoad:requireTrainer
})