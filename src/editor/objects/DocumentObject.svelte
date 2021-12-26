<script type="ts" context="module">
  export const OBJECT_CONTEXT_KEY = 'object-context-key';
  export interface ObjectContext<T extends CommonObject = any> {
    object: T;
    from: Animatable | null;
    to: Animatable;
  }
</script>

<script type="ts">
  import { useDispatch, useSelector } from '@/app/hooks';
  import {
    Animatable,
    CommonObject,
    DocumentObject,
    objectsSlice,
    ObjectType,
  } from '@/store/object.store';
  import { currentQueueIndexSelector } from '@/store/queue.store';
  import { scaleSelector } from '@/store/scale.store';
  import { selectedObjectsSlice, selectedUUIDSelector } from '@/store/selected.store';
  import { map, tap } from 'rxjs';
  import Resizer from './Resizers.svelte';
  import TextObject from './features/TextObject.svelte';
  import Rectangle from './types/Rectangle.svelte';
  import Textarea from './types/Textarea.svelte';

  const dispatch = useDispatch();

  export let object: DocumentObject;
  export let from: Animatable | null;
  export let to: Animatable;

  const scale = useSelector(scaleSelector());
  const currentQueueIndex = useSelector(currentQueueIndexSelector());
  const selected = useSelector(selectedUUIDSelector()).pipe(
    map(uuids => uuids.includes(object.uuid)),
  );

  const onSelectedObjectMouseDown = (object: Animatable, e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    dispatch(selectedObjectsSlice.actions.set([object.uuid]));

    const positionX = e.clientX;
    const positionY = e.clientY;
    const capture = object.shape;

    const onSelectedObjectMouseMove = (e: MouseEvent) => {
      const diffX = (e.clientX - positionX) * (1 / $scale);
      const diffY = (e.clientY - positionY) * (1 / $scale);
      const shape = {
        x: capture.x + diffX,
        y: capture.y + diffY,
        width: capture.width,
        height: capture.height,
      };
      dispatch(
        objectsSlice.actions.updateTransitionOfObject({
          index: $currentQueueIndex,
          uuid: object.uuid,
          duration: 0.5,
          rect: shape,
        }),
      );
    };

    const onSelectedObjectMouseUp = (e: MouseEvent) => {
      document.body.removeEventListener('mousemove', onSelectedObjectMouseMove);
      document.body.removeEventListener('mouseup', onSelectedObjectMouseUp);
    };

    document.body.addEventListener('mousemove', onSelectedObjectMouseMove);
    document.body.addEventListener('mouseup', onSelectedObjectMouseUp);
  };
</script>

<g class="object" on:mousedown={e => onSelectedObjectMouseDown(to, e)}>
  {#if object.type === ObjectType.RECTANGLE}
    <Rectangle {object} {to} {from} />
  {:else if object.type === ObjectType.TEXTAREA}
    <Textarea {object} {to} {from} />
  {/if}

  {#if object.text}
    <TextObject {object} {to} {from} text={object.text} edit={true} />
  {/if}

  {#if $selected}
    <Resizer {to} {from} />
  {/if}
</g>
