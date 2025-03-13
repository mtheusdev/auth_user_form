export default defineNuxtRouteMiddleware(() => {
  const { isAuthenticated } = useAuth();

  if (import.meta.client && !isAuthenticated.value) {
    return navigateTo("/auth/login", { replace: true });
  }
});
