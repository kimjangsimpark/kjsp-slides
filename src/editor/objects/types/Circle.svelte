<script type="ts">
	import type { Animatable, CircleObject } from '@/store/object.store';
	export let object: CircleObject;
	export let to: Animatable;
	export let from: Animatable | null;

	$: previous_cx = from ? from.shape.x + from.shape.width / 2 : 0;
	$: previous_cy = from ? from.shape.y + from.shape.height / 2 : 0;
	$: previous_rx = from ? from.shape.width / 2 : 0;
	$: previous_ry = from ? from.shape.height / 2 : 0;

	$: cx = to.shape.x + to.shape.width / 2;
	$: cy = to.shape.y + to.shape.height / 2;
	$: rx = to.shape.width / 2;
	$: ry = to.shape.height / 2;
</script>

<ellipse
	{cx}
	{cy}
	{rx}
	{ry}
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
			attributeName="ry"
			from={previous_ry}
			to={ry}
			dur={`${from.duration}s`}
		/>
		<animate
			class="queue-animator"
			begin="indefinite"
			attributeName="rx"
			from={previous_rx}
			to={rx}
			dur={`${from.duration}s`}
		/>
		<animate
			class="queue-animator"
			begin="indefinite"
			attributeName="cx"
			from={previous_cx}
			to={cx}
			dur={`${from.duration}s`}
		/>
		<animate
			class="queue-animator"
			begin="indefinite"
			attributeName="cy"
			from={previous_cy}
			to={cy}
			dur={`${from.duration}s`}
		/>
	{/if}
</ellipse>
