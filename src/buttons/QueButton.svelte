<script type="ts" context="module">
	export interface OnQueButtonClick {
		event: MouseEvent;
	}
</script>

<script type="ts">
	import { createEventDispatcher } from 'svelte';

	export let border: boolean = false;
	export let height: number = -1;
	export let justifyContent: string = 'center';
	export let alignItems: string = 'center';

	const dispatcher = createEventDispatcher();

	const onClick = (e: MouseEvent) => {
		dispatcher('click', e);
	};

	$: actualHeight = height !== -1 ? `height: ${height}px` : '';
</script>

<button
	class="que-button-wrapper {border ? 'border' : ''}"
	style="justify-content: {justifyContent}; align-items: {alignItems}; {actualHeight}"
	on:click={(e) => onClick(e)}
>
	<slot />
</button>

<style type="scss">
	.que-button-wrapper {
		background-color: transparent;
		border: 0;
		transition: all 0.1s ease-in-out;
		display: flex;
		flex: 1 1 auto;

		&:hover {
			background: #eee;
		}

		&:active {
			background: #fff;
		}

		&.border {
			border: 1px solid rgba(0, 0, 0, 0.1);
		}
	}
</style>
