<script setup lang="ts">
import type { FormSubmitEvent } from "@nuxt/ui";
import {
  type RegisterSchema,
  registerSchema,
} from "../../schemas/auth/register.schema";

const state = reactive({
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  showPassword: false,
  acceptTerms: false,
});

async function onSubmit(event: FormSubmitEvent<RegisterSchema>) {
  console.log(event.data);
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="max-w-xl w-full rounded-3xl bg-white shadow-2xl p-12">
      <div class="flex flex-col items-center mb-8">
        <NuxtImg src="logo.png" alt="Logo" width="50" height="50" />
        <h2 class="text-2xl mt-4 font-bold text-gray-800">Crie sua conta</h2>
        <p class="text-gray-600 text-sm mt-1">
          Preencha os dados para se registrar
        </p>
      </div>

      <UForm
        :schema="registerSchema"
        :state="state"
        @submit="onSubmit"
        novalidate
      >
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
          <UInput
            v-model="state.password"
            placeholder="Senha"
            :type="state.showPassword ? 'text' : 'password'"
            class="w-full"
            :ui="{ trailing: 'pe-1' }"
            size="xl"
            color="neutral"
          >
            <template #trailing>
              <UButton
                color="neutral"
                variant="link"
                size="sm"
                :icon="state.showPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                @click="state.showPassword = !state.showPassword"
              />
            </template>
          </UInput>
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

        <UButton type="submit" color="neutral" size="xl" class="w-full"
          >Registrar</UButton
        >
      </UForm>

      <p class="text-center mt-4 text-sm text-gray-600">
        Já tem uma conta?
        <NuxtLink
          to="/auth/login"
          class="font-medium text-secondary hover:text-secondary-500 hover:underline transition-all duration-300 ease-in-out"
        >
          Faça login aqui
        </NuxtLink>
      </p>
    </div>
  </div>
</template>
