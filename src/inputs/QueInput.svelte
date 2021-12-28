<script type="ts">
	import { createEventDispatcher } from 'svelte';
	export let type: string;
	export let value: number | string;
	const dispatcher = createEventDispatcher();

	const onInput = (e: Event) => dispatcher('input', e);
	const onChange = (e: Event) => dispatcher('change', e);
	const onKeydown = (e: KeyboardEvent) => dispatcher('keydown', e);
</script>

<input
	{type}
	{value}
	on:input={(e) => onInput(e)}
	on:keydown={(e) => onKeydown(e)}
	on:change={(e) => onChange(e)}
/>

<style type="scss">
	input {
		width: 100%;
		height: 100%;
		border: 0;
		outline: 0;
	}
</style>
