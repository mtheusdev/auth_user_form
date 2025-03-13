<script setup>
definePageMeta({
  middleware: "auth",
});

const toast = useToast();
const router = useRouter();
const { currentUser, logout, error, isLoading } = useAuth();

const handleLogout = async () => {
  const success = await logout();

  if (success) {
    toast.add({
      title: "Logout efetuado com sucesso",
      description: "Até mais!",
      color: "success",
    });
    router.push("/auth/login");

    return;
  }

  toast.add({
    title: "Erro ao efetuar logout",
    description: error.value || "Ocorreu um erro ao tentar efetuar o logout",
    color: "error",
  });
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center">
    <div
      class="max-w-2xl w-full rounded-3xl bg-white shadow-2xl p-12 flex items-center justify-between gap-4"
    >
      <div class="flex flex-col items-start gap-4">
        <h2 class="text-3xl mt-4 font-normal text-gray-800 text-nowrap">
          Bem vindo, <b>{{ currentUser?.name }}</b
          >!
        </h2>

        <h3 class="text-gray-600 text-sm mt-4">
          "Consagre ao <b>Senhor</b> tudo o que você faz, e os seus planos serão
          bem-sucedidos" (Provérbios 16:3) 🙏
        </h3>

        <UButton
          @click="handleLogout"
          label="Sair"
          size="lg"
          color="secondary"
          variant="outline"
          class="shadow-xs px-6 py-2 mt-4"
          icon="ion:log-out"
          :loading="isLoading"
        />
      </div>
      <NuxtImg
        src="welcome.avif"
        alt="Logo"
        width="250"
        height="250"
        class="hidden sm:block"
      />
    </div>
  </div>
</template>
