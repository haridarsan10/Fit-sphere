import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "../rootRoute";
import { requireUser } from "../guards/requireUser";

export const userRoute=createRoute({
  getParentRoute:()=>rootRoute,
  path:'/user',
  beforeLoad:requireUser
})