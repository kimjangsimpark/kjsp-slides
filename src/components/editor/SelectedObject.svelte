<script type="ts">
  import type { Observable } from 'rxjs';
  import type { QueueObject } from '@/store/document';
  import { currentQueueObject$ } from '@/store/queueObject';

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
      stroke="red"
      stroke-width="2"
      fill="transparent"
      x={$object.shape.x - 5}
      y={$object.shape.y - 5}
      width={$object.shape.width + 10}
      height={$object.shape.height + 10}
    />
  </g>
{/if}
