import { createRoute } from "@tanstack/react-router";
import { gymOwnerLayoutRoute } from "./gymOwnerLayoutRoute";
import ManageGym from "@/features/gym/pages/ManageGymProfile";

export const gymOwnerManageGymRoute=createRoute({
  getParentRoute:()=>gymOwnerLayoutRoute,
  path:'/gyms/manage-gym/$gymId',
  component:ManageGym
})