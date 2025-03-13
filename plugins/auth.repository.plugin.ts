import { SymfonyAuthRepository } from "~/services/auth/repository/symfony.auth.repository";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  const authRepository = new SymfonyAuthRepository(
    config.public.apiUrl + "/auth"
  );

  return {
    provide: {
      authRepository,
    },
  };
});
