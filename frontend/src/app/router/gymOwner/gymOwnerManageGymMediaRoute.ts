  import { createRoute } from "@tanstack/react-router";
  import { gymOwnerLayoutRoute } from "./gymOwnerLayoutRoute";
  import ManageGymMedia from "@/features/gym/pages/ManageGymMedia";
  
  export const gymOwnerManageGymMediaRoute=createRoute({
    getParentRoute:()=>gymOwnerLayoutRoute,
    path:'/gyms/media/$gymId',
    component:ManageGymMedia
  })