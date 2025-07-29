<script lang="ts">
	import { panels } from '$lib/types/panels/panels';

	interface Props {
		current: string;
		navigateTo: (page: string) => void;
	}

	let { current, navigateTo }: Props = $props();

</script>

<div class="min-h-full bg-dark-elevation-1 w-20 flex flex-col items-center justify-start p-2">
	{#each panels as panel}
		<button class="flex w-full items-center justify-center mb-4 cursor-pointer {current === panel.id ? 'bg-secondary text-white' : 'bg-elevation-1 dark:bg-dark-elevation-1 hover:bg-elevation-2 dark:hover:bg-dark-elevation-2'} rounded-xl p-2"
			onclick={() => navigateTo(panel.id)} aria-label={panel.name}>
			<img src={panel.iconWhite} class="w-10" alt={panel.name} />
		</button>
	{/each}
</div>