<template>
  <div>
    <carousel3D :data-carousel="carouselStore.itemsCarousel" />
  </div>
</template>

<script setup lang="ts">
import { useCarouselStore } from '~/stores/carousel.store.ts';

const carouselStore = useCarouselStore();
</script>

<style></style>
