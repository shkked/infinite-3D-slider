import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { ICarouselItem, TNavigateDirection } from '~/types/carousel.ts';

export const useCarouselStore = defineStore('carousel', () => {
  const itemsCarousel = ref<ICarouselItem[]>([
    {
      id: 1,
      name: 'Василий Вакуленко',
      nickname: 'Баста / Noggano',
      quote: 'Свои — не те, кто слушают, а те, кто слышат.',
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
        telegram: 'https://t.me/trofimov',
        rutube: 'https://rutube.ru/channel/trofimov/',
      },
    },
  ]);

  const isDragging = ref(false);
  const currentIndex = ref(0);

  const startX = ref(0);
  const startY = ref(0);
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

  const handleCardClick = (index: number) => {
    // currentIndex.value = index;
    // console.log(currentIndex.value);
  };

  const navigate = (direction: TNavigateDirection) => {
    if (direction === 'next') {
      currentIndex.value = (currentIndex.value + 1) % itemsCarousel.value.length;
    } else {
      currentIndex.value = (currentIndex.value - 1 + itemsCarousel.value.length) % itemsCarousel.value.length;
    }
  };
  return { isDragging, handleDragStart, handleDragMove, handleCardClick, navigate, currentIndex, itemsCarousel };
});
