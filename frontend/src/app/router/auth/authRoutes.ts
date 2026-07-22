import { createRoute } from "@tanstack/react-router";
import LoginPage from "@/features/auth/pages/LoginPage";
import RegisterPage from "@/features/auth/pages/RegisterPage";
import UnauthorizedPage from "@/features/auth/pages/UnauthorizedPage";
import { Home } from "@/features/auth/pages/HomePage";
import { VerifyOtpPage } from "@/features/auth/pages/VerifyOtpPage";
import { rootRoute } from "@/app/router/rootRoute";
import z from "zod";
import { requireGuest } from "../guards/requireGuest";

export const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: LoginPage,
  beforeLoad:requireGuest
});

export const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/register",
  component: RegisterPage,
  beforeLoad:requireGuest
});

export const verifyOtpRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/verify-otp",
  validateSearch: z.object({
    ownerId: z.string(),
  }),
  component: VerifyOtpPage,
});


export const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});

export const unauthorizedRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/unauthorized",
  component: UnauthorizedPage,
});

export const authRoutes = [loginRoute, registerRoute,verifyOtpRoute,unauthorizedRoute,homeRoute];