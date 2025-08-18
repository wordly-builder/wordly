<script lang="ts">
	import LeftBar from '$lib/pages/editor/components/LeftBar.svelte';

	interface Props {
		navigateTo: (page: string) => void;
		page: string;
	}

	let { navigateTo, page = $bindable() }: Props = $props();
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

		<div class="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">

			<button class="bg-elevation-1 dark:bg-dark-elevation-1 p-4 rounded-lg cursor-pointer hover:bg-elevation-2 dark:hover:bg-dark-elevation-2 transition-colors"
					onclick={() => page = "NEW"} aria-label="Create New Character">
				<div class="aspect-square w-full flex items-center justify-center">
					<p class="text-center text-6xl">+</p>
				</div>
				<p class="text-center text-lg font-semibold mt-4 pb-2">Create New Character</p>
			</button>



		</div>

	</div>

</div>