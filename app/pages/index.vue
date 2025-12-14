<template>
	<div>
		<carouselBloger :dataCard="dataCard" />
	</div>
</template>

<script setup lang="ts">
import type { ICardItem } from "~/types/card.ts"

import { ref } from "vue"

const dataCard = ref<ICardItem[]>([
	{
		id: 1,
		name: "Василий Вакуленко",
		nickname: "Баста / Noggano",
		quote: "Свои — не те, кто слушают, а те, кто слышат.",
		imageURL: "basta.png",
		links: {
			vk: "https://vk.com/bastaofficial",
			telegram: "https://t.me/bastaofficial",
			rutube: "https://rutube.ru/channel/bastaofficial/",
		},
	},
	{
		id: 2,
		name: "Федор Инсаров",
		nickname: "@feduk",
		quote: "Хлопья летят наверх",
		imageURL: "feduk.png",
		links: {
			vk: "https://vk.com/feduk",
			telegram: "https://t.me/fedukonelive",
			rutube: "https://rutube.ru/channel/fedukmusic/",
		},
	},
	{
		id: 3,
		name: "Михаил Смирнов",
		nickname: "@marteen",
		quote: "Просто мартин",
		imageURL: "martin.png",
		links: {
			vk: "https://vk.com/marteen",
			telegram: "https://t.me/semechkiotmartina",
			rutube: "https://rutube.ru/channel/marteen/",
		},
	},
	{
		id: 4,
		name: "Станислав Михайлов",
		nickname: "Стас Михайлов",
		quote: "Ты прости меня, родная, Что творю я — сам не знаю",
		imageURL: "stas_mihaylov.png",
		links: {
			vk: "https://vk.com/stasmihaylov",
			telegram: "https://t.me/stasmihaylovofficial",
			rutube: "https://rutube.ru/channel/stasmihaylov/",
		},
	},
	{
		id: 5,
		name: "Евгений Трофимов",
		nickname: "Женя Трофимов",
		quote: "Просто мартин",
		imageURL: "trofimov.png",
		links: {
			vk: "https://vk.com/marteen",
			telegram: "https://t.me/semechkiotmartina",
			rutube: "https://rutube.ru/channel/marteen/",
		},
	},
])
</script>

<style></style>
