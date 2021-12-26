<script type="ts">
  import { useDispatch, useSelector } from '@/app/hooks';
  import { onDestroy$ } from '@/misc/svelte-rx';
  import {
    Animatable,
    DocumentObject,
    ObjectText,
    TextObjectHorizontalAlign,
    TextObjectVerticalAlign,
  } from '@/store/object.store';
  import { selectedObjectsSelector, selectedObjectsSlice } from '@/store/selected.store';
  import { filter, map, takeUntil } from 'rxjs';
  export let object: DocumentObject;
  export let edit: boolean;
  export let to: Animatable;
  export let from: Animatable | null;
  export let text: ObjectText;

  const dispatch = useDispatch();

  let textarea: HTMLDivElement;

  useSelector(selectedObjectsSelector())
    .pipe(
      takeUntil(onDestroy$),
      map(objects => objects.find(({ uuid }) => object.uuid === uuid)),
      filter(selected => Boolean(selected)),
      filter(() => Boolean(textarea)),
    )
    .subscribe({
      next: () => textarea.focus(),
    });

  $: verticalAlign =
    text.verticalAlign === TextObjectVerticalAlign.TOP
      ? 'flex-start'
      : text.verticalAlign === TextObjectVerticalAlign.CENTER
      ? 'center'
      : text.verticalAlign === TextObjectVerticalAlign.BOTTOM
      ? 'flex-end'
      : '';

  $: horizontalAlign =
    text.horizontalAlign === TextObjectHorizontalAlign.LEFT
      ? 'left'
      : text.horizontalAlign === TextObjectHorizontalAlign.CENTER
      ? 'center'
      : text.horizontalAlign === TextObjectHorizontalAlign.RIGHT
      ? 'right'
      : '';

  const onKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      document.execCommand('insertLineBreak');
      e.preventDefault();
    }
  };

  const onMousedown = (e: MouseEvent) => {
    e.stopPropagation();
    dispatch(selectedObjectsSlice.actions.set([object.uuid]));
  };
</script>

<foreignObject
  x={to.shape.x}
  y={to.shape.y}
  width={to.shape.width}
  height={to.shape.height}
  fill="transparent"
>
  <div
    class="object-textarea-wrapper"
    style="justify-content: {verticalAlign}; text-align: {horizontalAlign};"
  >
    <div
      bind:this={textarea}
      class="object-textarea"
      contenteditable="true"
      on:keydown={e => onKeydown(e)}
      on:mousedown={e => onMousedown(e)}
      style="font-size: {text.fontSize}px;"
      value={text.innerText}
    />
  </div>
  {#if from}
    <animate
      class="queue-animator"
      begin="indefinite"
      attributeName="height"
      from={from.shape.height}
      to={to.shape.height}
      dur={`${from.duration}s`}
    />
    <animate
      class="queue-animator"
      begin="indefinite"
      attributeName="width"
      from={from.shape.width}
      to={to.shape.width}
      dur={`${from.duration}s`}
    />
    <animate
      class="queue-animator"
      begin="indefinite"
      attributeName="x"
      from={from.shape.x}
      to={to.shape.x}
      dur={`${from.duration}s`}
    />
    <animate
      class="queue-animator"
      begin="indefinite"
      attributeName="y"
      from={from.shape.y}
      to={to.shape.y}
      dur={`${from.duration}s`}
    />
  {/if}
</foreignObject>

<style type="scss">
  div.object-textarea-wrapper {
    cursor: default;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    div.object-textarea {
      outline: 0px solid transparent;
      display: inline-block;
      cursor: text;
    }
  }
</style>
