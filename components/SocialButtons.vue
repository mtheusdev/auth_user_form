<script setup lang="ts">
const socialIcons = [
  { icon: "ion:logo-google" },
  { icon: "ion:logo-facebook" },
  { icon: "ion:logo-linkedin" },
];
</script>

<template>
  <div class="grid grid-cols-3 gap-3 mb-8">
    <UButton
      v-for="(social, index) in socialIcons"
      :key="index"
      :icon="social.icon"
      size="lg"
      color="neutral"
      variant="outline"
      class="shadow-xs"
    />
  </div>
</template>
