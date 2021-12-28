<script type="ts">
	import { useDispatch, useSelector } from '@/app/hooks';
	import { Animatable, DocumentObject, ObjectRect, objectsSlice } from '@/store/object.store';
	import { currentQueueIndexSelector } from '@/store/queue.store';
	import { scaleSelector } from '@/store/scale.store';

	export let from: Animatable | null = null;
	export let to: Animatable;

	const dispatch = useDispatch();
	const currentQueueIndex = useSelector(currentQueueIndexSelector());
	const scale = useSelector(scaleSelector());
	const strokeWidth = 15;
	const strokeMargin = 0;

	const onSelectedObjectVertextMouseDown = (
		object: Animatable,
		position: string,
		e: MouseEvent,
	) => {
		e.preventDefault();
		e.stopPropagation();

		const positionX = e.clientX;
		const positionY = e.clientY;
		const capture = {
			x: object.shape.x,
			y: object.shape.y,
			width: object.shape.width,
			height: object.shape.height,
		};
		let shape: ObjectRect;

		const onMouseMove = (e: MouseEvent) => {
			const diffX = (e.clientX - positionX) * (1 / $scale);
			const diffY = (e.clientY - positionY) * (1 / $scale);
			switch (position) {
				case 'top-left':
					shape = {
						x: capture.x + diffX,
						y: capture.y + diffY,
						width: capture.width + -diffX,
						height: capture.height + -diffY,
					};
					break;
				case 'top-middle':
					shape = {
						x: capture.x,
						y: capture.y + diffY,
						width: capture.width,
						height: capture.height + -diffY,
					};
					break;
				case 'top-right':
					shape = {
						x: capture.x,
						y: capture.y + diffY,
						width: capture.width + diffX,
						height: capture.height + -diffY,
					};
					break;
				case 'middle-right':
					shape = {
						x: capture.x,
						y: capture.y,
						width: capture.width + diffX,
						height: capture.height,
					};
					break;
				case 'bottom-right':
					shape = {
						x: capture.x,
						y: capture.y,
						width: capture.width + diffX,
						height: capture.height + diffY,
					};
					break;
				case 'bottom-middle':
					shape = {
						x: capture.x,
						y: capture.y,
						width: capture.width,
						height: capture.height + diffY,
					};
					break;
				case 'bottom-left':
					shape = {
						x: capture.x + diffX,
						y: capture.y,
						width: capture.width + -diffX,
						height: capture.height + diffY,
					};
					break;
				case 'middle-left':
					shape = {
						x: capture.x + diffX,
						y: capture.y,
						width: capture.width + -diffX,
						height: capture.height,
					};
					break;
			}
			dispatch(
				objectsSlice.actions.updateTransitionOfObject({
					index: $currentQueueIndex,
					uuid: object.uuid,
					duration: 0.5,
					rect: shape,
				}),
			);
		};

		const onMouseUp = (e: MouseEvent) => {
			document.body.removeEventListener('mousemove', onMouseMove);
			document.body.removeEventListener('mouseup', onMouseUp);
		};

		document.body.addEventListener('mousemove', onMouseMove);
		document.body.addEventListener('mouseup', onMouseUp);
	};
</script>

<!-- top left -->
<rect
	class="vertex top-left"
	x={to.shape.x - strokeMargin - strokeWidth / 2}
	y={to.shape.y - strokeMargin - strokeWidth / 2}
	width={strokeWidth}
	height={strokeWidth}
	on:mousedown={(e) => onSelectedObjectVertextMouseDown(to, 'top-left', e)}
