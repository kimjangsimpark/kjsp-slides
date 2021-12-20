<script type="ts" context="module">
  import rectanglePreview from './previews/rectangle.svg';
  import circlePreview from './previews/circle.svg';
  import textareaPreview from './previews/textarea.svg';

  interface PanelItem {
    key: ObjectType;
    previewUrl: string;
    alt: string;
    click: () => void;
  }

  interface PanelGroup {
    name: string;
    opened: boolean;
    objects: PanelItem[];
  }
</script>

<script type="ts">
  import { objectPanelSlice } from './ObjectPanel.store';
  import { useDispatch, useSelector } from '@/app/hooks';
  import { objectsSlice, ObjectType } from '@/document/object.store';
  import { currentQueueIndexSelector } from '@/document/queue.store';
  import { documentSelector } from '@/document/document.store';

  const document = useSelector(documentSelector());
  const queueIndex = useSelector(currentQueueIndexSelector());
  const dispatch = useDispatch();

  const models: PanelGroup[] = [
    {
      name: 'object',
      opened: true,
      objects: [
        {
          key: ObjectType.RECTANGLE,
          previewUrl: rectanglePreview,
          alt: 'rectangle',
          click: () =>
            dispatch(
              objectsSlice.actions.createObject({
                index: $queueIndex,
                type: ObjectType.RECTANGLE,
                rect: {
                  x: 0,
                  y: 0,
                  height: 100,
                  width: 100,
                  lineColor: 'red',
                  lineType: 'red',
                  lineWidth: 3,
                },
              }),
            ),
        },
        {
          key: ObjectType.CIRCLE,
          previewUrl: circlePreview,
          alt: 'circle',
          click: () => {},
        },
      ],
    },
    {
      name: 'text',
      opened: true,
      objects: [
        {
          key: ObjectType.TEXTAREA,
          previewUrl: textareaPreview,
          alt: 'textarea',
          click: () => {},
        },
      ],
    },
  ];

  function toggleGroup(model: PanelGroup) {
    const index = models.indexOf(model);
    const newModel = { ...model };
    newModel.opened = !newModel.opened;
    models[index] = newModel;
  }

  const onClick = (type: ObjectType) => {
    dispatch(
      objectPanelSlice.actions.create({
        type: 'create',
      }),
    );
  };
</script>

<div id="object-panel-root">
  {#each models as model}
    <div class="object-group" on:click={() => toggleGroup(model)}>{model.name}</div>
    {#if model.opened}
      <div class="object-list">
        {#each model.objects as object}
          <div class="object-preview-container" on:click={() => object.click()}>
            <img class="object-preview-image" src={object.previewUrl} alt={object.alt} />
          </div>
        {/each}
      </div>
    {/if}
  {/each}
</div>

<style type="scss">
  #object-panel-root {
    width: 200px;
    display: flex;
    flex-direction: column;
  }

  .object-group,
  .object-list {
    width: 100%;
    display: flex;
  }

  .object-list {
    display: grid;
    grid-template-columns: repeat(4, 25%);
  }

  .object-preview-container {
    :hover {
      background-color: #eee;
    }
  }

  .object-preview-image {
    margin: 5px;
  }
</style>
