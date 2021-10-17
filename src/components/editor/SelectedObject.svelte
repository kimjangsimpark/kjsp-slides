<script type="ts">
  import type { QueueObject } from '@/store/document';
  export let previous: QueueObject | null = null;
  export let selected: QueueObject;

  const strokeWidth = 10;
  const strokeMargin = 5;

  interface Position {
    x: number;
    y: number;
  }

  let position: Position | null = null;

  const onMouseClick = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const onMouseDown = (e: MouseEvent) => {
    position = {
      x: e.clientX,
      y: e.clientY,
    };
  };

  const onMouseMove = (e: MouseEvent) => {
    if (!position) {
      return;
    }
    const updatedPosition: Position = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  const onMouseUp = (e: MouseEvent) => {
    position = null;
  };
</script>

{#if selected}
  <g
    on:click={onMouseClick}
    on:mousedown={onMouseDown}
    on:mousemove={onMouseMove}
    on:mouseup={onMouseUp}
  >
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
