<script lang="ts">
	import UniversePage from '$lib/pages/editor/pages/universe/UniversePage.svelte';
	import WorldPage from '$lib/pages/editor/pages/world/WorldPage.svelte';
	import SettingsPage from '$lib/pages/editor/pages/settings/SettingsPage.svelte';
	import type { ProjectMetadata } from '$lib/types/project.metadata';
	import { onMount } from 'svelte';
	import NoPanelPage from '$lib/pages/editor/pages/no_panel/NoPanelPage.svelte';
	import type { PGlite } from '@electric-sql/pglite';
	import { LoroDoc } from 'loro-crdt';

	interface Props {
		projectId: string | null;
		db: PGlite;
		opfsRoot: FileSystemDirectoryHandle;
	}
	let {projectId, db, opfsRoot}: Props = $props();
	let projectMetadata: ProjectMetadata | null = $state(null);
	let project = $state<LoroDoc | null>(null);

	onMount(async () => {
		await loadProject();

		if (projectMetadata) {
			const projectDir = await opfsRoot.getDirectoryHandle(projectId!, { create: false });
			const projectFileHandle = await projectDir.getFileHandle("file.wordly", { create: false });
			const projectFile = await projectFileHandle.getFile();

			// Import the project file into a LoroDoc instance
			project = new LoroDoc();
			project.import(await projectFile.bytes());
			const featuresMap = project.getMap("features");

			if (featuresMap.get("UNIVERSES")) {
				page = "UNIVERSES";
			} else if (featuresMap.get("WORLDS")) {
				page = "WORLDS";
			} else {
				page = "NO_PANEL";
			}

		} else {
			window.location.href = "/";
		}
	});

	// Load the project data from the local database
	async function loadProject() {
		if (projectId) {
			const projectRes = await db.query<ProjectMetadata>(
				`SELECT * FROM projects WHERE id = '${projectId}';`);
			if (projectRes.rows.length > 0) {
				projectMetadata = projectRes.rows[0];
			} else {
				projectMetadata = null;
			}
		}
	}

	let page: string = $state("PROJECT");
	let previousPage: string | null = $state(null);

	function navigateTo(newPage: string) {
		previousPage = page;
		page = newPage;
	}

	function back() {
		if (previousPage) {
			page = previousPage;
			previousPage = null;
		} else {
			window.location.href = "/";
		}
	}

</script>

{#if page === "UNIVERSE"}
	<UniversePage />
{:else if page === "WORLD"}
	<WorldPage />
{:else if page === "SETTINGS"}
	<SettingsPage {back} {projectMetadata} {opfsRoot} {db} />
{:else if page === "NO_PANEL"}
	<NoPanelPage {navigateTo} />
{/if}