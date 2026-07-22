import { redirect } from "@tanstack/react-router";
import { getToken, isAuthenticated } from "@/shared/utils/auth";
import { getCurrentUser } from "@/shared/utils/jwt";

export function requireGymOwner() {
  if (!isAuthenticated()) {
    throw redirect({ to: "/login" });
  }

  const token = getToken()
  const user = getCurrentUser(token);

  if (!user || user.role !== "Gymowner") {
    throw redirect({ to: "/unauthorized" });
  }
}