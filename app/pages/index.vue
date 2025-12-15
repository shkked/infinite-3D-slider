<template>
  <div>
    <carousel3D :data-carousel="carouselStore.itemsCarousel" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { useCarouselStore } from '~/stores/carousel.store.ts';

const carouselStore = useCarouselStore();
const scrollTop = ref(0);

onMounted(() => {
  carouselStore.checkDevice();
  window.addEventListener('resize', carouselStore.checkDevice);

  scrollTop.value = window.scrollY;

  // Блокируем прокрутку страницы
  document.body.style.position = 'fixed';
  document.body.style.top = `-${scrollTop.value}px`;
  document.body.style.width = '100%';
});

onUnmounted(() => {
  window.removeEventListener('resize', carouselStore.checkDevice);
});
</script>
