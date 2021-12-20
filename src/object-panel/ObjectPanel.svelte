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
  import { useDispatch, useSelector } from '@/app/hooks';
  import { objectsSlice, ObjectType } from '@/store/object.store';
  import { currentQueueIndexSelector } from '@/store/queue.store';
  import { Document, documentSelector } from '@/store/document.store';
  import type { Observable } from 'rxjs';

  const document = useSelector(documentSelector()) as Observable<Document>;
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
          click: () => {
            dispatch(
              objectsSlice.actions.createObject({
                index: $queueIndex,
                type: ObjectType.RECTANGLE,
                rect: {
                  x: $document.rect.width / 2 - 50,
                  y: $document.rect.height / 2 - 50,
                  height: 100,
                  width: 100,
                },
              }),
            );
          },
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
          click: () => {
            dispatch(
              objectsSlice.actions.createObject({
                index: $queueIndex,
                type: ObjectType.TEXTAREA,
                rect: {
                  x: $document.rect.width / 2 - 50,
                  y: $document.rect.height / 2 - 50,
                  height: 100,
                  width: 100,
                },
              }),
            );
          },
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
