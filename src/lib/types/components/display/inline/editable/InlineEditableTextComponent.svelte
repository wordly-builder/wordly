<script lang="ts">
	import type { InlineDisplayEditableProps } from '$lib/types/component.metadata';

	let {component}: InlineDisplayEditableProps = $props();
</script>

<div class="flex flex-row w-full justify-between items-center p-4 bg-white dark:bg-dark-elevation-1">
	<input
		type="text"
		bind:value={component.fields[0].value}
		class="w-full bg-elevation-2 dark:bg-dark-elevation-2 p-2 rounded-xl"
		placeholder="Enter text here..."
	/>
</div>