<template>
	<div>
		<div class="relative flex items-center justify-center mt-5">
			<carouselItem
				v-for="(carouselItem, indexCarouselItem) in dataCard"
				:carouselItem="carouselItem"
				:indexCarouselItem="indexCarouselItem"
				:key="carouselItem.id"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { ICarouselItem } from "~/types/card.ts"
interface IProps {
	dataCard: ICarouselItem[]
}
defineProps<IProps>()
</script>

<style scoped></style>
