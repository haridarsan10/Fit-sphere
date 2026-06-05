import { createRootRoute, createRoute, createRouter } from "@tanstack/react-router";
import LoginPage from "../../features/auth/pages/LoginPage";
import RegisterPage from "@/features/auth/pages/RegisterPage";
import { VerifyOtpPage } from "@/features/auth/pages/VerifyOtpPage";

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

const verifyOtpRoute=createRoute({
  getParentRoute:()=>rootRoute,
  path:'/verify-otp',
  component:VerifyOtpPage
})



const routeTree=rootRoute.addChildren([loginRoute,registerRoute,verifyOtpRoute])

export const router=createRouter({routeTree})