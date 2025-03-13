<template>
  <UContainer>
    <NuxtLoadingIndicator />
    <NuxtLayout>
      <UApp :toaster="{ position: 'top-right', duration: 5000 }">
        <NuxtPage />
      </UApp>
    </NuxtLayout>
  </UContainer>
</template>
