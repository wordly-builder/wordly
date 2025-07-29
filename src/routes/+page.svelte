<script lang="ts">

    import {onMount} from "svelte";
    import { PGlite } from '@electric-sql/pglite'
    import ProjectsPage from "$lib/pages/projects/ProjectsPage.svelte";
    import EditorPage from "$lib/pages/editor/EditorPage.svelte";
    import NewProjectPage from "$lib/pages/new/NewProjectPage.svelte";
    import type { ProjectMetadata } from '$lib/types/project.metadata';

    let projectId = $state<string | null>(null);
    let projects: ProjectMetadata[] | null = $state(null);
    let page: string = $state("PROJECTS");
    let db: PGlite | null = $state(null);
    let opfsRoot: FileSystemDirectoryHandle | null = $state(null);

    onMount(async () => {
        db = new PGlite('idb://wordly');
        opfsRoot = await navigator.storage.getDirectory();

        const urlParams = new URLSearchParams(window.location.search);
        projectId = urlParams.get("project");
        if (projectId) {
            page = "EDITOR";
        } else {
            page = "PROJECTS";
        }

        await db.exec(`
            CREATE TABLE IF NOT EXISTS projects (
                id TEXT PRIMARY KEY,
                name TEXT NOT NULL
            );`);

        let projectsRes = await db.query<ProjectMetadata>('SELECT * FROM projects');
        projects = projectsRes.rows;
    });

    function navigateTo(newPage: string) {
        page = newPage;
    }

</script>

<div class="app-container">
    {#if !db || !opfsRoot || projects === null}
        <h1>Loading...</h1>
    {:else if page === "PROJECTS"}
        <ProjectsPage {projects} navigateTo={navigateTo} {opfsRoot}/>
    {:else if page === "NEW"}
        <NewProjectPage navigateTo={navigateTo} {db} {opfsRoot}/>
    {:else if page === "EDITOR"}
        <EditorPage {projectId} {db} {opfsRoot}/>
    {:else}
        <h1>Page Not Found</h1>
    {/if}
</div>

<style>
    .app-container {
        padding: 1rem;
        margin: 0 auto;
        width: 100vw;
        height: calc(100vh - (var(--spacing) * 14));
    }
</style>