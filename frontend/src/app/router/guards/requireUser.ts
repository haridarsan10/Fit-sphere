import { redirect } from "@tanstack/react-router";
import { isAuthenticated } from "@/shared/utils/auth";
import { getCurrentUser } from "@/shared/utils/jwt";
import { getToken } from "@/shared/utils/auth";

export function requireUser() {
  if (!isAuthenticated()) {
    throw redirect({ to: "/login" });
  }

  const token = getToken()
  const user = getCurrentUser(token);

  if (!user || user.role !== "User") {
    throw redirect({ to: "/unauthorized" });
  }
}