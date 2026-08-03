import NotFoundPage from "@/features/common/pages/NotFoundPage";
import ErrorPage from "@/shared/pages/ErrorPage";
import { createRootRoute } from "@tanstack/react-router";

export const rootRoute = createRootRoute({
  notFoundComponent:NotFoundPage,
  errorComponent:ErrorPage
});
