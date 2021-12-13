<script type="ts" context="module">
  import rectanglePreview from './previews/rectangle.svg';
  import circlePreview from './previews/circle.svg';
  import textareaPreview from './previews/textarea.svg';

  interface ObjectModel {
    key: ObjectType;
    previewUrl: string;
    alt: string;
  }

  interface GroupModel {
    name: string;
    opened: boolean;
    objects: ObjectModel[];
  }
</script>

<script type="ts">
  import { ObjectType } from '@/http/document';
  import { leftSidebarReducer } from './LeftSidebar.store';

  const models: GroupModel[] = [
    {
      name: 'object',
      opened: true,
      objects: [
        {
          key: ObjectType.RECTANGLE,
          previewUrl: rectanglePreview,
          alt: 'rectangle',
        },
        {
          key: ObjectType.CIRCLE,
          previewUrl: circlePreview,
          alt: 'circle',
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
        },
      ],
    },
  ];

  function toggleGroup(model: GroupModel) {
    const index = models.indexOf(model);
    const newModel = { ...model };
    newModel.opened = !newModel.opened;
    models[index] = newModel;
  }

  const onClick = (type: ObjectType) => {
    leftSidebarReducer({
      type: 'create',
      objectType: type,
    });
  };
</script>

<div id="object-panel-root">
  {#each models as model}
    <div class="object-group" on:click={() => toggleGroup(model)}>{model.name}</div>
    {#if model.opened}
      <div class="object-list">
        {#each model.objects as object}
          <div class="object-preview-container" on:click={() => onClick(object.key)}>
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