>
	{#if from}
		<animate
			class="queue-animator"
			begin="indefinite"
			attributeName="x"
			from={from.shape.x - strokeMargin - strokeWidth / 2}
			to={to.shape.x - strokeMargin - strokeWidth / 2}
			dur={to.duration}
		/>
		<animate
			class="queue-animator"
			begin="indefinite"
			attributeName="y"
			from={from.shape.y - strokeMargin - strokeWidth / 2}
			to={to.shape.y - strokeMargin - strokeWidth / 2}
			dur={to.duration}
		/>
	{/if}
</rect>
<!-- top middle -->
<rect
	class="vertex top-middle"
	x={to.shape.x + to.shape.width / 2 - strokeWidth / 2}
	y={to.shape.y - strokeMargin - strokeWidth / 2}
	width={strokeWidth}
	height={strokeWidth}
	on:mousedown={(e) => onSelectedObjectVertextMouseDown(to, 'top-middle', e)}
>
	{#if from}
		<animate
			class="queue-animator"
			begin="indefinite"
			attributeName="x"
			from={from.shape.x + from.shape.width / 2 - strokeWidth / 2}
			to={to.shape.x + to.shape.width / 2 - strokeWidth / 2}
			dur={to.duration}
		/>
		<animate
			class="queue-animator"
			begin="indefinite"
			attributeName="y"
			from={from.shape.y - strokeMargin - strokeWidth / 2}
			to={to.shape.y - strokeMargin - strokeWidth / 2}
			dur={to.duration}
		/>
	{/if}
</rect>
<!-- top right -->
<rect
	class="vertex top-right"
	x={to.shape.x + to.shape.width + strokeMargin - strokeWidth / 2}
	y={to.shape.y - strokeMargin - strokeWidth / 2}
	width={strokeWidth}
	height={strokeWidth}
	on:mousedown={(e) => onSelectedObjectVertextMouseDown(to, 'top-right', e)}
>
	{#if from}
		<animate
			class="queue-animator"
			begin="indefinite"
			attributeName="x"
			from={from.shape.x + from.shape.width + strokeMargin - strokeWidth / 2}
			to={to.shape.x + to.shape.width + strokeMargin - strokeWidth / 2}
			dur={to.duration}
		/>
		<animate
			class="queue-animator"
			begin="indefinite"
			attributeName="y"
			from={from.shape.y - strokeMargin - strokeWidth / 2}
			to={to.shape.y - strokeMargin - strokeWidth / 2}
			dur={to.duration}
		/>
	{/if}
</rect>
<!-- middle right -->
<rect
	class="vertex middle-right"
	x={to.shape.x + to.shape.width + strokeMargin - strokeWidth / 2}
	y={to.shape.y + to.shape.height / 2 - strokeMargin / 2}
	width={strokeWidth}
	height={strokeWidth}
	on:mousedown={(e) => onSelectedObjectVertextMouseDown(to, 'middle-right', e)}
>
	{#if from}
		<animate
			class="queue-animator"
			begin="indefinite"
			attributeName="x"
			from={from.shape.x + from.shape.width + strokeMargin - strokeWidth / 2}
			to={to.shape.x + to.shape.width + strokeMargin - strokeWidth / 2}
			dur={to.duration}
		/>
		<animate
			class="queue-animator"
			begin="indefinite"
			attributeName="y"
			from={from.shape.y + from.shape.height / 2 - strokeMargin / 2}
			to={to.shape.y + to.shape.height / 2 - strokeMargin / 2}
			dur={to.duration}
		/>
	{/if}
</rect>
<!-- bottom right -->
<rect
	class="vertex bottom-right"
	x={to.shape.x + to.shape.width + strokeMargin - strokeWidth / 2}
	y={to.shape.y + to.shape.height + strokeMargin - strokeWidth / 2}
	width={strokeWidth}
	height={strokeWidth}
	on:mousedown={(e) => onSelectedObjectVertextMouseDown(to, 'bottom-right', e)}
>
	{#if from}
		<animate
			class="queue-animator"
			begin="indefinite"
			attributeName="x"
			from={from.shape.x + from.shape.width + strokeMargin - strokeWidth / 2}
			to={to.shape.x + to.shape.width + strokeMargin - strokeWidth / 2}
			dur={to.duration}
		/>
		<animate
			class="queue-animator"
			begin="indefinite"
			attributeName="y"
			from={from.shape.y + from.shape.height + strokeMargin - strokeWidth / 2}
			to={to.shape.y + to.shape.height + strokeMargin - strokeWidth / 2}
			dur={to.duration}
		/>
	{/if}
</rect>
<!-- bottom middle -->
<rect
	class="vertex bottom-middle"
	x={to.shape.x + to.shape.width / 2 - strokeWidth / 2}
	y={to.shape.y + to.shape.height + strokeMargin - strokeWidth / 2}
	width={strokeWidth}
	height={strokeWidth}
	on:mousedown={(e) => onSelectedObjectVertextMouseDown(to, 'bottom-middle', e)}
>
	{#if from}
		<animate
			class="queue-animator"
			begin="indefinite"
			attributeName="x"
			from={from.shape.x + from.shape.width / 2 - strokeWidth / 2}
			to={to.shape.x + to.shape.width / 2 - strokeWidth / 2}
			dur={to.duration}
		/>
		<animate
			class="queue-animator"
			begin="indefinite"
			attributeName="y"
			from={from.shape.y + from.shape.height + strokeMargin - strokeWidth / 2}
			to={to.shape.y + to.shape.height + strokeMargin - strokeWidth / 2}
			dur={to.duration}
		/>
	{/if}
</rect>
<!-- bottom left -->
<rect
	class="vertex bottom-left"
	x={to.shape.x - strokeMargin - strokeWidth / 2}
	y={to.shape.y + to.shape.height + strokeMargin - strokeWidth / 2}
	width={strokeWidth}
	height={strokeWidth}
	on:mousedown={(e) => onSelectedObjectVertextMouseDown(to, 'bottom-left', e)}
>
	{#if from}
		<animate
			class="queue-animator"
			begin="indefinite"
			attributeName="x"
			from={from.shape.x - strokeMargin - strokeWidth / 2}
			to={to.shape.x - strokeMargin - strokeWidth / 2}
			dur={to.duration}
		/>
		<animate
			class="queue-animator"
			begin="indefinite"
			attributeName="y"
			from={from.shape.y + from.shape.height + strokeMargin - strokeWidth / 2}
			to={to.shape.y + to.shape.height + strokeMargin - strokeWidth / 2}
			dur={to.duration}
		/>
	{/if}
</rect>
<!-- middle left -->
<rect
	class="vertex middle-left"
	x={to.shape.x - strokeMargin - strokeWidth / 2}
	y={to.shape.y + to.shape.height / 2 - strokeMargin / 2}
	width={strokeWidth}
	height={strokeWidth}
	on:mousedown={(e) => onSelectedObjectVertextMouseDown(to, 'middle-left', e)}
>
	{#if from}
		<animate
			class="queue-animator"
			begin="indefinite"
			attributeName="x"
			from={from.shape.x - strokeMargin - strokeWidth / 2}
			to={to.shape.x - strokeMargin - strokeWidth / 2}
			dur={to.duration}
		/>
		<animate
			class="queue-animator"
			begin="indefinite"
			attributeName="y"
			from={from.shape.y + from.shape.height / 2 - strokeMargin / 2}
			to={to.shape.y + to.shape.height / 2 - strokeMargin / 2}
			dur={to.duration}
		/>
	{/if}
</rect>

<style type="scss">
	.vertex {
		&.top-left,
		&.bottom-right {
			cursor: nwse-resize;
		}
		&.top-middle,
		&.bottom-middle {
			cursor: ns-resize;
		}

		&.top-right,
		&.bottom-left {
			cursor: nesw-resize;
		}

		&.middle-left,
		&.middle-right {
			cursor: ew-resize;
		}
	}
</style>
