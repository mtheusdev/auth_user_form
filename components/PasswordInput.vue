<script setup lang="ts">
defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: "Password",
  },
});

const showPassword = ref(false);

defineEmits(["update:modelValue"]);
</script>

<template>
  <UInput
    :model-value="modelValue"
    :type="showPassword ? 'text' : 'password'"
    :placeholder="placeholder"
    class="w-full"
    :ui="{ trailing: 'pe-1' }"
    size="xl"
    color="neutral"
    @update:model-value="(value) => $emit('update:modelValue', value)"
  >
    <template #trailing>
      <UButton
        color="neutral"
        variant="link"
        size="sm"
        :icon="showPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'"
        @click="showPassword = !showPassword"
      />
    </template>
  </UInput>
</template>
