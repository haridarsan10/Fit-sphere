import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "../rootRoute";
import { requireAdmin } from "../guards/requireAdmin";

export const adminRoute=createRoute({
  getParentRoute:()=>rootRoute,
  path:'/admin',
  beforeLoad:requireAdmin
})