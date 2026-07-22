import { redirect } from "@tanstack/react-router";
import { isAuthenticated } from "@/shared/utils/auth";
import { getCurrentUser } from "@/shared/utils/jwt";
import { getToken } from "@/shared/utils/auth";

export function requireTrainer() {
  if (!isAuthenticated()) {
    throw redirect({ to: "/login" });
  }

  const token = getToken()
  const user = getCurrentUser(token);

  if (!user || user.role !== "Trainer") {
    throw redirect({ to: "/unauthorized" });
  }
}