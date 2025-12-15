<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useHead } from '#imports';

useHead({
  title: 'Бесконечная 3D карусель',
  meta: [{ name: 'description', content: 'Бесконечная 3D карусель' }],
});
</script>

<style>
body {
  background-color: rgba(22, 22, 22, 1);
}
</style>
