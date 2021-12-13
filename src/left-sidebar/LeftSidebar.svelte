<script type="ts" context="module">
  import rectanglePreview from './previews/rectangle.svg';
  import circlePreview from './previews/circle.svg';
  import textareaPreview from './previews/textarea.svg';

  interface ObjectModel {
    key: ObjectType;
    previewUrl: string;
    alt: string;
  }

  interface TreeModel {
    name: string;
    opened: boolean;
    objects: ObjectModel[];
  }

  const models: TreeModel[] = [
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
</script>

<script type="ts">
  import { ObjectType } from '@/http/document';
  import { leftSidebarReducer } from './LeftSidebar.store';

  const onClick = (type: ObjectType) => {
    leftSidebarReducer({
      type: 'create',
      objectType: type,
    });
  };
</script>

<div id="object-panel-root">
  {#each models as model (model.name)}
    <div class="object-group">{model.name}</div>
    <div class="object-list">
      {#each model.objects as object (object.key)}
        {#if model.opened}
          <div class="object-preview-container">
            <img class="object-preview-image" src={object.previewUrl} alt={object.alt} />
          </div>
        {/if}
      {/each}
    </div>
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
