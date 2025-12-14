<template>
	<div>
		<div class="relative flex items-center justify-center mt-16">
			<cardItem
				v-for="(value, index) in dataCard"
				:item="value"
				:indexCard="index"
				:key="value.id"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { ICardItem } from "~/types/card.ts"
interface IProps {
	dataCard: ICardItem[]
}
defineProps<IProps>()
</script>

<style scoped></style>
