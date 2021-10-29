<script type="ts">
  import { document$ } from '@/store/document';
  import { objectReducer } from '@/store/object';
  import { currentQueue$ } from '@/store/queue';

  const onClick = (type: string) => {
    if (!$document$) {
      return;
    }
    objectReducer({
      type: 'insertObject',
      state: {
        type: 'rectangle',
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
        shape: {
          x: $document$.rect.width / 2 - 50,
          y: $document$.rect.height / 2 - 50,
          width: 100,
          height: 100,
          lineType: 'solid',
          lineWidth: 1,
          lineColor: '#000000',
        },
      },
    });
  };
</script>

<div id="side-bar-root">
  <button on:click={e => onClick('rectangle')}>add rectangle</button>
</div>

<style type="scss">
  #side-bar-root {
    width: 200px;
  }
</style>
