<script type="ts">
  import { useSelector } from '@/app/hooks';
  import { onDestroy$ } from '@/misc/svelte-rx';
  import {
    Animatable,
    DocumentObject,
    ObjectText,
    TextObjectHorizontalAlign,
    TextObjectVerticalAlign,
  } from '@/store/object.store';
  import { selectedObjectsSelector } from '@/store/selected.store';
  import { filter, map, takeUntil } from 'rxjs';
  export let object: DocumentObject;
  export let to: Animatable;
  export let from: Animatable | null;
  export let text: ObjectText;

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
      ? 'flex-start'
      : text.horizontalAlign === TextObjectHorizontalAlign.CENTER
      ? 'center'
      : text.horizontalAlign === TextObjectHorizontalAlign.RIGHT
      ? 'flex-end'
      : '';
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
    style="justify-content: {verticalAlign}; align-items: {horizontalAlign};"
  >
    <div
      bind:this={textarea}
      on:input={e => console.log(e)}
      class="object-textarea"
      contenteditable="true"
      style="font-size: {text.fontSize}px; align-items: {horizontalAlign};"
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
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    div.object-textarea {
      outline: 0px solid transparent;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
</style>
