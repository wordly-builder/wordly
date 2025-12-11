<script lang="ts">
	import LeftBar from '$lib/pages/editor/components/LeftBar.svelte';
	import { opfsState } from '$lib/states/opfs.state.svelte';
	import { projectState } from '$lib/states/project.state.svelte';
	import { onMount } from 'svelte';
	import { LoroDoc } from 'loro-crdt';

	interface Props {
		navigateTo: (page: string) => void;
		page: string;
	}

	let { navigateTo, page = $bindable() }: Props = $props();

	let opfsRoot: FileSystemDirectoryHandle | null = opfsState.root;
	let projectId: string | null = projectState.id;
	let characters: any[] = $state([])

	async function updateCharactersList() {
		while (indexedDB === null || opfsRoot === null) {
			await new Promise(resolve => setTimeout(resolve, 100));
		}

		if (!projectId) {
			alert("No project selected.");
			return;
		}

		let projectDir = await opfsRoot.getDirectoryHandle(projectId);
		let charactersDir = await projectDir.getDirectoryHandle("characters", { create: true });
		let projectFile = await projectDir.getFileHandle("file.wordly", { create: false });
		let fileData = await projectFile.getFile();
		let arrayBuffer = await fileData.arrayBuffer();
		let uint8Array = new Uint8Array(arrayBuffer);
		let loroDoc = LoroDoc.fromSnapshot(uint8Array);

		let charactersMap = loroDoc.getMap("characters");

		for await (let [key, value] of charactersMap.entries()) {
			let characterData = value as any;

			let picture = await getCharacterImage(key);

			characters.push({
				id: key,
				name: characterData.name,
				picture: picture
			});
		}

	}

	async function getCharacterImage(characterId: string): string {
		while (!opfsRoot) {
			await new Promise(resolve => setTimeout(resolve, 100));
		}

		if (!projectId) {
			return 'images/character_placeholder.png'; // Fallback image
		}

		let dir = await opfsRoot.getDirectoryHandle(projectId, { create: false });
		try {
			let charactersDir = await dir.getDirectoryHandle("characters", { create: false });
			let characterDir = await charactersDir.getDirectoryHandle(characterId, { create: false });
			let fileHandle = await characterDir.getFileHandle('picture.png', { create: false });
			let file = await fileHandle.getFile();
			return URL.createObjectURL(file);
		} catch (_) {
			return 'images/project_placeholder.png'; // Fallback image
		}
	}

	onMount(
		() => {
			updateCharactersList();
		}
	)

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

			{#each characters as character}
				<button class="bg-elevation-1 dark:bg-dark-elevation-1 p-4 rounded-lg cursor-pointer hover:bg-elevation-2 dark:hover:bg-dark-elevation-2 transition-colors"
					onclick={() => page = "CARD_" + character.id} aria-label={"Open character " + character.name}>
					<div class="aspect-square w-full flex items-center justify-center">
						<img src={character.picture} alt={character.name} class="w-full h-full object-cover rounded" />
					</div>
					<p class="text-center text-lg font-semibold mt-4 pb-2">{character.name}</p>
				</button>
			{/each}

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