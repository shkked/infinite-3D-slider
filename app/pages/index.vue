<template>
	<div>
		<div class="flex items-center">
			<cardItem v-for="value in data" :item="value" :key="value.id" />
		</div>
	</div>
</template>

<script setup lang="ts">
import type { ICardItem } from "~/types/card.ts"

import { ref } from "vue"

const data: ICardItem[] = ref([
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
		id: 2,
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
])
</script>

<style></style>
