import { defineStore } from 'pinia';
import type { CSSProperties } from 'vue';
import { ref } from 'vue';
import type { ICarouselItem, TNavigateDirection } from '~/types/carousel.ts';

export const useCarouselStore = defineStore('carousel', () => {
  // Массив с данными для карусели
  const itemsCarousel = ref<ICarouselItem[]>([
    {
      id: 1,
      name: 'Василий Вакуленко',
      nickname: 'Баста / Noggano',
      quote: 'Свои — не те, кто слушают, а те, кто слышат',
      imageURL: 'basta.png',
      links: {
        vk: 'https://vk.com/bastaofficial',
        telegram: 'https://t.me/bastaofficial',
        rutube: 'https://rutube.ru/channel/bastaofficial/',
      },
    },
    {
      id: 2,
      name: 'Федор Инсаров',
      nickname: '@feduk',
      quote: 'Хлопья летят наверх, всюду магия и свет',
      imageURL: 'feduk.png',
      links: {
        vk: 'https://vk.com/feduk',
        telegram: 'https://t.me/fedukonelive',
        rutube: 'https://rutube.ru/channel/fedukmusic/',
      },
    },
    {
      id: 3,
      name: 'Михаил Смирнов',
      nickname: '@marteenmarteen',
      quote: 'Быть с тобой – это самый лучший сон',
      imageURL: 'martin.png',
      links: {
        vk: 'https://vk.com/marteenmarteen',
        telegram: 'https://t.me/semechkiotmartina',
        rutube: 'https://rutube.ru/channel/marteen/',
      },
    },
    {
      id: 4,
      name: 'Станислав Михайлов',
      nickname: 'Стас Михайлов',
      quote: 'Ты прости меня, родная, Что творю я — сам не знаю',
      imageURL: 'stas_mihaylov.png',
      links: {
        vk: 'https://vk.com/stasmihaylov',
        telegram: 'https://t.me/stasmihaylovofficial',
        rutube: 'https://rutube.ru/channel/stasmihaylov/',
      },
    },
    {
      id: 5,
      name: 'Евгений Трофимов',
      nickname: 'Женя Трофимов',
      quote: 'Я с тобой спорить не хочу, Чтобы спор проиграть дважды',
      imageURL: 'trofimov.png',
      links: {
        vk: 'https://vk.com/trofimov',
        telegram: 'https://t.me/trofimov',
        rutube: 'https://rutube.ru/channel/trofimov/',
      },
    },
    {
      id: 6,
      name: 'Михаил Шуфутинский',
      nickname: 'Михаил Шуфутинский',
      quote: 'Я календарь переверну, И снова 3-е сентября',
      imageURL: 'shufutinskiy.png',
      links: {
        vk: 'https://vk.com/shufutinskiy',
        telegram: 'https://t.me/shufutinskiy',
        rutube: 'https://rutube.ru/channel/shufutinskiy/',
      },
    },
    {
      id: 7,
      name: 'Павел Попов',
      nickname: 'Павел самых честных правил',
      quote: 'Однажды проснешься и увидишь пепел, как я догораю до последнего нерва',
      imageURL: 'pavel_popov.png',
      links: {
        vk: 'https://vk.com/artist/pavelsamykhchestnykhpravil',
        telegram: 'https://t.me/pavelsamykhchestnykhpravil',
        rutube: 'https://rutube.ru/channel/pavelsamykhchestnykhpravil/',
      },
    },
  ]);

  // Настройки позиций и стилей карточек в карусели
  const settingsCarousel = ref<Record<number, CSSProperties>>({
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
      pointerEvents: 'auto',
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
      pointerEvents: 'auto',
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
      opacity: 0,
      rotate: '-15deg',
      zIndex: 10,
      filter: 'blur(7px)',
      left: '50%',
      pointerEvents: 'none',
    },
  });

  const isMobile = ref(false);
  const isTablet = ref(false);
  // Определение мобильного устройства
  const checkDevice = () => {
    isTablet.value = false;
    if (window.outerWidth < 1280 && window.outerWidth >= 640) {
      isTablet.value = true;
      isMobile.value = false;
      return;
    }
    isMobile.value = window.outerWidth < 640;
  };

  const isDragging = ref(false);
  const wasDragged = ref(false);
  const currentIndex = ref(0);

  const startX = ref(0);
  const startY = ref(0);

  // Обработчик при начале события drag
  const handleDragStart = (e: MouseEvent | TouchEvent) => {
    isDragging.value = true;
    wasDragged.value = false;

    if ('touches' in e) {
      startX.value = e.touches[0]?.pageX ?? 0;
      startY.value = e.touches[0]?.pageY ?? 0;
    } else {
      startX.value = e.pageX;
      startY.value = e.pageY;
    }
  };
  // Обработчик во время события drag
  const handleDragMove = (e: MouseEvent | TouchEvent) => {
    if (!isDragging.value) return;
    e.preventDefault();

    let x: number;
    let y: number;

    if (e instanceof TouchEvent && e.touches[0]) {
      x = e.touches[0].pageX;
      y = e.touches[0].pageY;
    } else if (e instanceof MouseEvent) {
      x = e.pageX;
      y = e.pageY;
    } else {
      return; // событие некорректное — выходим
    }

    const deltaX = x - startX.value;
    const deltaY = y - startY.value;

    // Проверяем, что движение в основном по горизонтали
    if (Math.abs(deltaX) > Math.abs(deltaY) * 1.5) {
      if (deltaX > 50) {
        wasDragged.value = true;
        navigate('prev');
        isDragging.value = false;
      } else if (deltaX < -50) {
        wasDragged.value = true;
        navigate('next');
        isDragging.value = false;
      }
    }
  };

  let wheelAccumulatedX = 0;
  let wheelDirection: 1 | -1 | 0 = 0;
  let wheelGestureActive = false;
  let wheelGestureTimeout: number | null = null;

  const WHEEL_THRESHOLD = 40;
  const WHEEL_GESTURE_END_DELAY = 120;
  const WHEEL_ANIMATION_LOCK = 500;

  const handleWheel = (e: WheelEvent) => {
    if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
    e.preventDefault();

    // ❌ если жест уже обработан — игнорируем всё
    if (wheelGestureActive) return;

    const direction = Math.sign(e.deltaX) as 1 | -1;

    if (wheelDirection !== 0 && wheelDirection !== direction) {
      wheelAccumulatedX = 0;
      return;
    }

    wheelDirection = direction;
    wheelAccumulatedX += e.deltaX;

    // 🚀 МГНОВЕННО реагируем
    if (Math.abs(wheelAccumulatedX) >= WHEEL_THRESHOLD) {
      wheelGestureActive = true;
      wasDragged.value = true;
      isDragging.value = true;

      if (wheelDirection > 0) {
        navigate('next');
      } else {
        navigate('prev');
      }

      // 🔒 сброс накоплений
      wheelAccumulatedX = 0;
      wheelDirection = 0;

      // 🧠 ждём, пока wheel реально ЗАКОНЧИТСЯ
      if (wheelGestureTimeout) {
        clearTimeout(wheelGestureTimeout);
      }

      wheelGestureTimeout = window.setTimeout(() => {
        wheelGestureActive = false;
        isDragging.value = false;
      }, WHEEL_GESTURE_END_DELAY + WHEEL_ANIMATION_LOCK);
    }
  };

  // Обработчик клика по карточке
  const handleCardClick = (index: number) => {
    if (wasDragged.value) {
      wasDragged.value = false;
      return;
    }

    if (isCardActive(index)) return;

    if (isMobile.value) {
      if (index - currentIndex.value === 0 || index - currentIndex.value === -(itemsCarousel.value.length - 1)) {
        navigate('prev');
        return;
      } else if (index - currentIndex.value === 2 || index - currentIndex.value === -(itemsCarousel.value.length - 2)) {
        navigate('next');
        return;
      }
    }
    if (index - currentIndex.value === 1 || index - currentIndex.value === -(itemsCarousel.value.length - 1))
      navigate('prev');
    if (index - currentIndex.value === 3 || index - currentIndex.value === -(itemsCarousel.value.length - 3))
      navigate('next');
  };

  // Проверка, активна ли карточка
  const isCardActive = (index: number) => {
    if (isMobile.value) {
      return index - currentIndex.value === 1 || index - currentIndex.value === -(itemsCarousel.value.length - 1);
    }
    return index - currentIndex.value === 2 || index - currentIndex.value === -(itemsCarousel.value.length - 2);
  };
  // Навигация карусели
  const navigate = (direction: TNavigateDirection) => {
    if (direction === 'next') {
      currentIndex.value = (currentIndex.value + 1) % itemsCarousel.value.length;
    } else {
      currentIndex.value = (currentIndex.value - 1 + itemsCarousel.value.length) % itemsCarousel.value.length;
    }
  };
  return {
    isDragging,
    handleDragStart,
    handleDragMove,
    handleCardClick,
    navigate,
    currentIndex,
    itemsCarousel,
    isCardActive,
    settingsCarousel,
    handleWheel,
    checkDevice,
    isMobile,
    isTablet,
  };
});
