<script lang="ts">
	import SettingsPage from '$lib/pages/editor/pages/settings/SettingsPage.svelte';
	import type { ProjectMetadata } from '$lib/types/project.metadata';
	import { onMount } from 'svelte';
	import NoPanelPage from '$lib/pages/editor/pages/no_panel/NoPanelPage.svelte';
	import type { PGlite } from '@electric-sql/pglite';
	import { LoroDoc } from 'loro-crdt';
	import { features } from '$lib/types/features/features';
	import PanelPage from '$lib/pages/editor/pages/panel/PanelPage.svelte';
	import { panels } from '$lib/types/panels/panels';
	import Empty from '$lib/pages/editor/pages/panel/Empty.svelte';
	import { dbState } from '$lib/states/db.state.svelte';
	import { opfsState } from '$lib/states/opfs.state.svelte';

	interface Props {
		projectId: string | null;
	}
	let {projectId}: Props = $props();
	let projectMetadata: ProjectMetadata | null = $state(null);
	let project = $state<LoroDoc | null>(null);
	let page: string = $state("EMPTY");
	let previousPage: string | null = $state(null);

	let db: PGlite | null = dbState.db;
	let opfsRoot: FileSystemDirectoryHandle | null = opfsState.root;

	onMount(async () => {
		await loadProject();

		if (!opfsRoot) {
			alert("OPFS not initialized.");
			return;
		}

		if (projectMetadata) {
			const projectDir = await opfsRoot.getDirectoryHandle(projectId!, { create: false });
			const projectFileHandle = await projectDir.getFileHandle("file.wordly", { create: false });
			const projectFile = await projectFileHandle.getFile();

			// Import the project file into a LoroDoc instance
			project = new LoroDoc();
			project.import(await projectFile.bytes());

			// read the features map from the project
			const featuresMap = project.getMap("features");
			for (const [featureId, isEnabled] of featuresMap.entries()) {
				if (isEnabled) {
					features.find(f => f.id === featureId)?.onEnable(project);
				}
			}

			// Set the initial page to the first editor page
			page = getFirstEditorPage()

		} else {
			window.location.href = "/";
		}
	});

	// Load the project data from the local database
	async function loadProject() {
		if (!db) {
			alert("Database not initialized.");
			return;
		}

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

	function getFirstEditorPage() {
		let page = "NO_PANEL";

		if (panels.length > 0) {
			page = panels[0].id;
		}

		return page;
	}

	function ensureEditorPage(page: string) {
		if (!page || page === "NO_PANEL") {
			return getFirstEditorPage();
		}

		if (!panels.find(p => p.id === page)) {
			console.warn(`Panel with id ${page} does not exist. Defaulting to first panel.`);
			return getFirstEditorPage();
		}

		return page;
	}

	function navigateTo(newPage: string) {
		previousPage = page;
		page = newPage;
	}

	function back() {
		if (previousPage) {
			page = previousPage;
			previousPage = null;
			page = ensureEditorPage(page)
		} else {
			window.location.href = "/";
		}
	}

</script>

{#if page === "SETTINGS"}
	<SettingsPage {back} {projectMetadata} {opfsRoot} {db} />
{:else if page === "NO_PANEL"}
	<NoPanelPage {navigateTo} />
{:else if page === "EMPTY"}
	<Empty />
{:else}
	<PanelPage bind:page={page} {navigateTo}/>
{/if}