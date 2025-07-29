<script lang="ts">
import LeftBar from '$lib/pages/editor/components/LeftBar.svelte';
import type { DisplayProps } from '$lib/types/panel';

let { navigateTo }: DisplayProps = $props();
</script>

<div class="flex flex-row h-full w-full">
	<LeftBar current="CHARACTERS" {navigateTo}/>

	<div class="flex flex-col h-full w-full p-4">
		<div class="flex flex-row items-center justify-between mb-6">
			<h1 class="text-2xl font-bold">Characters</h1>
			<button class="text-white p-2 rounded hover:bg-elevation-1 flex items-center dark:hover:bg-dark-elevation-1 "
							onclick={() => navigateTo("SETTINGS")} aria-label="Settings">
				<img src="images/icons/icon_settings_white.svg" alt="Settings" class="w-8 h-8 inline-block" />
			</button>
		</div>
		<p class="text-gray-600 dark:text-gray-400 mb-6">Manage your characters here.</p>
		<!-- Character management content goes here -->
	</div>

</div>