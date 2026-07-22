import { createRoute } from "@tanstack/react-router";
import { userRoute } from "./userRoute";
import UserLayout from "@/components/layouts/user-layout";

export const userLayoutRoute=createRoute({
  getParentRoute:()=>userRoute,
  id:"user-layout",
  component:UserLayout
})