import { createRoute } from "@tanstack/react-router";
import { trainerRoute } from "./trainerRoute";
import TrainerLayout from "@/components/layouts/trainer-layout";

export const trainerLayouteRoute=createRoute({
  getParentRoute:()=>trainerRoute,
  id:'trainer-Layout',
  component:TrainerLayout
})