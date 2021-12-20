<script type="ts">
  import type { QueueObject, RectangleObject } from '@/document/object.store';
  export let currentObject: RectangleObject;
  export let previousObject: QueueObject | null;
</script>

<rect
  x={currentObject.shape.x}
  y={currentObject.shape.y}
  width={currentObject.shape.width}
  height={currentObject.shape.height}
  stroke={currentObject.stroke.lineColor}
  stroke-width={currentObject.stroke.lineWidth}
  fill="transparent"
>
  {#if previousObject}
    <animate
      class="queue-animator"
      begin="indefinite"
      attributeName="height"
      from={previousObject.shape.height}
      to={currentObject.shape.height}
      dur="0.5s"
    />
    <animate
      class="queue-animator"
      begin="indefinite"
      attributeName="width"
      from={previousObject.shape.width}
      to={currentObject.shape.width}
      dur="0.5s"
    />
    <animate
      class="queue-animator"
      begin="indefinite"
      attributeName="x"
      from={previousObject.shape.x}
      to={currentObject.shape.x}
      dur="0.5s"
    />
    <animate
      class="queue-animator"
      begin="indefinite"
      attributeName="y"
      from={previousObject.shape.y}
      to={currentObject.shape.y}
      dur="0.5s"
    />
  {/if}
</rect>
