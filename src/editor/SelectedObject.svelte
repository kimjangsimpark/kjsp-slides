<script type="ts">
  import type { DocumentObject, QueueObject } from '@/document/object.store';

  import { createEventDispatcher } from 'svelte';
  export let previous: QueueObject | null = null;
  export let selected: DocumentObject;

  const dispatcher = createEventDispatcher();
  const strokeWidth = 8;
  const strokeMargin = 5;

  const onMouseClick = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const onVertexMousedown = (position: string, e: MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    dispatcher('vertex-mousedown', {
      position: position,
      event: e,
    });
  };

  const onRectMouseDown = (e: MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    dispatcher('rect-mousedown', {
      event: e,
    });
  };
</script>

{#if selected}
  <g on:click={onMouseClick} on:mousedown={onRectMouseDown}>
    <rect
      class="mover"
      stroke="black"
      stroke-width="2"
      stroke-dasharray="5"
      fill="transparent"
      x={selected.shape.x - strokeMargin}
      y={selected.shape.y - strokeMargin}
      width={selected.shape.width + strokeMargin * 2}
      height={selected.shape.height + strokeMargin * 2}
    >
      {#if previous}
        <animate
          class="queue-animator"
          begin="indefinite"
          attributeName="height"
          from={previous.shape.height + strokeMargin * 2}
          to={selected.shape.height + strokeMargin * 2}
          dur="0.5s"
        />
        <animate
          class="queue-animator"
          begin="indefinite"
          attributeName="width"
          from={previous.shape.width + strokeMargin * 2}
          to={selected.shape.width + strokeMargin * 2}
          dur="0.5s"
        />
        <animate
          class="queue-animator"
          begin="indefinite"
          attributeName="x"
          from={previous.shape.x - strokeMargin}
          to={selected.shape.x - strokeMargin}
          dur="0.5s"
        />
        <animate
          class="queue-animator"
          begin="indefinite"
          attributeName="y"
          from={previous.shape.y - strokeMargin}
          to={selected.shape.y - strokeMargin}
          dur="0.5s"
        />
      {/if}
    </rect>
    <!-- top left -->
    <rect
      class="vertex top-left"
      x={selected.shape.x - strokeMargin - strokeWidth / 2}
      y={selected.shape.y - strokeMargin - strokeWidth / 2}
      width={strokeWidth}
      height={strokeWidth}
      on:click={onMouseClick}
      on:mousedown={e => onVertexMousedown('top-left', e)}
    >
      {#if previous}
        <animate
          class="queue-animator"
          begin="indefinite"
          attributeName="x"
          from={previous.shape.x - strokeMargin - strokeWidth / 2}
          to={selected.shape.x - strokeMargin - strokeWidth / 2}
          dur="0.5s"
        />
        <animate
          class="queue-animator"
          begin="indefinite"
          attributeName="y"
          from={previous.shape.y - strokeMargin - strokeWidth / 2}
          to={selected.shape.y - strokeMargin - strokeWidth / 2}
          dur="0.5s"
        />
      {/if}
    </rect>
    <!-- top middle -->
    <rect
      class="vertex top-middle"
      x={selected.shape.x + selected.shape.width / 2 - strokeWidth / 2}
      y={selected.shape.y - strokeMargin - strokeWidth / 2}
      width={strokeWidth}
      height={strokeWidth}
      on:click={onMouseClick}
      on:mousedown={e => onVertexMousedown('top-middle', e)}
    >
      {#if previous}
        <animate
          class="queue-animator"
          begin="indefinite"
          attributeName="x"
          from={previous.shape.x + previous.shape.width / 2 - strokeWidth / 2}
          to={selected.shape.x + selected.shape.width / 2 - strokeWidth / 2}
          dur="0.5s"
        />
        <animate
          class="queue-animator"
          begin="indefinite"
          attributeName="y"
          from={previous.shape.y - strokeMargin - strokeWidth / 2}
          to={selected.shape.y - strokeMargin - strokeWidth / 2}
          dur="0.5s"
        />
      {/if}
    </rect>
    <!-- top right -->
    <rect
      class="vertex top-right"
      x={selected.shape.x + selected.shape.width + strokeMargin - strokeWidth / 2}
      y={selected.shape.y - strokeMargin - strokeWidth / 2}
      width="8"
      height="8"
      on:click={onMouseClick}
      on:mousedown={e => onVertexMousedown('top-right', e)}
    >
      {#if previous}
        <animate
          class="queue-animator"
          begin="indefinite"
          attributeName="x"
          from={previous.shape.x + previous.shape.width + strokeMargin - strokeWidth / 2}
          to={selected.shape.x + selected.shape.width + strokeMargin - strokeWidth / 2}
          dur="0.5s"
        />
        <animate
          class="queue-animator"
          begin="indefinite"
          attributeName="y"
          from={previous.shape.y - strokeMargin - strokeWidth / 2}
          to={selected.shape.y - strokeMargin - strokeWidth / 2}
          dur="0.5s"
        />
      {/if}
    </rect>
    <!-- middle right -->
    <rect
      class="vertex middle-right"
      x={selected.shape.x + selected.shape.width + strokeMargin - strokeWidth / 2}
      y={selected.shape.y + selected.shape.height / 2 - strokeMargin / 2}
      width="8"
      height="8"
      on:click={onMouseClick}
      on:mousedown={e => onVertexMousedown('middle-right', e)}
    >
      {#if previous}
        <animate
          class="queue-animator"
          begin="indefinite"
          attributeName="x"
          from={previous.shape.x + previous.shape.width + strokeMargin - strokeWidth / 2}
          to={selected.shape.x + selected.shape.width + strokeMargin - strokeWidth / 2}
          dur="0.5s"
        />
        <animate
          class="queue-animator"
          begin="indefinite"
          attributeName="y"
          from={previous.shape.y + previous.shape.height / 2 - strokeMargin / 2}
          to={selected.shape.y + selected.shape.height / 2 - strokeMargin / 2}
          dur="0.5s"
        />
      {/if}
    </rect>
    <!-- bottom right -->
    <rect
      class="vertex bottom-right"
      x={selected.shape.x + selected.shape.width + strokeMargin - strokeWidth / 2}
      y={selected.shape.y + selected.shape.height + strokeMargin - strokeWidth / 2}
      width="8"
      height="8"
      on:click={onMouseClick}
      on:mousedown={e => onVertexMousedown('bottom-right', e)}
    >
      {#if previous}
        <animate
          class="queue-animator"
          begin="indefinite"
          attributeName="x"
          from={previous.shape.x + previous.shape.width + strokeMargin - strokeWidth / 2}
          to={selected.shape.x + selected.shape.width + strokeMargin - strokeWidth / 2}
          dur="0.5s"
        />
        <animate
          class="queue-animator"
          begin="indefinite"
          attributeName="y"
          from={previous.shape.y + previous.shape.height + strokeMargin - strokeWidth / 2}
          to={selected.shape.y + selected.shape.height + strokeMargin - strokeWidth / 2}
          dur="0.5s"
        />
      {/if}
    </rect>
    <!-- bottom middle -->
    <rect
      class="vertex bottom-middle"
      x={selected.shape.x + selected.shape.width / 2 - strokeWidth / 2}
      y={selected.shape.y + selected.shape.height + strokeMargin - strokeWidth / 2}
      width="8"
      height="8"
      on:click={onMouseClick}
      on:mousedown={e => onVertexMousedown('bottom-middle', e)}
    >
      {#if previous}
        <animate
          class="queue-animator"
          begin="indefinite"
          attributeName="x"
          from={previous.shape.x + previous.shape.width / 2 - strokeWidth / 2}
          to={selected.shape.x + selected.shape.width / 2 - strokeWidth / 2}
          dur="0.5s"
        />
        <animate
          class="queue-animator"
          begin="indefinite"
          attributeName="y"
          from={previous.shape.y + previous.shape.height + strokeMargin - strokeWidth / 2}
          to={selected.shape.y + selected.shape.height + strokeMargin - strokeWidth / 2}
          dur="0.5s"
        />
      {/if}
    </rect>
    <!-- bottom left -->
    <rect
      class="vertex bottom-left"
      x={selected.shape.x - strokeMargin - strokeWidth / 2}
      y={selected.shape.y + selected.shape.height + strokeMargin - strokeWidth / 2}
      width={strokeWidth}
      height={strokeWidth}
      on:click={onMouseClick}
      on:mousedown={e => onVertexMousedown('bottom-left', e)}
    >
      {#if previous}
        <animate
          class="queue-animator"
          begin="indefinite"
          attributeName="x"
          from={previous.shape.x - strokeMargin - strokeWidth / 2}
          to={selected.shape.x - strokeMargin - strokeWidth / 2}
          dur="0.5s"
        />
        <animate
          class="queue-animator"
          begin="indefinite"
          attributeName="y"
          from={previous.shape.y + previous.shape.height + strokeMargin - strokeWidth / 2}
          to={selected.shape.y + selected.shape.height + strokeMargin - strokeWidth / 2}
          dur="0.5s"
        />
      {/if}
    </rect>
    <!-- middle left -->
    <rect
      class="vertex middle-left"
      x={selected.shape.x - strokeMargin - strokeWidth / 2}
      y={selected.shape.y + selected.shape.height / 2 - strokeMargin / 2}
      width={strokeWidth}
      height={strokeWidth}
      on:click={onMouseClick}
      on:mousedown={e => onVertexMousedown('middle-left', e)}
    >
      {#if previous}
        <animate
          class="queue-animator"
          begin="indefinite"
          attributeName="x"
          from={previous.shape.x - strokeMargin - strokeWidth / 2}
          to={selected.shape.x - strokeMargin - strokeWidth / 2}
          dur="0.5s"
        />
        <animate
          class="queue-animator"
          begin="indefinite"
          attributeName="y"
          from={previous.shape.y + previous.shape.height / 2 - strokeMargin / 2}
          to={selected.shape.y + selected.shape.height / 2 - strokeMargin / 2}
          dur="0.5s"
        />
      {/if}
    </rect>
  </g>
{/if}

<style type="scss">
  .mover {
    cursor: move;
  }
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
