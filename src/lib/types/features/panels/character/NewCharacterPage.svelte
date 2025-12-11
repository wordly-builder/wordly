<script lang="ts">
	import { components, instantiateComponent } from '$lib/types/components/components';
	import type { Component } from '$lib/types/component';
	import { opfsState } from '$lib/states/opfs.state.svelte';
	import { projectState } from '$lib/states/project.state.svelte';
	import { LoroDoc } from 'loro-crdt';

	interface Props {
		page: string;
	}


	interface Detail {
		name: string;
		type: string;
		value: Component; // This can be more specific based on the component type
	}

	let { page=$bindable() }: Props = $props();
	let name = $state("");
	let picture = $state<File | Blob | null>(null);
	let details: Detail[] = $state([]);

	let opfsRoot: FileSystemDirectoryHandle | null = opfsState.root;
	let projectId: string | null = projectState.id;

	// current detail values
	let detailName = $state("");
	let detailType = $state("TEXT");

	const excludedComponents = ["CONCEPT"]
	const availableComponents = components.filter(
		(component) => !excludedComponents.includes(component.id)
	);

	function handleChangePicture(event: Event) {
		const input = event.target as HTMLInputElement;
		const preview = document.getElementById('character-picture-preview') as HTMLImageElement;
		if (input.files && input.files[0]) {
			preview.src = URL.createObjectURL(input.files[0]);
			picture = input.files[0];
		}
	}

	async function createCharacter() {

		while (indexedDB === null || opfsRoot === null) {
			await new Promise(resolve => setTimeout(resolve, 100));
		}

		if (!projectId) {
			alert("No project selected.");
			return;
		}

		if (!name.trim()) {
			alert("Character name cannot be empty.");
			return;
		}

		let characterUUID = crypto.randomUUID();
		let projectDir = await opfsRoot.getDirectoryHandle(projectId, { create: false });
		let characterDir = await projectDir.getDirectoryHandle("characters", { create: true });
		let newCharacterDir = await characterDir.getDirectoryHandle(characterUUID, { create: true });
		let pictureHandle = await newCharacterDir.getFileHandle("picture.png", { create: true });

		// Save character picture
		let writable = await pictureHandle.createWritable();
		if (!picture) {
			let defaultImage = await fetch("images/character_placeholder.png");
			picture = await defaultImage.blob();
		}
		await writable.write(picture);
		await writable.close();

		// Save character details
		let projectHandle = await projectDir.getFileHandle("file.wordly", { create: false });
		let projectReadable = await projectHandle.getFile()
		let arrayBuffer = await projectReadable.arrayBuffer();
		let project: LoroDoc = LoroDoc.fromSnapshot(new Uint8Array(arrayBuffer));
		let charactersMap = project.getMap("characters");

		let newCharacterDetails = new Map<string, any>();
		for (const detail of details) {
			let fieldsMap = new Map<string, any>();
			for (const value of detail.value.fields) {
				fieldsMap.set(value.meta.name, value.value);
			}
			newCharacterDetails.set(detail.name, fieldsMap);
		}
		let newCharacterMap = new Map<string, any>();
		newCharacterMap.set("name", name);
		newCharacterMap.set("details", newCharacterDetails);

		charactersMap.set(characterUUID, newCharacterMap);

		let writableProject = await projectHandle.createWritable();
		let exported = project.export({mode: "snapshot"});
		await writableProject.write(exported);
		await writableProject.close();

		page = "HOME";
	}
</script>

<div class="flex flex-col p-4">
	<div class="flex flex-row items-start justify-between w-full">
		<button class="bg-secondary text-white p-2 rounded hover:bg-secondary-hover cursor-pointer mb-4" onclick={() => page = "HOME"}>
			&lsaquo; Back
		</button>
		<h1>New character</h1>
		<div></div>
	</div>
	<div class="flex flex-row items-start justify-between w-full">
		<div class="flex flex-col items-start justify-start w-1/3 m-2 bg-elevation-1 dark:bg-dark-elevation-1 p-2 rounded-xl">
			<label for="character-name" class="mb-2">Name</label>
			<input id="character-name" type="text" class="border border-gray-300 p-2 rounded w-full mb-4" placeholder="Enter character name"
						 bind:value={name} />

			<label for="character-description" class="mb-2">Picture</label>
			<input id="character-picture" type="file" accept="image/*" class="bg-secondary hover:bg-secondary-hover cursor-pointer p-2 rounded w-full mb-4"
						 onchange="{handleChangePicture}" />
			<img src="images/character_placeholder.png" alt="Character" class="w-full aspect-square object-cover rounded" id="character-picture-preview" />

			<button class="bg-primary w-full text-white mt-4 p-2 rounded hover:bg-primary-hover cursor-pointer" onclick="{createCharacter}">
				Save
			</button>
		</div>

		<div class="w-2/3 flex flex-col">
			<div class="bg-elevation-1 dark:bg-dark-elevation-1 p-2 rounded-xl m-2">
				<p class="text-lg font-semibold mb-2">Character Details</p>

				{#each details as detail}

					<div class="flex flex-row items-center justify-between mb-2">
						<p>{detail.name}</p>
						{#if detail.value.meta.inlineDisplayEditable}
							<detail.value.meta.inlineDisplayEditable component={detail.value} />
						{:else}
							<p></p>
						{/if}
					</div>
				{/each}

				<div class="flex flex-row items-center justify-between mb-2">
					<input type="text" class="border p-2 rounded w-80" placeholder="name" bind:value={detailName} />
					<select bind:value={detailType} class="border p-2 rounded w-1/3 text-black bg-elevation-1 dark:bg-dark-elevation-1 dark:text-white">
						{#each availableComponents as component (component.id)}
							<option value={component.id}>{component.name}</option>
						{/each}
					</select>
					<button class="bg-secondary text-white p-2 rounded hover:bg-secondary-hover cursor-pointer"
							onclick={() => {
								if (detailName.trim() !== "") {
									let comp = instantiateComponent(detailType);
									if (comp === null || comp === undefined) {
										console.error(`Component ${detailType} could not be instantiated.`);
										return;
									}
									details = [...details, { name: detailName, type: detailType, value: comp }];
									detailName = "";
									detailType = "TEXT";
								}
							}}>
						Add
					</button>
				</div>

			</div>
		</div>
	</div>
</div>