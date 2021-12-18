<script type="ts" context="module">
  export function create(index: number, x: number, y: number): RectangleObject {
    return {
      type: ObjectType.RECTANGLE,
      uuid: Math.random()
        .toString(36)
        .replace(/[^a-z]+/g, '')
        .substr(0, 5),
      effects: [
        {
          type: 'create',
          index: index,
        },
      ],
      shape: {
        x: x,
        y: y,
        width: 100,
        height: 100,
        lineType: 'solid',
        lineWidth: 1,
        lineColor: '#000000',
      },
    };
  }
</script>

<script type="ts">
  import { DocumentObject, ObjectType, RectangleObject } from '@/document/document.store';

  export let currentObject: RectangleObject;
  export let previousObject: DocumentObject | RectangleObject | null;
</script>

<rect
  x={currentObject.shape.x}
  y={currentObject.shape.y}
  width={currentObject.shape.width}
  height={currentObject.shape.height}
  stroke={currentObject.shape.lineColor}
  stroke-width={currentObject.shape.lineWidth}
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
