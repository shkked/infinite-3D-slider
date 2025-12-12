<template>
	<div class="cardWrapper rounded-[40px] flex flex-col">
		<div class="flex items-center justify-between mt-10 mx-10">
			<div
				class="badge rounded-full w-14 h-14 flex items-center justify-center border border-[rgb(255, 255, 255, 0.05)] text-2xl"
			>
				🎤
			</div>
			<div class="flex items-center gap-3">
				<a :href="item.links.vk" target="_blank">
					<img class="w-11 h-11" src="/socials/vk.png" alt="vk" />
				</a>
				<a :href="item.links.telegram" target="_blank">
					<img class="w-11 h-11" src="/socials/telegram.png" alt="telegram" />
				</a>
				<a :href="item.links.rutube" target="_blank">
					<img class="w-11 h-11" src="/socials/rutube.png" alt="rutube" />
				</a>
			</div>
		</div>
		<div class="relative flex flex-col justify-end h-[450px]">
			<img
				:src="'/artists/' + item.imageURL"
				:alt="item.name"
				class="absolute w-100 h-100 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-h-[100%]"
			/>
			<div class="px-8 z-[2]">
				<p class="text-gray-400">Имя блогера</p>
				<h3 class="font-bold text-4xl">{{ item.name }}</h3>
				<p class="text-gray-400 mt-4">Никнейм в соцсетях</p>
				<p class="text-[18px]">{{ item.nickname }}</p>
				<p class="text-gray-400 mt-4">Цитата ©</p>
				<p class="text-[18px] italic">« {{ item.quote }}»</p>
			</div>
		</div>

		<button
			class="btn rounded-full bg-black mx-8 px-4 mt-5 w-[146px] h-[44px]"
		>
			Узнать больше
		</button>
	</div>
</template>

<script setup lang="ts">
import type { ICardItem } from "~/types/card.ts"
interface IProps {
	item: ICardItem
}

defineProps<IProps>()
</script>

<style lang="scss">
.cardWrapper {
	position: relative;
	width: 550px;
	height: 627px;
	border: 1px solid rgb(255, 255, 255, 0.2);
	filter: drop-shadow(-8px 10px 46px #0000005f);
	backdrop-filter: brightness(1.1) blur(2px) url(#displacementFilter);
	background: linear-gradient(
		135deg,
		#1b3b92 0%,
		#6e2fd3 40%,
		#ff4572 70%,
		#ffd247 100%
	);
}
.badge {
	position: relative;
	background: #101010;
	&::before {
		content: "";
		position: absolute;
		inset: -6px; /* толщина подсветки */
		border-radius: inherit;
		background: radial-gradient(
			circle,
			rgba(255, 255, 255, 0.3) 0%,
			rgba(255, 255, 255, 0) 60%
		);
		filter: blur(4px); /* мягкое размытие */
		z-index: -1;
	}
}
</style>
