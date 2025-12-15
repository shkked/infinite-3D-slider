<!-- components/Carousel3D.vue -->
<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';

interface Card {
  id: number;
  name: string;
  nickname: string;
  role: string;
  quote: string;
  image: string;
  backgroundImage: string;
  social: {
    instagram?: string;
    youtube?: string;
    telegram?: string;
    vk?: string;
  };
}

const cards = ref<Card[]>([
  {
    id: 1,
    name: 'Василий Вакуленко',
    nickname: 'Баста / Noggano',
    role: 'Музыкант, продюсер',
    quote: 'Свои — не те, кто слушают, а те, кто слышат.',
    image: '/avatars/basta.jpg',
    backgroundImage: '/backgrounds/basta-bg.jpg',
    social: {
      instagram: '@basta',
      youtube: 'Баста',
      telegram: 'basta_official',
    },
  },
  {
    id: 2,
    name: 'Ольга В. Воздалева',
    nickname: 'olga.vozdalena',
    role: 'Дизайнер интерьеров',
    quote: 'К чему это приведёт и что значит?',
    image: '/avatars/olga.jpg',
    backgroundImage: '/backgrounds/olga-bg.jpg',
    social: {
      instagram: '@olga.vozdalena',
      telegram: 'olga_interior',
    },
  },
  {
    id: 3,
    name: 'Катя Адушкина',
    nickname: 'kate_adu',
    role: 'Бьюти-блогер',
    quote: 'Красота начинается с уверенности в себе',
    image: '/avatars/kate.jpg',
    backgroundImage: '/backgrounds/kate-bg.jpg',
    social: {
      instagram: '@kate_adu',
      youtube: 'Катя Адушкина',
    },
  },
  {
    id: 4,
    name: 'Металлы опасности',
    nickname: 'metal.danger',
    role: 'Музыкальная группа',
    quote: 'Наша музыка — это крик души',
    image: '/avatars/metal.jpg',
    backgroundImage: '/backgrounds/metal-bg.jpg',
    social: {
      instagram: '@metal.danger',
      youtube: 'Металлы опасности',
      vk: 'metal_danger',
    },
  },
  {
    id: 5,
    name: 'Обязатель дизайнов',
    nickname: 'design.oblig',
    role: 'Дизайн-студия',
    quote: 'Каждый проект — это новая история',
    image: '/avatars/design.jpg',
    backgroundImage: '/backgrounds/design-bg.jpg',
    social: {
      instagram: '@design.oblig',
      telegram: 'design_oblig',
    },
  },
  {
    id: 6,
    name: 'Иван Дорн',
    nickname: 'IVAN DORN',
    role: 'Музыкант',
    quote: 'Музыка — это не работа, это любовь.',
    image: '/avatars/dorn.jpg',
    backgroundImage: '/backgrounds/dorn-bg.jpg',
    social: {
      instagram: '@ivandorn',
      youtube: 'Ivan Dorn',
    },
  },
  {
    id: 7,
    name: 'Мирон Фёдоров',
    nickname: 'Oxxxymiron',
    role: 'Рэп-исполнитель',
    quote: 'Интеллект — это новая роскошь.',
    image: '/avatars/oxxxy.jpg',
    backgroundImage: '/backgrounds/oxxxy-bg.jpg',
    social: {
      instagram: '@norimyxxxo',
      youtube: 'Oxxxymiron',
    },
  },
]);

const currentIndex = ref(0);
const isDragging = ref(false);
const startX = ref(0);
const startY = ref(0);
const containerRef = ref<HTMLElement>();
const isMobile = ref(false);

// Определение мобильного устройства
const checkMobile = () => {
  isMobile.value = window.innerWidth < 768;
};

// Функция для определения, активна ли карточка
const isCardActive = (index: number) => {
  return index === currentIndex.value;
};

