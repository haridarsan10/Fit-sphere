import NotFoundPage from "@/features/common/pages/NotFoundPage";
import { createRootRoute } from "@tanstack/react-router";

export const rootRoute = createRootRoute({
  notFoundComponent:NotFoundPage
});
