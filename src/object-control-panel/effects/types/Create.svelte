<script type="ts">
	import { useDispatch } from '@/app/hooks';
	import QueInput from '@/inputs/QueInput.svelte';
	import { ObjectCreateEffect, objectSelector, objectsSlice } from '@/store/object.store';
	export let uuid: string;
	export let effect: ObjectCreateEffect;

	const dispatch = useDispatch();
	const onChange = (propertyName: string, e: CustomEvent<Event>) => {
		const value = Number((e.detail.target as HTMLInputElement).value);
		dispatch(
			objectsSlice.actions.updateTransitionOfObject({
				index: effect.index,
				uuid: uuid,
				rect: {
					...effect,
					[propertyName]: value,
				},
				duration: 0.5,
			}),
		);
	};
</script>

<div class="property">
	<div class="property-name">x</div>
	<div class="property-value">
		<QueInput type="number" value={effect.x} on:change={(e) => onChange('x', e)} />
	</div>
</div>

<div class="property">
	<div class="property-name">y</div>
	<div class="property-value">
		<QueInput type="number" value={effect.y} on:change={(e) => onChange('y', e)} />
	</div>
</div>

<div class="property">
	<div class="property-name">width</div>
	<div class="property-value">
		<QueInput type="number" value={effect.width} on:change={(e) => onChange('width', e)} />
	</div>
</div>

<div class="property">
	<div class="property-name">height</div>
	<div class="property-value">
		<QueInput type="number" value={effect.height} on:change={(e) => onChange('height', e)} />
	</div>
</div>

<style type="scss">
	.property {
		display: flex;
	}

	.property-name {
		flex: 1 1 auto;
	}

	.property-value {
		width: 60px;
	}
</style>
