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
    <div class="object-group" on:click={() => toggleGroup(model)}>
      <div class="object-group-text {model.opened ? 'opened' : 'closed'}">
        {model.name}
      </div>
    </div>
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

  .object-group {
    transition: all 0.1s ease-in-out;
    user-select: none;
    display: block;

    &:hover {
      background: #eee;
    }

    .object-group-text {
      background-repeat: no-repeat;
      background-position: 5% 50%;
      &.opened {
        background-image: url('data:image/gif;base64,R0lGODlhDQANAIABAJmZmf///yH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4wLWMwNjAgNjEuMTM0Nzc3LCAyMDEwLzAyLzEyLTE3OjMyOjAwICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IE1hY2ludG9zaCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoxREY3NzBERjZGNUYxMUU1QjZEOThCNDYxMDQ2MzNCQiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoxREY3NzBFMDZGNUYxMUU1QjZEOThCNDYxMDQ2MzNCQiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjFERjc3MERENkY1RjExRTVCNkQ5OEI0NjEwNDYzM0JCIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjFERjc3MERFNkY1RjExRTVCNkQ5OEI0NjEwNDYzM0JCIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Af/+/fz7+vn49/b19PPy8fDv7u3s6+rp6Ofm5eTj4uHg397d3Nva2djX1tXU09LR0M/OzczLysnIx8bFxMPCwcC/vr28u7q5uLe2tbSzsrGwr66trKuqqainpqWko6KhoJ+enZybmpmYl5aVlJOSkZCPjo2Mi4qJiIeGhYSDgoGAf359fHt6eXh3dnV0c3JxcG9ubWxramloZ2ZlZGNiYWBfXl1cW1pZWFdWVVRTUlFQT05NTEtKSUhHRkVEQ0JBQD8+PTw7Ojk4NzY1NDMyMTAvLi0sKyopKCcmJSQjIiEgHx4dHBsaGRgXFhUUExIREA8ODQwLCgkIBwYFBAMCAQAAIfkEAQAAAQAsAAAAAA0ADQAAAhGMj6nL3QAjVHIu6azbvPtWAAA7');
      }
      &.closed {
        background-image: url('data:image/gif;base64,R0lGODlhDQANAIABAJmZmf///yH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4wLWMwNjAgNjEuMTM0Nzc3LCAyMDEwLzAyLzEyLTE3OjMyOjAwICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IE1hY2ludG9zaCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDozNUQyRTJFNjZGNUYxMUU1QjZEOThCNDYxMDQ2MzNCQiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDozNUQyRTJFNzZGNUYxMUU1QjZEOThCNDYxMDQ2MzNCQiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjFERjc3MEUxNkY1RjExRTVCNkQ5OEI0NjEwNDYzM0JCIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjFERjc3MEUyNkY1RjExRTVCNkQ5OEI0NjEwNDYzM0JCIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Af/+/fz7+vn49/b19PPy8fDv7u3s6+rp6Ofm5eTj4uHg397d3Nva2djX1tXU09LR0M/OzczLysnIx8bFxMPCwcC/vr28u7q5uLe2tbSzsrGwr66trKuqqainpqWko6KhoJ+enZybmpmYl5aVlJOSkZCPjo2Mi4qJiIeGhYSDgoGAf359fHt6eXh3dnV0c3JxcG9ubWxramloZ2ZlZGNiYWBfXl1cW1pZWFdWVVRTUlFQT05NTEtKSUhHRkVEQ0JBQD8+PTw7Ojk4NzY1NDMyMTAvLi0sKyopKCcmJSQjIiEgHx4dHBsaGRgXFhUUExIREA8ODQwLCgkIBwYFBAMCAQAAIfkEAQAAAQAsAAAAAA0ADQAAAhSMj6lrwAjcC1GyahV+dcZJgeIIFgA7');
      }
      padding: 10px 15px 10px 30px;
    }
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
