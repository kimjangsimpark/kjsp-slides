<script type="ts">
	import QueButton from '@/buttons/QueButton.svelte';
	import { ObjectEffect, ObjectEffectType } from '@/store/object.store';
	import Create from './types/Create.svelte';
	import Delete from './types/Delete.svelte';
	import FadeIn from './types/FadeIn.svelte';
	import FadeOut from './types/FadeOut.svelte';
	import Transition from './types/Transition.svelte';
	export let effect: ObjectEffect;
	export let uuid: string;
	let opened = false;
	$: displayIndex = effect.index + 1;
	$: displayType = effect.type;
	$: icon = opened ? 'ri-arrow-down-s-line' : 'ri-arrow-right-s-line';
</script>

<li class="list-item">
	<div class="que-effect-wrapper">
		<QueButton on:click={() => (opened = !opened)}>
			<div class="que-effect-header">
				<div class="que-effect-meta">
					<div class="que-effect-index">
						#{displayIndex}
					</div>
					<div class="que-effect-type">
						{displayType}
					</div>
				</div>
				<div class="que-effect-toggle">
					<i class={icon} />
				</div>
			</div>
		</QueButton>
		{#if opened}
			<div class="que-effect-body">
				{#if effect.type === ObjectEffectType.CREATE}
					<Create {uuid} {effect} />
				{:else if effect.type === ObjectEffectType.TRANSITION}
					<Transition {uuid} {effect} />
				{:else if effect.type === ObjectEffectType.FADE_IN}
					<FadeIn {uuid} {effect} />
				{:else if effect.type === ObjectEffectType.FADE_OUT}
					<FadeOut {uuid} {effect} />
				{:else if effect.type === ObjectEffectType.DELETE}
					<Delete {uuid} {effect} />
				{/if}
			</div>
		{/if}
	</div>
</li>

<style type="scss">
	li {
		display: flex;
	}

	.que-effect-wrapper {
		width: 100%;
		display: flex;
		flex-direction: column;
	}

	.que-effect-header {
		width: 100%;
		height: 30px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.que-effect-meta {
		display: flex;
		flex: 1 1 auto;
	}

	.que-effect-index {
		width: 30px;
	}

	.que-effect-type {
		flex: 1 1 auto;
		text-align: left;
	}

	.que-effect-toggle {
		width: 30px;
		display: flex;
		justify-content: center;
	}
</style>
