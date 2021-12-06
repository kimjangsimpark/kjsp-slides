<script type="ts" context="module">
  export const TREE_GROUP_CONTEXT_KEY = `tree-group-context`;
  export enum PreferedPosition {
    TOP = 'top',
    RIGHT = 'right',
    BOTTOM = 'bottom',
    LEFT = 'left',
  }
  export enum PerferedAlign {
    FORWARD = 'forward',
    CENTER = 'center',
    REVERSE = 'reverse',
  }
  export interface TreeGroupContext {
    open(): void;
  }
</script>

<script type="ts">
  import { onDestroy$ } from '@/misc/svelte-rx';
  import { setContext } from 'svelte';

  setContext<TreeGroupContext>(TREE_GROUP_CONTEXT_KEY, {
    open(): void {
      console.log('hello world!');
    },
  });
</script>

<slot />
