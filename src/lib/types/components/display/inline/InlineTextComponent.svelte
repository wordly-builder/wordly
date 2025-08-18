<script lang="ts">
	import type { InlineDisplayProps } from '$lib/types/component.metadata';

	let {component}: InlineDisplayProps = $props();
</script>

<div class="flex flex-row w-full justify-between items-center p-4 bg-white dark:bg-dark-elevation-1">
	<p>{component.fields[0].value ? component.fields[0].value : ""}</p>
</div>