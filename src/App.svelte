<script type="ts">
	import Toolbar from '@/main-toolbar/MainToolbar.svelte';
	import SubToolbar from '@/sub-toolbar/SubToolbar.svelte';
	import ObjectPanel from '@/object-panel/ObjectPanel.svelte';
	import Editor from '@/editor/Editor.svelte';
	import ObjectContolPanel from '@/object-control-panel/ObjectContolPanel.svelte';
	import { useSelector } from '@/app/hooks';
	import { documentSelector } from '@/store/document.store';
	import { selectedObjectsSelector } from '@/store/selected.store';
	const document = useSelector(documentSelector());
	const selected = useSelector(selectedObjectsSelector());
</script>

<div id="app-root">
	<div id="toolbar-root">
		<Toolbar />
	</div>
	<div id="subtoolbar-root">
		{#if $document}
			<SubToolbar />
		{/if}
	</div>
	<div id="app-body">
		{#if $document}
			<div id="side-bar-root">
				<ObjectPanel />
			</div>
			<div id="editor-root">
				<Editor />
			</div>
		{/if}
		{#if $selected.length}
			<div class="object-control-panel-root">
				<ObjectContolPanel />
			</div>
		{/if}
	</div>
</div>

<style lang="scss">
	#app-root {
		width: 100%;
		display: flex;
		flex-direction: column;
		overflow: hidden;

		#app-body {
			flex: 1 1 auto;
			display: flex;
			height: calc(100vh - 110px);

			#side-bar-root {
				flex: 0 0 auto;
				width: 200px;
			}

			#editor-root {
				flex: 1 1 auto;
				background: #e9eaed;
				overflow: auto;
			}
		}
	}

	.object-control-panel-root {
		width: 200px;
	}
</style>
