<script lang="ts">
import type { DisplayProps } from '$lib/types/panel';
import CharactersHomePage from '$lib/types/features/panels/character/CharactersHomePage.svelte';
import NewCharacterPage from '$lib/types/features/panels/character/NewCharacterPage.svelte';

let { navigateTo }: DisplayProps = $props();

let page = $state("HOME")
</script>

{#if page === "HOME"}
	<CharactersHomePage {navigateTo} bind:page={page} />
{:else if page === "NEW"}
	<NewCharacterPage bind:page={page} />
{/if}
