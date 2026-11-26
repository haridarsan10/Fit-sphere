
import type { AppRole } from "@/shared/types/role/role";

export function normalizeRole(
  role?: string | null
): AppRole | null {

  switch (role?.toLowerCase()) {

    case "user":
      return "User";

    case "gymowner":
    case "gym_owner":
      return "Gymowner";

    case "trainer":
      return "Trainer";

     case "admin":
      return "Admin";  

    default:
      return null;
  }
}
