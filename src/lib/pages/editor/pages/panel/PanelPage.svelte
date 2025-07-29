<script lang="ts">
	import type { Component } from 'svelte';
	import { panels } from '$lib/types/panels/panels';
	import Empty from '$lib/pages/editor/pages/panel/Empty.svelte';
	import type { DisplayProps } from '$lib/types/panel';

	interface Props {
		page: string;
		navigateTo: (page: string) => void;
	}

	let { page = $bindable(), navigateTo }: Props = $props();
	let Panel = $state<Component<DisplayProps> | Component>(panels.find(p => p.id === page)?.display || Empty);

	$effect(() => {
		const foundPanel = panels.find(p => p.id === page);
		if (foundPanel) {
			Panel = foundPanel.display;
		} else {
			Panel = Empty;
		}
	});
</script>

<Panel {navigateTo} />