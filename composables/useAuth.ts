import { computed, ref } from "vue";
import type { User } from "~/models/user.model";
import { AuthService } from "~/services/auth/auth.service";

const currentUser = ref<User | null>(null);
const isLoading = ref(false);
const error = ref<string | null>(null);

export function useAuth() {
  const { $authRepository } = useNuxtApp();
  const authService = new AuthService($authRepository);

  const isAuthenticated = computed(() => authService.isAuthenticated());

  async function initialize() {
    isLoading.value = true;
    error.value = null;

    try {
      currentUser.value = await authService.getCurrentUser();
    } catch (err) {
      error.value = "Falha ao inicializar autenticação";
      console.error(err);
    } finally {
      isLoading.value = false;
    }
  }

  async function login(email: string, password: string) {
    isLoading.value = true;
    error.value = null;

    try {
      currentUser.value = await authService.login(email, password);
      return true;
    } catch (err) {
      error.value = "Falha ao fazer login";
      console.error(err);
      return false;
    } finally {
      isLoading.value = false;
    }
  }

  async function register(userData: Partial<User>) {
    isLoading.value = true;
    error.value = null;

    try {
      currentUser.value = await authService.register(userData);
      return true;
    } catch (err) {
      error.value = "Falha ao registrar usuário";
      console.error(err);
      return false;
    } finally {
      isLoading.value = false;
    }
  }

  async function logout() {
    isLoading.value = true;
    error.value = null;

    try {
      await authService.logout();
      currentUser.value = null;
      return true;
    } catch (err) {
      error.value = "Falha ao fazer logout";
      console.error(err);
      return false;
    } finally {
      isLoading.value = false;
    }
  }

  return {
    currentUser,
    isAuthenticated,
    isLoading,
    error,
    initialize,
    login,
    register,
    logout,
  };
}
