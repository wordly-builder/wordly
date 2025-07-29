<script lang="ts">
	interface Props {
		navigateTo: (page: string) => void;
	}

	let {navigateTo} : Props = $props();
</script>

<div class="no-panel-page flex flex-col h-full w-full items-center justify-center">
		<h1 class="text-2xl font-bold mb-4">No Panel Available</h1>
		<p class="text-gray-600">This page does not have a panel.</p>
		<button class="bg-primary text-white p-2 rounded hover:bg-primary-hover mt-4"
		onclick={() => navigateTo("SETTINGS")}>
				Add features
		</button>

</div>