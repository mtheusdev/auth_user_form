<script setup lang="ts">
definePageMeta({
  layout: "auth",
});
import type { FormSubmitEvent } from "@nuxt/ui";
import { useAuth } from "~/composables/useAuth";
import { type LoginSchema, loginSchema } from "../../schemas/auth/login.schema";

const toast = useToast();
const router = useRouter();
const { login, isLoading, error } = useAuth();

const state = reactive({
  email: "",
  password: "",
  showPassword: false,
  rememberMe: false,
});

async function onSubmit(event: FormSubmitEvent<LoginSchema>) {
  const { email, password } = event.data;

  const success = await login({ email, password });

  if (success) {
    toast.add({
      title: "Login efetuado com sucesso",
      description: "Você será redirecionado para a home",
      color: "success",
    });
    router.push("/");

    return;
  }

  toast.add({
    title: "Erro de autenticação",
    description: error.value || "Ocorreu um erro ao tentar efetuar o login",
    color: "error",
  });
}
</script>

<template>
  <div class="flex flex-col items-center mb-8">
    <NuxtImg src="logo.png" alt="Logo" width="50" height="50" />
    <h2 class="text-2xl mt-4 font-bold text-gray-800">Bem vindo de volta</h2>
    <p class="text-gray-600 text-sm mt-1">Entre com suas credenciais</p>
  </div>

  <SocialButtons />

  <div class="relative flex items-center my-4">
    <div class="flex-grow border-t border-gray-300"></div>
    <span class="flex-shrink mx-4 text-gray-600 text-sm">ou</span>
    <div class="flex-grow border-t border-gray-300"></div>
  </div>

  <UForm :schema="loginSchema" :state="state" @submit="onSubmit">
    <UFormField required label="Email" name="email" class="mb-4">
      <UInput
        v-model="state.email"
        placeholder="Enter your email"
        size="xl"
        class="w-full"
        color="neutral"
      />
    </UFormField>

    <UFormField required label="Senha" name="password" class="mb-4">
      <PasswordInput v-model="state.password" placeholder="Digite sua senha" />
    </UFormField>

    <div class="flex items-center justify-between mb-8">
      <UCheckbox
        label="Lembrar-me"
        color="neutral"
        v-model="state.rememberMe"
      />

      <ULink
        as="button"
        href="#"
        class="text-sm text-secondary hover:text-secondary-500"
        >Esqueceu a senha?</ULink
      >
    </div>
    <UButton
      type="submit"
      color="neutral"
      size="xl"
      class="w-full"
      :loading="isLoading"
      >Entrar</UButton
    >
  </UForm>

  <p class="text-center mt-4 text-sm text-gray-600">
    Ainda não é membro?
    <NuxtLink
      to="/auth/register"
      class="font-medium text-secondary hover:text-secondary-500 hover:underline transition-all duration-300 ease-in-out"
      >Registre-se agora</NuxtLink
    >
  </p>
</template>
