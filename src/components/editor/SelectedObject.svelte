<script type="ts">
  import type { Observable } from 'rxjs';
  import type { QueueObject } from '@/store/document';
  import { currentQueueObject$ } from '@/store/queueObject';

  const strokeWidth = 8;
  const strokeMargin = 5;

  interface Position {
    x: number;
    y: number;
  }

  $: object = currentQueueObject$ as Observable<QueueObject>;

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
    console.log(updatedPosition);
  };

  const onMouseUp = (e: MouseEvent) => {
    position = null;
  };
</script>

{#if $object}
  <g
    on:click={onMouseClick}
    on:mousedown={onMouseDown}
    on:mousemove={onMouseMove}
    on:mouseup={onMouseUp}
  >
    <rect
      stroke="black"
      stroke-width="2"
      stroke-dasharray="5"
      fill="transparent"
      x={$object.shape.x - strokeMargin}
      y={$object.shape.y - strokeMargin}
      width={$object.shape.width + strokeMargin * 2}
      height={$object.shape.height + strokeMargin * 2}
    >
      <!-- <animate
        attributeName="height"
        from="0"
        to="27.5"
        dur="3s"
        fill="freeze"
        restart="always"
      />
      <animate
        attributeName="y"
        from="190"
        to="162.5"
        dur="3s"
        fill="freeze"
        restart="always"
      /> -->
    </rect>
    <!-- top left -->
    <rect
      class="vertex"
      x={$object.shape.x - strokeMargin - strokeWidth / 2}
      y={$object.shape.y - strokeMargin - strokeWidth / 2}
      width={strokeWidth}
      height={strokeWidth}
    />
    <!-- top middle -->
    <rect
      x={$object.shape.x + $object.shape.width / 2 - strokeWidth / 2}
      y={$object.shape.y - strokeMargin - strokeWidth / 2}
      width={strokeWidth}
      height={strokeWidth}
    />
    <!-- top right -->
    <rect
      x={$object.shape.x + $object.shape.width + strokeMargin - strokeWidth / 2}
      y={$object.shape.y - strokeMargin - strokeWidth / 2}
      width="8"
      height="8"
    />
    <!-- middle right -->
    <rect
      x={$object.shape.x + $object.shape.width + strokeMargin - strokeWidth / 2}
      y={$object.shape.y + $object.shape.height / 2 - strokeMargin / 2}
      width="8"
      height="8"
    />
    <!-- bottom right -->
    <rect
      x={$object.shape.x + $object.shape.width + strokeMargin - strokeWidth / 2}
      y={$object.shape.y + $object.shape.height + strokeMargin - strokeWidth / 2}
      width="8"
      height="8"
    />
    <!-- bottom middle -->
    <rect
      x={$object.shape.x + $object.shape.width / 2 - strokeWidth / 2}
      y={$object.shape.y + $object.shape.height + strokeMargin - strokeWidth / 2}
      width="8"
      height="8"
    />
    <!-- bottom left -->
    <rect
      x={$object.shape.x - strokeMargin - strokeWidth / 2}
      y={$object.shape.y + $object.shape.height + strokeMargin - strokeWidth / 2}
      width={strokeWidth}
      height={strokeWidth}
    />
    <!-- bottom middle -->
    <rect
      x={$object.shape.x - strokeMargin - strokeWidth / 2}
      y={$object.shape.y + $object.shape.height / 2 - strokeMargin / 2}
      width={strokeWidth}
      height={strokeWidth}
    />
  </g>
{/if}

<style>
  .vertex {
    color: red;
  }
</style>
