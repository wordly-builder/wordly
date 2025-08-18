<script lang="ts">
	import { components, instantiateComponent } from '$lib/types/components/components';
	import type { Component } from '$lib/types/component';

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

	function createCharacter() {

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

			<button class="bg-primary w-full text-white p-2 rounded hover:bg-primary-hover cursor-pointer" onclick="{createCharacter}">
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