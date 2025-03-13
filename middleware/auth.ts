import { useAuth } from "~/composables/useAuth";

export default defineNuxtRouteMiddleware(() => {
  const { isAuthenticated } = useAuth();

  if (import.meta.client) {
    console.log("isAuthenticated (client side):", isAuthenticated.value);

    if (!isAuthenticated.value) {
      return navigateTo("/auth/login");
    }
  }

  return;
});
