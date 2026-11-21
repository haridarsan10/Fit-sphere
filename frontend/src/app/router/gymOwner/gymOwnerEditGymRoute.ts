import { createRoute } from "@tanstack/react-router";
import { gymOwnerLayoutRoute } from "./gymOwnerLayoutRoute";
import EditGym from "@/features/gym/pages/EditGym";

export const gymOwnerEditGymRoute=createRoute({
  getParentRoute:()=>gymOwnerLayoutRoute,
  path:'/gyms/edit-gym/$gymId',
  component:EditGym
})