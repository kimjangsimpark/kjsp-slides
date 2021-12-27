<script type="ts" context="module">
</script>

<script type="ts">
	import { filter, map } from 'rxjs/operators';
	import { useDispatch, useSelector } from '@/app/hooks';
	import { selectedObjectsSelector } from '@/store/selected.store';
	import { DocumentObject, objectsSlice } from '@/store/object.store';
	import { currentQueueIndexSelector } from '@/store/queue.store';

	const currentQueueIndex = useSelector(currentQueueIndexSelector());
	const dispatch = useDispatch();

	const selectedObject = useSelector(selectedObjectsSelector()).pipe(
		map((objects) => objects[0]),
		filter((object) => Boolean(object)),
	);

	const effects = selectedObject.pipe(map((object) => object.effects));

	const currentEffects = effects.pipe(
		map((effects) => effects.filter((effect) => effect.index === $currentQueueIndex)),
	);

	const setObjectStrokeWidth = (object: DocumentObject, width: number | string) => {
		let parsed: number = 0;
		if (typeof width === 'string') {
			const num = Number(width);
			parsed = !isNaN(num) ? num : 0;
		} else {
			parsed = width;
		}
		const pending = Math.max(parsed, 1);
		dispatch(
			objectsSlice.actions.updateStrokeOfObject({
				uuid: object.uuid,
				stroke: {
					strokeColor: object.stroke.strokeColor,
					strokeDasharray: object.stroke.strokeDasharray,
					strokeWidth: pending,
				},
			}),
		);
	};

	const setObjectStrokeColor = (object: DocumentObject, color: string) => {
		dispatch(
			objectsSlice.actions.updateStrokeOfObject({
				uuid: object.uuid,
				stroke: {
					strokeColor: color,
					strokeDasharray: object.stroke.strokeDasharray,
					strokeWidth: object.stroke.strokeWidth,
				},
			}),
		);
	};

	const setObjectStrokeDasharray = (object: DocumentObject, dasharray: number[]) => {
		dispatch(
			objectsSlice.actions.updateStrokeOfObject({
				uuid: object.uuid,
				stroke: {
					strokeColor: object.stroke.strokeColor,
					strokeDasharray: dasharray,
					strokeWidth: object.stroke.strokeWidth,
				},
			}),
		);
	};

	const onStrokeWidthInputChanged = (object: DocumentObject, e: Event) => {
		const target = e.target as HTMLInputElement;
		setObjectStrokeWidth(object, target.value);
	};

	const onStrokeColorInputChanged = (object: DocumentObject, e: Event) => {
		const target = e.target as HTMLInputElement;
		setObjectStrokeColor(object, target.value);
	};
</script>

<aside id="object-control-panel-root">
	<section class="panel-section action-list-wrapper">
		<header><h2>Effects</h2></header>
		<ol class="list">
			{#each $effects as effect}
				<li class="list-item">
					#{Number(effect.index) + 1}
					{effect.type}
				</li>
			{/each}
		</ol>
	</section>

	<section class="panel-section effect-list-wrapper">
		<header>
			<h2>Current effects</h2>
			<button>+</button>
		</header>
		<ol class="list">
			{#each $currentEffects as effect}
				<li class="list-item">
					#{Number(effect.index) + 1}
					{effect.type}
				</li>
			{/each}
		</ol>
	</section>

	<section class="panel-section line-wrapper">
		<header><h2>Line</h2></header>
		<div>
			<div class="line-width-input-wrapper">
				<button
					on:click={() =>
						setObjectStrokeWidth($selectedObject, $selectedObject.stroke.strokeWidth - 1)}
					>&nbsp;-&nbsp;
				</button>
				<input
					type="number"
					name="lineWidth"
					id="lineWidth"
					value={$selectedObject.stroke.strokeWidth}
					on:input={(e) => {
						onStrokeWidthInputChanged($selectedObject, e);
					}}
				/>
				<button
					on:click={() =>
						setObjectStrokeWidth($selectedObject, $selectedObject.stroke.strokeWidth + 1)}
					>&nbsp;+&nbsp;
				</button>
			</div>
			<div class="line-color-input-wrapper">
				<label for="lineColorPicker">color</label>
				<input
					type="color"
					name="lineColorPicker"
					id="lineColorPicker"
					value={$selectedObject.stroke.strokeColor}
					on:input={(e) => onStrokeColorInputChanged($selectedObject, e)}
				/>
			</div>
		</div>
		<ul>
			<li>
				<button on:click={() => setObjectStrokeDasharray($selectedObject, [4, 4])}>
					<div class="dotted" />
				</button>
			</li>
			<li>
				<button on:click={() => setObjectStrokeDasharray($selectedObject, [8, 8])}>
					<div class="dashed" />
				</button>
			</li>
			<li>
				<button on:click={() => setObjectStrokeDasharray($selectedObject, [])}>
					<div class="solid" />
				</button>
			</li>
		</ul>
	</section>

	<section class="panel-section fill-wrapper">
		<header><h2>fill</h2></header>
	</section>

	<section class="panel-section effect-list-wrapper">
		<header>
			<h2>Font Size</h2>
		</header>
	</section>
</aside>

<style lang="scss">
	.panel-section {
		padding: {
			top: 20px;
			bottom: 20px;
		}

		header {
			h2 {
				font-size: 1.125rem;
				text-align: center;
			}
		}

		ol.list {
			min-height: 150px;
			height: 150px;
			padding: 1rem;
			list-style: none;
			overflow-y: auto;
			box-shadow: inset -1px -5px 6px $gray-line-1;

			.list-item {
				padding: 0.4rem 0;
			}
		}

		// &.action-list-wrapper {
		// }

		&.effect-list-wrapper {
			header {
				position: relative;
				display: flex;
				justify-content: center;

				button {
					width: 30px;
					position: absolute;
					right: 0;
				}
			}
		}

		&.line-wrapper {
			ul {
				height: 100px;
				padding: 1rem;
				list-style: none;
				overflow-y: auto;
				box-shadow: inset -1px -5px 6px $gray-line-1;

				li {
					display: flex;
					justify-content: center;
					align-items: center;
					height: 1.5rem;
					padding-bottom: 0.5rem;

					button {
						display: flex;
						align-items: center;
						width: 100%;
						height: 100%;
						border: none;
						background: none;

						&:hover {
							background: $gray-line-1;
						}

						div {
							width: 100%;

							&.dotted {
								border-top: 1px #000000 dotted;
							}

							&.dashed {
								border-top: 1px #000000 dashed;
							}

							&.solid {
								border-top: 1px #000000 solid;
							}
						}
					}
				}
			}
		}
	}
</style>
