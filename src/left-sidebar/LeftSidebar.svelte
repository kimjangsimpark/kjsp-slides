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

<div id="side-bar-root">
  <button on:click={e => onClick(ObjectType.RECTANGLE)}>add rectangle</button>
  <button on:click={e => onClick(ObjectType.TEXTAREA)}>add textarea</button>
</div>

<style type="scss">
  #side-bar-root {
    width: 200px;
  }
</style>
