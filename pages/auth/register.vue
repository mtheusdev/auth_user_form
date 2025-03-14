<script setup lang="ts">
definePageMeta({
  layout: "auth",
});

import type { FormSubmitEvent } from "@nuxt/ui";
import {
  type RegisterSchema,
  registerSchema,
} from "../../schemas/auth/register.schema";

const toast = useToast();
const router = useRouter();
const { register, isLoading, error } = useAuth();

const state = reactive({
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  showPassword: false,
  acceptTerms: false,
});

async function onSubmit(event: FormSubmitEvent<RegisterSchema>) {
  const { name, email, password } = event.data;

  const success = await register({ email, password, name });

  if (success) {
    toast.add({
      title: "Cadastro efetuado com sucesso",
      description: "Você será redirecionado para a home",
      color: "success",
    });
    router.push("/");

    return;
  }

  toast.add({
    title: "Erro de autenticação",
    description: error.value || "Ocorreu um erro ao tentar se cadastrar",
    color: "error",
  });
}
</script>

<template>
  <div class="flex flex-col items-center mb-8">
    <NuxtImg src="logo.png" alt="Logo" width="50" height="50" />
    <h2 class="text-2xl mt-4 font-bold text-gray-800">Crie sua conta</h2>
    <p class="text-gray-600 text-sm mt-1">
      Preencha os dados para se registrar
    </p>
  </div>
  <SocialButtons />

  <div class="relative flex items-center my-4">
    <div class="flex-grow border-t border-gray-300"></div>
    <span class="flex-shrink mx-4 text-gray-600 text-sm">ou</span>
    <div class="flex-grow border-t border-gray-300"></div>
  </div>

  <UForm :schema="registerSchema" :state="state" @submit="onSubmit" novalidate>
    <UFormField required label="Nome" name="name" class="mb-4">
      <UInput
        v-model="state.name"
        placeholder="Digite seu nome"
        size="xl"
        class="w-full"
        color="neutral"
      />
    </UFormField>

    <UFormField required label="Email" name="email" class="mb-4">
      <UInput
        v-model="state.email"
        placeholder="Digite seu email"
        size="xl"
        class="w-full"
        color="neutral"
      />
    </UFormField>

    <UFormField required label="Senha" name="password" class="mb-4">
      <PasswordInput v-model="state.password" placeholder="Digite sua senha" />
    </UFormField>

    <UFormField
      required
      label="Confirmar Senha"
      name="confirmPassword"
      class="mb-4"
    >
      <UInput
        v-model="state.confirmPassword"
        placeholder="Confirme sua senha"
        :type="state.showPassword ? 'text' : 'password'"
        class="w-full"
        size="xl"
        color="neutral"
      />
    </UFormField>

    <UFormField required name="acceptTerms" class="mb-6">
      <UCheckbox
        required
        label="Aceito os termos e condições"
        v-model="state.acceptTerms"
        color="neutral"
      />
    </UFormField>

    <UButton
      type="submit"
      color="neutral"
      size="xl"
      class="w-full"
      :loading="isLoading"
      >Registrar</UButton
    >
  </UForm>

  <p class="text-center mt-4 text-sm text-gray-600">
    Já tem uma conta?
    <NuxtLink
      to="/auth/login"
      class="font-medium text-secondary hover:text-secondary-500 hover:underline transition-all duration-300 ease-in-out"
    >
      Acesse agora
    </NuxtLink>
  </p>
</template>
