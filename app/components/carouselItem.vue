<template>
  <div
    class="cardWrapper absolute rounded-[40px] top-0 w-[550px] h-[727px] transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] cursor-pointer active:cursor-pointer overflow-hidden pointer-events-none select-none"
    :style="getCardStyle(indexCarouselItem)"
    @click="handleCardClick(indexCarouselItem)"
  >
    <!-- Свечение для активной карточки -->
    <div
      v-if="getCardStyle(indexCarouselItem).opacity == 1"
      class="absolute inset-0 z-0 bg-[radial-gradient(circle_at_-20%_60%,rgba(255,0,128,1),transparent_55%),radial-gradient(circle_at_130%_60%,rgba(233,200,37,1),transparent_55%),linear-gradient(135deg,#0c2545,#0e3a66)] rounded-[40px]"
    />

    <div class="cardItem relative flex flex-col h-full">
      <div class="flex items-center justify-between mt-10 mx-10">
        <div
          class="badge rounded-full w-14 h-14 flex items-center justify-center border border-[rgb(255, 255, 255, 0.05)] text-2xl"
        >
          🎤
        </div>
        <div class="flex items-center gap-3">
          <a :href="carouselItem.links.vk" target="_blank">
            <img class="w-11 h-11" src="/socials/vk.png" alt="vk" />
          </a>
          <a :href="carouselItem.links.telegram" target="_blank">
            <img class="w-11 h-11" src="/socials/telegram.png" alt="telegram" />
          </a>
          <a :href="carouselItem.links.rutube" target="_blank">
            <img class="w-11 h-11" src="/socials/rutube.png" alt="rutube" />
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
        <div class="px-8 py-6 z-10">
          <p class="text-gray-400">Имя блогера</p>
          <h3 class="font-bold text-4xl">{{ carouselItem.name }}</h3>
          <p class="text-gray-400 mt-4">Никнейм в соцсетях</p>
          <p class="text-[18px]">{{ carouselItem.nickname }}</p>
          <p class="text-gray-400 mt-4">Цитата ©</p>
          <p class="text-[18px] italic">«{{ carouselItem.quote }}»</p>
          <button
            class="mt-5 py-3 px-5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/80 hover:bg-white/20 hover:text-white transition-all duration-300"
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
import { computed, reactive } from 'vue';
import { useCarouselStore } from '~/stores/carousel.store.ts';
import type { ICarouselItem } from '~/types/carousel';

interface IProps {
  carouselItem: ICarouselItem;
  indexCarouselItem: number;
}

defineProps<IProps>();

const carouselStore = useCarouselStore();
const { handleCardClick } = carouselStore;
const { currentIndex, itemsCarousel } = storeToRefs(carouselStore);

const settingsCarousel = reactive({
  0: {
    transform: 'translateX(-142%) translateY(-16%) scale(0.7)',
    opacity: 0.4,
    rotate: '-11deg',
    zIndex: 20,
    filter: 'blur(5px)',
    left: '50%',
    pointerEvents: 'none',
  },
  1: {
    transform: `translateX(-108%)  translateY(-10%) scale(0.8)`,
    opacity: 0.5,
    zIndex: 30,
    rotate: '-7deg',
    filter: 'blur(1px)',
    left: '50%',
    pointerEvents: 'none',
  },
  2: {
    transform: `translateX(-50%) scale(1)`,
    opacity: 1,
    zIndex: 50,
    filter: 'blur(0px)',
    left: '50%',
    pointerEvents: 'auto',
  },
  3: {
    transform: 'translateX(10%) translateY(0%) scale(0.8)',
    opacity: 0.5,
    rotate: '7deg',
    zIndex: 30,
    filter: 'blur(1px)',
    left: '50%',
    pointerEvents: 'none',
  },
  4: {
    transform: 'translateX(45%) translateY(0%) scale(0.7)',
    opacity: 0.4,
    zIndex: 20,
    rotate: '11deg',
    filter: 'blur(5px)',
    left: '50%',
    pointerEvents: 'none',
  },
  5: {
    // transform: 'translateX(-170%) translateY(-20%) scale(0.6)',
    opacity: 0,
    rotate: '-15deg',
    zIndex: 10,
    filter: 'blur(7px)',
    left: '50%',
    pointerEvents: 'none',
  },
});

const getCardStyle = computed(() => {
  return (index: number) => {
    let diff = index - currentIndex.value;
    const total = itemsCarousel.value.length;

    // Корректировка для бесконечного цикла
    if (diff > Math.floor(total / 2) + 1) diff -= total;
    if (diff < -Math.floor(total / 2) + 1) diff += total;

    if (diff === 0) {
      return settingsCarousel[0];
    } else if (Math.abs(diff) === 1) {
      if (diff == -1) return settingsCarousel[5];
      return settingsCarousel[1];
    } else if (Math.abs(diff) === 2) {
      if (diff == -2) return settingsCarousel[5];
      return settingsCarousel[2];
    } else if (Math.abs(diff) === 3) {
      if (diff == -3) return settingsCarousel[5];
      return settingsCarousel[3];
    } else if (Math.abs(diff) === 4) {
      // if (diff == -4) return settingsCarousel[5];
      return settingsCarousel[4];
    } else {
      console.log(diff);
      return settingsCarousel[5];
    }
  };
});
</script>

<style lang="scss">
.cardWrapper {
  backdrop-filter: blur(10px);
  border: 1px solid rgb(255, 255, 255, 0.2);
}
.badge {
  position: relative;
  background: #101010;
  &::before {
    content: '';
    position: absolute;
    inset: -6px; /* толщина подсветки */
    border-radius: inherit;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0) 60%);
    filter: blur(4px); /* мягкое размытие */
    z-index: -1;
  }
}
</style>
