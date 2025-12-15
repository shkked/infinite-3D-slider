export interface ICarouselItem {
	id: number
	name: string
	nickname: string
	quote: string
	imageURL: string
	links: {
		vk: string
		telegram: string
		rutube: string
	}
}