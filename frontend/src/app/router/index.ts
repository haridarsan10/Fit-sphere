import { createRootRoute, createRoute, createRouter } from "@tanstack/react-router";
import LoginPage from "../../features/auth/pages/LoginPage";
import RegisterPage from "@/features/auth/pages/RegisterPage";

const rootRoute=createRootRoute()

const loginRoute=createRoute({
  getParentRoute:()=>rootRoute,
  path:'/login',
  component:LoginPage
})

const registerRoute=createRoute({
  getParentRoute:()=>rootRoute,
  path:'/register',
  component:RegisterPage
})


const routeTree=rootRoute.addChildren([loginRoute,registerRoute])

export const router=createRouter({routeTree})