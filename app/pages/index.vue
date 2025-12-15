<template>
	<div>
		<carousel3D :dataCard="dataCard" />
	</div>
</template>

<script setup lang="ts">
import type { ICarouselItem } from "~/types/card.ts"

import { ref } from "vue"

const dataCard = ref<ICarouselItem[]>([
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
		quote: "Хлопья летят наверх, всюду магия и свет",
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
		nickname: "@marteenmarteen",
		quote: "Быть с тобой – это самый лучший сон",
		imageURL: "martin.png",
		links: {
			vk: "https://vk.com/marteenmarteen",
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
		quote: "Я с тобой спорить не хочу, Чтобы спор проиграть дважды",
		imageURL: "trofimov.png",
		links: {
			vk: "https://vk.com/trofimov",
			telegram: "https://t.me/trofimov",
			rutube: "https://rutube.ru/channel/trofimov/",
		},
	},
])
</script>

<style></style>