// Позиционирование карточек с наклоном
const getCardStyle = computed(() => (index: number) => {
  const total = cards.value.length;
  let diff = index - currentIndex.value;

  // Корректировка для бесконечного цикла
  if (diff > Math.floor(total / 2)) diff -= total;
  if (diff < -Math.floor(total / 2)) diff += total;

  // Для мобильных
  if (isMobile.value) {
    if (diff === 0) {
      return {
        transform: 'translateX(-50%) rotateY(0deg) scale(1)',
        opacity: 1,
        zIndex: 50,
        filter: 'blur(0px)',
        left: '50%',
        pointerEvents: 'auto',
        backdropFilter: 'blur(20px)',
      };
    } else if (Math.abs(diff) === 1) {
      const translateX = diff === -1 ? '-85%' : '15%';
      return {
        transform: `translateX(-50%) translateX(${translateX}) rotateY(${diff * 30}deg) scale(0.8)`,
        opacity: 0.4,
        zIndex: 30,
        filter: 'blur(4px)',
        left: '50%',
        pointerEvents: 'none',
        backdropFilter: 'blur(10px)',
      };
    } else {
      return {
        transform: 'translateX(-50%) rotateY(0deg) scale(0.6)',
        opacity: 0,
        zIndex: 10,
        filter: 'blur(8px)',
        left: '50%',
        pointerEvents: 'none',
        backdropFilter: 'blur(5px)',
      };
    }
  }

  // Для десктопа
  if (diff === 0) {
    return {
      transform: 'translateX(-50%) rotateY(0deg) scale(1)',
      opacity: 1,
      zIndex: 50,
      filter: 'blur(0px)',
      left: '50%',
      pointerEvents: 'auto',
      backdropFilter: 'blur(20px)',
    };
  } else if (Math.abs(diff) === 1) {
    const translateX = diff * 180;
    return {
      transform: `translateX(-50%) translateX(${translateX}px) rotateY(${diff * 25}deg) scale(0.85)`,
      opacity: 0.6,
      zIndex: 40,
      filter: 'blur(2px)',
      left: '50%',
      pointerEvents: 'none',
      backdropFilter: 'blur(15px)',
    };
  } else if (Math.abs(diff) === 2) {
    const translateX = diff * 320;
    return {
      transform: `translateX(-50%) translateX(${translateX}px) rotateY(${diff * 35}deg) scale(0.7)`,
      opacity: 0.3,
      zIndex: 30,
      filter: 'blur(4px)',
      left: '50%',
      pointerEvents: 'none',
      backdropFilter: 'blur(10px)',
    };
  } else if (Math.abs(diff) === 3) {
    const translateX = diff * 400;
    return {
      transform: `translateX(-50%) translateX(${translateX}px) rotateY(${diff * 40}deg) scale(0.6)`,
      opacity: 0.1,
      zIndex: 20,
      filter: 'blur(6px)',
      left: '50%',
      pointerEvents: 'none',
      backdropFilter: 'blur(5px)',
    };
  } else {
    return {
      transform: 'translateX(-50%) rotateY(0deg) scale(0.5)',
      opacity: 0,
      zIndex: 10,
      filter: 'blur(8px)',
      left: '50%',
      pointerEvents: 'none',
      backdropFilter: 'blur(3px)',
    };
  }
});

// Обработчики для drag/swipe
const handleDragStart = (e: MouseEvent | TouchEvent) => {
  isDragging.value = true;
  startX.value = 'touches' in e ? e.touches[0].pageX : e.pageX;
  startY.value = 'touches' in e ? e.touches[0].pageY : e.pageY;
};

const handleDragMove = (e: MouseEvent | TouchEvent) => {
  if (!isDragging.value) return;
  e.preventDefault();

  const x = 'touches' in e ? e.touches[0].pageX : e.pageX;
  const y = 'touches' in e ? e.touches[0].pageY : e.pageY;
  const deltaX = x - startX.value;
  const deltaY = y - startY.value;

  // Проверяем, что движение в основном по горизонтали
  if (Math.abs(deltaX) > Math.abs(deltaY) * 1.5) {
    if (deltaX > 50) {
      navigate('prev');
      isDragging.value = false;
    } else if (deltaX < -50) {
      navigate('next');
      isDragging.value = false;
    }
  }
};

const navigate = (direction: 'prev' | 'next') => {
  if (direction === 'next') {
    currentIndex.value = (currentIndex.value + 1) % cards.value.length;
  } else {
    currentIndex.value = (currentIndex.value - 1 + cards.value.length) % cards.value.length;
  }
};

// Обработчик клика по карточке - активирует карточку
const handleCardClick = (index: number) => {
  if (isCardActive(index)) return;
  currentIndex.value = index;
};

// Обработчик клика по кнопке "Узнать больше"
const handleLearnMore = (card: Card) => {
  console.log('Подробнее о:', card.name);
  // Здесь можно добавить логику открытия модального окна или перехода на страницу
};

