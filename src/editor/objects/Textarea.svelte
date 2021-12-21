<script type="ts">
  import type { Animatable, TextareaObject } from '@/store/object.store';
  export let object: TextareaObject;
  export let to: Animatable;
  export let from: Animatable | null;
</script>

<rect
  x={to.shape.x}
  y={to.shape.y}
  width={to.shape.width}
  height={to.shape.height}
  stroke={object.stroke.strokeColor}
  stroke-width={object.stroke.strokeWidth}
  fill="transparent"
>
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
</rect>
<foreignObject
  x={to.shape.x}
  y={to.shape.y}
  width={to.shape.width}
  height={to.shape.height}
  fill="transparent"
>
  {#if object.text}
    <textarea
      class="object-textarea"
      style="height: 100%; width: 100%;"
      value={object.text.innerText}
    />
  {/if}
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
