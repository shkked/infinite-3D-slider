<template>
  <div>
    <div
      class="relative flex items-center justify-center mt-5"
      @mousedown="carouselStore.handleDragStart"
      @mouseup="carouselStore.isDragging = false"
      @mousemove="carouselStore.handleDragMove"
      @mouseleave="carouselStore.isDragging = false"
      @touchstart="carouselStore.handleDragStart"
      @touchmove="carouselStore.handleDragMove"
      @touchend="carouselStore.isDragging = false"
    >
      <carouselItem
        v-for="(carouselItem, indexCarouselItem) in dataCarousel"
        :key="carouselItem.id"
        :carousel-item="carouselItem"
        :index-carousel-item="indexCarouselItem"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCarouselStore } from '~/stores/carousel.store.ts';
import type { ICarousel } from '~/types/carousel';

defineProps<ICarousel>();

const carouselStore = useCarouselStore();
</script>

<style scoped></style>
