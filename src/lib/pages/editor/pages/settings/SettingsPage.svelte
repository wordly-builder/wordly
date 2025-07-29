<script lang="ts">

	import type { ProjectMetadata } from '$lib/types/project.metadata';
	import { onMount } from 'svelte';
	import type { PGlite } from '@electric-sql/pglite';
	import { type Container, LoroDoc, type Value } from 'loro-crdt';
	import { features as featuresData } from '$lib/features/features';
	import EnabledFeature from '$lib/pages/editor/pages/settings/components/EnabledFeature.svelte';
	import DisabledFeature from '$lib/pages/editor/pages/settings/components/DisabledFeature.svelte';

	interface Props {
		back: () => void;
		projectMetadata: ProjectMetadata | null;
		opfsRoot: FileSystemDirectoryHandle | null;
		db: PGlite | null;
	}

	let { back, projectMetadata, opfsRoot, db }: Props = $props();

	let name = $state(projectMetadata?.name || '');
	let picture = $state<File | Blob | null>(null);
	let project = $state<LoroDoc | null>(null);
	let features: {id: string, enabled: Container | Value}[] = $state([]);

	$effect(() => {
		if (project) {
			features = Array.from(project.getMap("features").entries()).map(([id, enabled]) => ({ id, enabled }));
		}
	});

	// Initialize the picture preview with the existing project picture if available
	onMount(async () => {
		if (projectMetadata?.id && opfsRoot) {
			const preview = document.getElementById('project-picture-preview') as HTMLImageElement;
			const projectDir = await opfsRoot.getDirectoryHandle(projectMetadata.id, { create: false });
			const pictureHandle = await projectDir.getFileHandle("picture.png", { create: false });
			preview.src = URL.createObjectURL(await pictureHandle.getFile());

			// load loro project
			const projectFileHandle = await projectDir.getFileHandle("file.wordly", { create: false });
			const projectFile = await projectFileHandle.getFile();
			const loadedProject = new LoroDoc();
			loadedProject.import(await projectFile.bytes());
			project = loadedProject;
		}
	});


	function handleChangePicture(event: Event) {
		const input = event.target as HTMLInputElement;
		const preview = document.getElementById('project-picture-preview') as HTMLImageElement;
		if (input.files && input.files[0]) {
			preview.src = URL.createObjectURL(input.files[0]);
			picture = input.files[0];
		}
	}

	async function saveProject() {
		if (!name.trim()) {
			alert("Project name cannot be empty.");
			return;
		}

		if (!opfsRoot || !projectMetadata || !db) {
			alert("Error saving project :<");
			return;
		}

		let projectDir = await opfsRoot.getDirectoryHandle(projectMetadata.id, { create: false });

		if (picture) {
			let pictureHandle = await projectDir.getFileHandle("picture.png", { create: true });
			let writable = await pictureHandle.createWritable();
			await writable.write(picture);
			await writable.close();
		}

		await db.query(`
			UPDATE projects
			SET name = '${name}'
			WHERE id = '${projectMetadata.id}';
		`);

		alert("Project saved successfully!");
	}

	function deleteProject() {
		if (!opfsRoot || !projectMetadata || !db) {
			alert("Error deleting project :<");
			return;
		}

		opfsRoot.getDirectoryHandle(projectMetadata.id, { create: false })
			.then(async (projectDir) => {
				await projectDir.removeEntry("picture.png", { recursive: true });
				await projectDir.removeEntry("file.wordly", { recursive: true });
				await opfsRoot.removeEntry(projectMetadata.id, { recursive: true });

				await db.query(`
					DELETE FROM projects
					WHERE id = '${projectMetadata.id}';
				`);

				alert("Project deleted successfully!");
				window.location.href = "/";
			})
			.catch((error) => {
				console.error("Error deleting project:", error);
				alert("Failed to delete project.");
			});
	}

	function ensureDeleteProject() {
		if (confirm("Are you sure you want to delete this project? This action cannot be undone.")) {
			deleteProject();
		}
	}

	function updateFeatures() {
		features = Array.from(project?.getMap("features").entries() || []).map(([id, enabled]) => ({ id, enabled }));
	}

</script>

<div class="flex flex-col">
	<div class="flex flex-row items-start justify-between w-full">
		<button class="bg-secondary text-white p-2 rounded hover:bg-secondary-hover cursor-pointer mb-4" onclick={() => back()}>
			&lsaquo; Back
		</button>
		<h1>Settings</h1>
		<div></div>
	</div>
	<div class="flex flex-row items-start justify-between w-full">
		<div class="flex flex-col items-start justify-start w-1/3 m-2 bg-elevation-1 dark:bg-dark-elevation-1 p-2 rounded-xl">
			<label for="project-name" class="mb-2">Name</label>
			<input id="project-name" type="text" class="border border-gray-300 p-2 rounded w-full mb-4" placeholder="Enter project name"
						 bind:value={name} />

			<label for="project-description" class="mb-2">Picture</label>
			<input id="project-picture" type="file" accept="image/*" class="bg-secondary hover:bg-secondary-hover cursor-pointer p-2 rounded w-full mb-4"
						 onchange="{handleChangePicture}" />
			<img src="images/project_placeholder.png" alt="Project picture" class="w-full aspect-square object-cover rounded" id="project-picture-preview" />

			<button class="bg-primary w-full text-white p-2 rounded hover:bg-primary-hover cursor-pointer" onclick="{saveProject}">
				Save
			</button>
		</div>

		<div class="w-2/3 flex flex-col">

			<div class="bg-elevation-1 dark:bg-dark-elevation-1 p-2 rounded-xl m-2">
				<button class="bg-red text-white p-2 rounded hover:bg-red-hover cursor-pointer w-full mb-2"
						onclick={ensureDeleteProject}>
					Delete Project
				</button>
			</div>

			<div class="bg-elevation-1 dark:bg-dark-elevation-1 p-2 rounded-xl m-2">
				<p>Enabled features</p>
				{#if features.find(f => f.enabled) === undefined}
					<p class="text-gray-500">No features enabled</p>
				{/if}
				{#each featuresData as feature (feature.id)}
					{#if features.find(f => f.id === feature.id)?.enabled}
						<EnabledFeature {feature} bind:project={project} {opfsRoot} {projectMetadata} {updateFeatures}/>
					{/if}
				{/each}
			</div>

			<div class="bg-elevation-1 dark:bg-dark-elevation-1 p-2 rounded-xl m-2">
				<p>Disabled features</p>
				{#if features.find(f => !f.enabled) === undefined}
					<p class="text-gray-500">All features enabled</p>
				{/if}
				{#each featuresData as feature (feature.id)}
					{#if !features.find(f => f.id === feature.id)?.enabled}
						<DisabledFeature {feature} bind:project={project} {opfsRoot} {projectMetadata} {updateFeatures}/>
					{/if}
				{/each}
			</div>

		</div>
	</div>
</div>