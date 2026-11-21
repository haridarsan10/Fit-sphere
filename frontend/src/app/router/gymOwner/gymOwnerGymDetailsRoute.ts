import { createRoute } from "@tanstack/react-router";
import { gymOwnerLayoutRoute } from "./gymOwnerLayoutRoute";
import GymDetails from "@/features/gym/pages/GymDetails";

export const gymOwnerGymDetailsRoute=createRoute({
  getParentRoute:()=>gymOwnerLayoutRoute,
  path:'/gyms/$gymId',
  component:GymDetails
})