// Обработчик клика по соцсетям
const handleSocialClick = (url: string, platform: string) => {
  console.log(`Открываем ${platform}:`, url);
  // Здесь можно открыть ссылку в новом окне
  window.open(url, '_blank');
};

// Автопрокрутка
let autoScrollInterval: NodeJS.Timeout;

onMounted(() => {
  checkMobile();
  window.addEventListener('resize', checkMobile);

  // autoScrollInterval = setInterval(() => {
  //   navigate('next');
  // }, 5000);
});

onUnmounted(() => {
  // clearInterval(autoScrollInterval);
  window.removeEventListener('resize', checkMobile);
});
</script>

<template>
  <!-- Основной контейнер с анимированным фоном -->
  <div class="relative w-full min-h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900">
    <!-- Анимированный градиентный фон -->
    <div class="absolute inset-0 opacity-40">
      <div
        class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-500/20 via-transparent to-purple-500/20 animate-gradient-shift"
      />
      <div class="absolute inset-0 bg-gradient-to-br from-blue-900/15 via-transparent to-pink-900/15" />
    </div>

    <!-- Плавающие частицы -->
    <div class="absolute inset-0 overflow-hidden">
      <div
        v-for="i in 20"
        :key="i"
        class="absolute rounded-full bg-gradient-to-r from-cyan-500/10 to-purple-500/10"
        :style="{
          width: `${Math.random() * 200 + 50}px`,
          height: `${Math.random() * 200 + 50}px`,
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          animation: `float ${Math.random() * 20 + 10}s linear infinite`,
          animationDelay: `${Math.random() * 5}s`,
          filter: 'blur(40px)',
        }"
      />
    </div>

    <!-- Контент -->
    <div class="relative z-10 w-full max-w-6xl mx-auto py-10 md:py-20 px-4">
      <!-- Заголовок -->
      <div class="text-center mb-8 md:mb-16">
        <h1 class="text-3xl md:text-5xl font-bold text-white mb-4">
          Топ
          <span
            class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 animate-text-gradient"
          >
            блогеры
          </span>
        </h1>
        <p class="text-gray-300 text-lg md:text-xl">Исследуйте самых влиятельных создателей контента</p>
      </div>

      <!-- Карусель -->
      <div
        ref="containerRef"
        class="relative h-[500px] md:h-[650px] perspective-2000"
        @mousedown="handleDragStart"
        @touchstart="handleDragStart"
        @mousemove="handleDragMove"
        @touchmove="handleDragMove"
        @mouseup="isDragging = false"
        @mouseleave="isDragging = false"
        @touchend="isDragging = false"
      >
        <!-- Карточки -->
        <div
          v-for="(card, index) in cards"
          :key="card.id"
          class="absolute top-0 w-[300px] md:w-[380px] h-[450px] md:h-[550px] transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] cursor-pointer"
          :class="{
            'cursor-pointer': isCardActive(index),
            'cursor-default': !isCardActive(index),
          }"
          :style="getCardStyle(index)"
          @click="handleCardClick(index)"
        >
          <!-- Свечение для активной карточки -->
          <div
            v-if="isCardActive(index)"
            class="absolute -inset-4 bg-gradient-to-r from-cyan-500/15 via-purple-500/10 to-pink-500/15 rounded-3xl blur-2xl animate-pulse-slow"
          />

          <!-- Карточка с градиентным переходом -->
          <div class="relative h-full rounded-2xl overflow-hidden group transform-style-3d">
            <!-- Фоновое изображение с плавным переходом -->
            <div class="absolute inset-0">
              <img
                :src="card.backgroundImage"
                :alt="card.name"
                class="w-full h-full object-cover transition-all duration-700"
                :class="{
                  'scale-105 group-hover:scale-110': isCardActive(index),
                  'scale-100': !isCardActive(index),
                }"
              />
              <!-- Плавный градиентный переход от изображения к темному фону -->
              <div class="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-black/95" />
            </div>

            <!-- Дополнительный затемняющий слой для лучшей читаемости текста -->
            <div class="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/80" />

            <!-- Эффект свечения по краям -->
            <div
              v-if="isCardActive(index)"
              class="absolute -inset-[1px] bg-gradient-to-r from-cyan-500/20 via-purple-500/10 to-pink-500/20 rounded-2xl"
            />

            <!-- Внутренняя тень для глубины -->
            <div class="absolute inset-0 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] rounded-2xl" />

            <!-- Контент карточки -->
            <div class="relative z-10 h-full p-6 md:p-8 flex flex-col">
              <!-- Аватар (поверх фонового изображения) -->
              <div class="flex justify-center -mt-8 mb-4 md:mb-6">
                <div
                  class="relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 md:border-3 border-white/30 group-hover:border-white/50 transition-all duration-300"
                >
                  <img :src="card.image" :alt="card.name" class="w-full h-full object-cover" />
                  <!-- Свечение аватара -->
                  <div
                    class="absolute inset-0 border-2 border-transparent rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20"
                  />
                </div>
              </div>

              <!-- Верхняя часть с именем -->
              <div class="mb-4 md:mb-6 text-center">
                <div class="text-gray-300/80 text-xs md:text-sm font-medium mb-1 uppercase tracking-wider">
                  Имя блогера
                </div>
                <h3 class="text-xl md:text-2xl font-bold text-white leading-tight">
                  {{ currentIndex }}
                  <br />
                  {{ index - currentIndex }}
                  {{ card.name }}
                </h3>
                <div class="h-px w-16 bg-gradient-to-r from-cyan-500 to-purple-500 mt-2 mx-auto" />
              </div>

              <!-- Никнейм -->
              <div class="mb-4 md:mb-6 text-center">
                <div class="text-gray-300/80 text-xs md:text-sm font-medium mb-1 uppercase tracking-wider">
                  Никнейм в соцсетях
                </div>
                <p
                  class="text-cyan-300 text-lg md:text-xl font-semibold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent animate-text-gradient"
                >
                  {{ card.nickname }}
                </p>
              </div>

              <!-- Цитата -->
              <div class="flex-1 mb-4 md:mb-6">
                <div class="text-gray-300/80 text-xs md:text-sm font-medium mb-2 uppercase tracking-wider text-center">
                  Цитата ©
                </div>
                <div
                  class="relative p-4 md:p-5 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 h-full group/quote"
                >
                  <!-- Декоративные кавычки -->
                  <div
                    class="absolute -top-2 left-3 text-cyan-500/40 text-2xl md:text-3xl font-serif transition-opacity duration-300 group-hover/quote:opacity-100 opacity-60"
                  >
                    «
                  </div>
                  <p class="text-white/90 italic text-sm md:text-base leading-relaxed pt-1 text-center px-2">
                    {{ card.quote }}
                  </p>
                  <div
                    class="absolute -bottom-2 right-3 text-cyan-500/40 text-2xl md:text-3xl font-serif rotate-180 transition-opacity duration-300 group-hover/quote:opacity-100 opacity-60"
                  >
                    «
                  </div>
                  <!-- Подчеркивание под цитатой -->
                  <div
                    class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"
                  />
                </div>
              </div>

              <!-- Соцсети -->
              <div
                class="flex justify-center space-x-3 md:space-x-4 mb-4 transition-all duration-300"
                :class="isCardActive(index) ? 'opacity-100' : 'opacity-50'"
              >
                <a
                  v-if="card.social.instagram"
                  @click.stop="isCardActive(index) && handleSocialClick(card.social.instagram!, 'Instagram')"
                  class="p-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 transition-all duration-300 hover:scale-110"
                  :class="{
                    'hover:border-purple-500/50 hover:bg-white/20 cursor-pointer': isCardActive(index),
                    'cursor-default pointer-events-none': !isCardActive(index),
                  }"
                >
                  <Icon name="mdi:instagram" class="w-4 h-4 md:w-5 md:h-5 text-white" />
                </a>
                <a
                  v-if="card.social.youtube"
                  @click.stop="isCardActive(index) && handleSocialClick(card.social.youtube!, 'YouTube')"
                  class="p-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 transition-all duration-300 hover:scale-110"
                  :class="{
                    'hover:border-red-500/50 hover:bg-white/20 cursor-pointer': isCardActive(index),
                    'cursor-default pointer-events-none': !isCardActive(index),
                  }"
                >
                  <Icon name="mdi:youtube" class="w-4 h-4 md:w-5 md:h-5 text-white" />
                </a>
                <a
                  v-if="card.social.telegram"
                  @click.stop="isCardActive(index) && handleSocialClick(card.social.telegram!, 'Telegram')"
                  class="p-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 transition-all duration-300 hover:scale-110"
                  :class="{
                    'hover:border-cyan-500/50 hover:bg-white/20 cursor-pointer': isCardActive(index),
                    'cursor-default pointer-events-none': !isCardActive(index),
                  }"
                >
                  <Icon name="mdi:telegram" class="w-4 h-4 md:w-5 md:h-5 text-white" />
                </a>
                <a
                  v-if="card.social.vk"
                  @click.stop="isCardActive(index) && handleSocialClick(card.social.vk!, 'VK')"
                  class="p-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 transition-all duration-300 hover:scale-110"
                  :class="{
                    'hover:border-blue-500/50 hover:bg-white/20 cursor-pointer': isCardActive(index),
                    'cursor-default pointer-events-none': !isCardActive(index),
                  }"
                >
                  <Icon name="mdi:facebook" class="w-4 h-4 md:w-5 md:h-5 text-white" />
                </a>
              </div>

              <!-- Кнопка "Узнать больше" -->
              <button
                @click.stop="isCardActive(index) && handleLearnMore(card)"
                class="w-full py-2.5 md:py-3 px-4 rounded-xl text-white/95 transition-all duration-300 overflow-hidden relative mt-2 group/btn"
                :class="{
                  'bg-gradient-to-r from-white/15 to-white/10 backdrop-blur-lg border border-white/30 hover:text-white hover:border-white/40 hover:from-white/20 hover:to-white/15 cursor-pointer':
                    isCardActive(index),
                  'bg-white/5 backdrop-blur-md border border-white/10 cursor-default pointer-events-none':
                    !isCardActive(index),
                }"
              >
                <!-- Анимированный фон кнопки (только для активной) -->
                <div
                  v-if="isCardActive(index)"
                  class="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-transparent to-purple-500/0 group-hover/btn:from-cyan-500/10 group-hover/btn:via-white/10 group-hover/btn:to-purple-500/10 transition-all duration-500"
                />

                <!-- Текст кнопки -->
                <span class="relative flex items-center justify-center font-medium text-sm md:text-base">
                  <span class="mr-2">Узнать больше</span>
                  <Icon
                    name="mdi:arrow-right"
                    class="w-4 h-4 md:w-5 md:h-5 transition-all duration-300"
                    :class="{
                      'group-hover/btn:translate-x-1': isCardActive(index),
                    }"
                  />
                </span>

                <!-- Эффект подчеркивания при наведении -->
                <div
                  v-if="isCardActive(index)"
                  class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 group-hover/btn:w-3/4 transition-all duration-300"
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Навигация и индикаторы -->
      <div class="flex flex-col md:flex-row justify-between items-center mt-8 md:mt-12 gap-6">
        <!-- Индикаторы -->
        <div class="flex items-center space-x-2">
          <div
            v-for="(_, index) in cards"
            :key="index"
            class="w-2 h-2 rounded-full transition-all duration-300 cursor-pointer hover:scale-125 backdrop-blur-sm"
            :class="
              index === currentIndex
                ? 'w-8 bg-gradient-to-r from-cyan-500 to-purple-500'
                : 'bg-white/30 hover:bg-white/50'
            "
            @click="currentIndex = index"
          />
        </div>

        <!-- Кнопки навигации -->
        <div class="flex space-x-3">
          <button
            @click="navigate('prev')"
            class="p-3 rounded-xl bg-white/10 backdrop-blur-lg border border-white/20 hover:border-white/30 hover:bg-white/20 transition-all duration-300 group"
          >
            <Icon
              name="mdi:chevron-left"
              class="w-6 h-6 text-white group-hover:text-cyan-400 transition-colors duration-300"
            />
          </button>
          <button
            @click="navigate('next')"
            class="p-3 rounded-xl bg-white/10 backdrop-blur-lg border border-white/20 hover:border-white/30 hover:bg-white/20 transition-all duration-300 group"
          >
            <Icon
              name="mdi:chevron-right"
              class="w-6 h-6 text-white group-hover:text-cyan-400 transition-colors duration-300"
            />
          </button>
        </div>
      </div>

      <!-- Инструкция -->
      <div class="text-center mt-6 md:mt-8 text-gray-300 text-sm backdrop-blur-sm">
        <p>Кликните на карточку, чтобы сделать её активной и взаимодействовать с ней</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Основные 3D-стили */
