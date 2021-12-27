<script type="ts" context="module">
	export const OBJECT_CONTEXT_KEY = 'object-context-key';
	export interface ObjectContext<T extends CommonObject = any> {
		object: T;
		from: Animatable | null;
		to: Animatable;
	}
</script>

<script type="ts">
	import { useSelector } from '@/app/hooks';
	import { Animatable, CommonObject, DocumentObject, ObjectType } from '@/store/object.store';
	import { selectedUUIDSelector } from '@/store/selected.store';
	import { map } from 'rxjs';
	import Resizer from './Resizers.svelte';
	import TextObject from './features/TextObject.svelte';
	import Rectangle from './types/Rectangle.svelte';
	import Textarea from './types/Textarea.svelte';
	import { createEventDispatcher } from 'svelte';
	import Circle from './types/Circle.svelte';

	const dispatcher = createEventDispatcher();

	export let object: DocumentObject;
	export let from: Animatable | null;
	export let to: Animatable;

	const selected = useSelector(selectedUUIDSelector()).pipe(
		map((uuids) => uuids.includes(object.uuid)),
	);

	const onSelectedObjectMouseDown = (e: MouseEvent) => {
		dispatcher('mousedown', e);
	};
</script>

<g class="object" on:mousedown={(e) => onSelectedObjectMouseDown(e)}>
	{#if object.type === ObjectType.RECTANGLE}
		<Rectangle {object} {to} {from} />
	{:else if object.type === ObjectType.TEXTAREA}
		<Textarea {object} {to} {from} />
	{:else if object.type === ObjectType.CIRCLE}
		<Circle {object} {to} {from} />
	{/if}

	{#if object.text}
		<TextObject {object} {to} {from} text={object.text} />
	{/if}

	{#if $selected}
		<Resizer {to} {from} />
	{/if}
</g>
