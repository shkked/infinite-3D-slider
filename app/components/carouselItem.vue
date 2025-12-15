<template>
  <div
    class="cardWrapper absolute rounded-[40px] top-0 w-[240px] h-[650px] sm:w-[450px] sm:h-[600px] lg:w-[550px] lg:h-[727px] transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] cursor-pointer active:cursor-pointer overflow-hidden pointer-events-none select-none"
    :class="{
      'bg-gradient-to-r from-transparent via-[rgba(0,246,255,1)]/40 to-[rgba(109,233,37,1)]/80':
        !isCardActive(indexCarouselItem),
    }"
    :style="getCardStyle(indexCarouselItem)"
    @click="handleCardClick(indexCarouselItem)"
  >
    <!-- Свечение для активной карточки -->
    <div
      v-if="isCardActive(indexCarouselItem)"
      class="absolute inset-0 z-0 bg-[radial-gradient(circle_at_-20%_60%,rgba(255,0,128,1),transparent_55%),radial-gradient(circle_at_130%_60%,rgba(233,200,37,1),transparent_55%),linear-gradient(135deg,#0c2545,#0e3a66)] rounded-[40px]"
    />

    <div class="cardItem relative flex flex-col h-full">
      <div class="flex sm:flex-row items-center justify-between mt-4 sm:mt-10 mx-4 sm:mx-10">
        <div
          class="badge backdrop-blur-sm rounded-full w-10 h-10 sm:w-14 sm:h-14 flex items-center justify-center border border-[rgb(255, 255, 255, 0.05)] text-xl sm:text-2xl"
        >
          🎤
        </div>
        <div class="flex items-center gap-1 sm:gap-3">
          <a :href="carouselItem.links.vk" target="_blank">
            <img class="w-8 h-8 sm:w-11 sm:h-11" src="/socials/vk.png" alt="vk" />
          </a>
          <a :href="carouselItem.links.telegram" target="_blank">
            <img class="w-8 h-8 sm:w-11 sm:h-11" src="/socials/telegram.png" alt="telegram" />
          </a>
          <a :href="carouselItem.links.rutube" target="_blank">
            <img class="w-8 h-8 sm:w-11 sm:h-11" src="/socials/rutube.png" alt="rutube" />
          </a>
        </div>
      </div>
      <div class="relative flex flex-col justify-end h-[100%]">
        <img
          :src="'/artists/' + carouselItem.imageURL"
          :alt="carouselItem.name"
          class="absolute w-100 h-100 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-h-[100%] scale-[1.2] object-contain pointer-events-none"
        />
        <!-- overlay между картинкой и текстом -->
        <div
          class="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-[rgb(46,96,164)] via-[rgba(46,96,164,0.9)] to-transparent pointer-events-none z-0"
        />
        <div class="px-4 sm:px-8 py-6 z-10">
          <!-- {{ indexCarouselItem }}
          <br />
          {{ indexCarouselItem - currentIndex }} -->
          <p class="text-gray-400 font-[NeueMontreal,sans-serif] transition-none">Имя блогера</p>
          <h3 class="text-4xl font-[NeueMontreal,sans-serif] transition-none">{{ carouselItem.name }}</h3>
          <p class="text-gray-400 mt-4 font-[NeueMontreal,sans-serif] transition-none">Никнейм в соцсетях</p>
          <p class="text-[18px] font-[NeueMontreal,sans-serif] transition-none">{{ carouselItem.nickname }}</p>
          <p class="text-gray-400 mt-4 font-[NeueMontreal,sans-serif] transition-none">Цитата ©</p>
          <p class="text-[18px] italic font-[NeueMontrealSemiBoldItalic,sans-serif] transition-none">
            « {{ carouselItem.quote }}.»
          </p>
          <button
            class="mt-5 py-3 w-full sm:w-auto px-5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/80 hover:bg-white/20 hover:text-white font-[NeueMontreal,sans-serif] transition-none"
          >
            Узнать больше
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { useCarouselStore } from '~/stores/carousel.store.ts';
import type { ICarouselItem } from '~/types/carousel';

interface IProps {
  carouselItem: ICarouselItem;
  indexCarouselItem: number;
}

defineProps<IProps>();

const carouselStore = useCarouselStore();
const { handleCardClick, isCardActive } = carouselStore;
const { currentIndex, itemsCarousel, settingsCarousel, isMobile, isTablet } = storeToRefs(carouselStore);

// Функция для получения стиля карточки в зависимости от её индекса
const getCardStyle = computed(() => {
  return (index: number) => {
    let diff = index - currentIndex.value;
    const total = itemsCarousel.value.length;

    // Корректировка для бесконечного цикла
    if (diff > Math.floor(total / 2) + 1) diff -= total;
    if (diff < -Math.floor(total / 2) + 1) diff += total;

    // Настройки для мобильной версии
    if (isMobile.value) {
      if (diff === 0) {
        return { ...settingsCarousel.value[1], transform: `translateX(-108%)  translateY(-5%) scale(0.8)` };
      } else if (Math.abs(diff) === 1) {
        if (diff == -1) return settingsCarousel.value[5];
        return settingsCarousel.value[2];
      } else if (Math.abs(diff) === 2) {
        if (diff == -2) return settingsCarousel.value[5];
        return settingsCarousel.value[3];
      } else {
        return settingsCarousel.value[5];
      }
    }
    // Настройки для планшетной версии
    if (isTablet.value) {
      if (diff === 0) {
        return settingsCarousel.value[1];
      } else if (Math.abs(diff) === 1) {
        if (diff == -1) return settingsCarousel.value[5];
        return settingsCarousel.value[2];
      } else if (Math.abs(diff) === 2) {
        if (diff == -2) return settingsCarousel.value[5];
        return settingsCarousel.value[3];
      } else {
        return settingsCarousel.value[5];
      }
    }
    // Настройки для десктопной версии
    if (diff === 0) {
      return settingsCarousel.value[0];
    } else if (Math.abs(diff) === 1) {
      if (diff == -1) return settingsCarousel.value[5];
      return settingsCarousel.value[1];
    } else if (Math.abs(diff) === 2) {
      if (diff == -2) return settingsCarousel.value[5];
      return settingsCarousel.value[2];
    } else if (Math.abs(diff) === 3) {
      if (diff == -3) return settingsCarousel.value[5];
      return settingsCarousel.value[3];
    } else if (Math.abs(diff) === 4) {
      return settingsCarousel.value[4];
    } else {
      return settingsCarousel.value[5];
    }
  };
});
</script>

<style lang="scss">
.cardWrapper {
  backdrop-filter: blur(10px);
  border: 1px solid rgb(255, 255, 255, 0.2);
}
</style>
