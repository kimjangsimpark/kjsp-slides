<script type="ts" context="module">
  export const OBJECT_CONTEXT_KEY = 'object-context-key';
  export interface ObjectContext<T extends CommonObject = any> {
    object: T;
    from: Animatable | null;
    to: Animatable;
  }
</script>

<script type="ts">
  import { useDispatch } from '@/app/hooks';
  import {
    Animatable,
    CommonObject,
    DocumentObject,
    ObjectType,
  } from '@/store/object.store';
  import { selectedObjectsSlice } from '@/store/selected.store';
  import { setContext } from 'svelte';
  import TextObject from './features/TextObject.svelte';
  import Rectangle from './types/Rectangle.svelte';
  import Textarea from './types/Textarea.svelte';

  const dispatch = useDispatch();

  export let object: DocumentObject;
  export let from: Animatable | null;
  export let to: Animatable;

  setContext<ObjectContext>(OBJECT_CONTEXT_KEY, {
    object: object,
    from: from,
    to: to,
  });

  const onObjectClicked = (e: MouseEvent, obj: Animatable) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(selectedObjectsSlice.actions.set([obj.uuid]));
  };
</script>

<g class="object" on:click={e => onObjectClicked(e, to)}>
  {#if object.type === ObjectType.RECTANGLE}
    <Rectangle {object} {to} {from} />
  {:else if object.type === ObjectType.TEXTAREA}
    <Textarea {object} {to} {from} />
  {/if}

  {#if object.text}
    <TextObject {object} {to} {from} text={object.text} />
  {/if}
</g>
