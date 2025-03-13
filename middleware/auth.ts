import { useAuth } from "~/composables/useAuth";

export default defineNuxtRouteMiddleware(() => {
  const { isAuthenticated } = useAuth();

  if (import.meta.client) {
    if (!isAuthenticated.value) {
      return navigateTo("/auth/login", {
        replace: true,
      });
    }
  }

  return;
});
