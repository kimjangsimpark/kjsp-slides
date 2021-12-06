<script type="ts">
  import { document$ } from '@/store/document';
  import { objectReducer } from '@/store/object';
  import { currentQueue$ } from '@/store/queue';
  import {Shape} from './type';

  const dynamicShape = (type: Shape) => {
    const positionProperties = {
      x: $document$.rect.width / 2 - 50,
      y: $document$.rect.height / 2 - 50,
    }

    const sizeProperties = {
      width: 200,
      height: 100,
    }

    const lineProperties = {
      lineType: 'solid',
      lineWidth: 1,
      lineColor: '#000000',
    }

    switch (type) {
      case Shape.RECTANGLE: {
        return {
          ...positionProperties,
          ...sizeProperties,
          ...lineProperties,
        }
      }
      case Shape.OVAL: {
        return {
          ...positionProperties,
          ...sizeProperties,
          ...lineProperties,
        }
      }
      case Shape.TEXT: {
        return {
          ...positionProperties,
          ...sizeProperties,
          text: {
            innerText: 'asldkfjasd',
            textColor: 'red',
          },
        }
      }
    }
  }

  const onClick = (type: Shape) => {
    if (!$document$) {
      return;
    }
    objectReducer({
      type: 'insertObject',
      state: {
        type: type,
        uuid: Math.random()
          .toString(36)
          .replace(/[^a-z]+/g, '')
          .substr(0, 5),
        effects: [
          {
            type: 'create',
            index: $currentQueue$.index,
          },
        ],
        shape: dynamicShape(type),
      },
    });
  };
</script>

<div id="side-bar-root">
  <button on:click={e => onClick('rectangle')}>rectangle</button>
  <button on:click={e => onClick('oval')}>oval</button>
  <button on:click={e => onClick('text')}>add textarea</button>
</div>

<style type="scss">
  #side-bar-root {
    width: 200px;
  }
</style>