.perspective-2000 {
  perspective: 2000px;
}

.transform-style-3d {
  transform-style: preserve-3d;
}

/* Анимация пульсации для свечения */
@keyframes pulse-slow {
  0%,
  100% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.6;
  }
}

.animate-pulse-slow {
  animation: pulse-slow 3s ease-in-out infinite;
}

/* Анимация градиентного сдвига */
@keyframes gradient-shift {
  0%,
  100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

.animate-gradient-shift {
  background-size: 200% 200%;
  animation: gradient-shift 8s ease-in-out infinite;
}

/* Анимация текстового градиента */
@keyframes text-gradient {
  0%,
  100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

.animate-text-gradient {
  background-size: 200% auto;
  animation: text-gradient 3s ease-in-out infinite;
}

/* Анимация плавающих частиц */
@keyframes float {
  0%,
  100% {
    transform: translate(0, 0) rotate(0deg);
  }
  25% {
    transform: translate(20px, -20px) rotate(90deg);
  }
  50% {
    transform: translate(0, -40px) rotate(180deg);
  }
  75% {
    transform: translate(-20px, -20px) rotate(270deg);
  }
}

/* Эффект стекла */
.backdrop-blur-lg {
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}

.backdrop-blur-sm {
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

/* Плавные переходы */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Эффект градиентного перехода от изображения к тексту */
.gradient-overlay {
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.4) 40%,
    rgba(0, 0, 0, 0.7) 70%,
    rgba(0, 0, 0, 0.9) 100%
  );
}

/* Анимация масштабирования фонового изображения */
@keyframes gentle-zoom {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.02);
  }
}

