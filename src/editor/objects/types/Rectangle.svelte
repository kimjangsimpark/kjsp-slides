<script type="ts">
	import type { Animatable, RectangleObject } from '@/store/object.store';
	export let object: RectangleObject;
	export let to: Animatable;
	export let from: Animatable | null;
</script>

<rect
	x={to.shape.x}
	y={to.shape.y}
	width={to.shape.width}
	height={to.shape.height}
	stroke={object.stroke.strokeColor}
	stroke-width={object.stroke.strokeWidth}
	stroke-dasharray={object.stroke.strokeDasharray.length
		? object.stroke.strokeDasharray.join(' ')
		: null}
	fill="transparent"
>
	{#if from}
		<animate
			class="queue-animator"
			begin="indefinite"
			attributeName="height"
			from={from.shape.height}
			to={to.shape.height}
			dur={`${to.duration}s`}
		/>
		<animate
			class="queue-animator"
			begin="indefinite"
			attributeName="width"
			from={from.shape.width}
			to={to.shape.width}
			dur={`${to.duration}s`}
		/>
		<animate
			class="queue-animator"
			begin="indefinite"
			attributeName="x"
			from={from.shape.x}
			to={to.shape.x}
			dur={`${to.duration}s`}
		/>
		<animate
			class="queue-animator"
			begin="indefinite"
			attributeName="y"
			from={from.shape.y}
			to={to.shape.y}
			dur={`${to.duration}s`}
		/>
	{/if}
</rect>
