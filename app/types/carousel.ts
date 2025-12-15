export type TNavigateDirection = 'prev' | 'next';
export interface ICarousel {
  dataCarousel: ICarouselItem[];
}
export interface ICarouselItem {
  id: number;
  name: string;
  nickname: string;
  quote: string;
  imageURL: string;
  links: {
    vk: string;
    telegram: string;
    rutube: string;
  };
}