.animate-gentle-zoom {
  animation: gentle-zoom 20s ease-in-out infinite;
}

/* Эффект параллакса для фонового изображения */
.parallax-bg {
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

/* Стили для улучшения читаемости текста на градиенте */
.text-shadow {
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

.text-shadow-light {
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

/* Эффект свечения текста */
.glow-text {
  filter: drop-shadow(0 0 8px rgba(0, 242, 254, 0.3));
}

/* Стили для плавного появления элементов */
.fade-in-up {
  animation: fadeInUp 0.6s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Эффект волны на градиенте */
.wave-gradient {
  position: relative;
  overflow: hidden;
}

.wave-gradient::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 200%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  animation: wave 3s linear infinite;
}

@keyframes wave {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

/* Улучшенный эффект стекла для активной карточки */
.active-glass {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

/* Стили для неактивных карточек */
.inactive-blur {
  filter: blur(4px) brightness(0.7);
  opacity: 0.6;
}

/* Оптимизация для производительности */
.will-change-transform {
  will-change: transform;
}

.will-change-opacity {
  will-change: opacity;
}

/* Стили для мобильных устройств */
@media (max-width: 768px) {
  .perspective-2000 {
    perspective: 1000px;
  }
}

/* Эффект мягкого свечения */
.soft-glow {
  box-shadow: 0 0 40px rgba(0, 242, 254, 0.1), 0 0 80px rgba(147, 51, 234, 0.05);
}

/* Градиентный текст с анимацией */
.animated-gradient-text {
  background: linear-gradient(45deg, #00f2fe, #4facfe, #00f2fe);
  background-size: 200% auto;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: gradient 3s linear infinite;
}

@keyframes gradient {
  0% {
    background-position: 0% center;
  }
  100% {
    background-position: 200% center;
  }
}
</style>

<style>
/* Улучшенный selection */
::selection {
  background: rgba(0, 242, 254, 0.3);
  color: white;
}

/* Сглаживание шрифтов */
body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

/* Плавные transition для изображений */
img {
  transition: all 0.7s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Эффект наведения для интерактивных элементов */
.hover-lift {
  transition: transform 0.3s ease;
}

.hover-lift:hover {
  transform: translateY(-2px);
}

/* Улучшенные фокус-стили для доступности */
:focus-visible {
  outline: 2px solid rgba(0, 242, 254, 0.5);
  outline-offset: 2px;
  border-radius: 4px;
}

/* Анимация для фонового изображения */
.bg-image-transition {
  transition: transform 10s ease-in-out;
}

.bg-image-transition:hover {
  transform: scale(1.05);
}

/* Эффект зеркального отражения */
.reflection {
  position: relative;
}

.reflection::after {
  content: '';
  position: absolute;
  bottom: -100%;
  left: 0;
  right: 0;
  height: 100%;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 100%);
  transform: scaleY(-1);
  opacity: 0.3;
  pointer-events: none;
}
</style>
