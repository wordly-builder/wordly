<script lang="ts">

    import {onMount} from "svelte";
    import ProjectsPage from "$lib/pages/projects/ProjectsPage.svelte";
    import EditorPage from "$lib/pages/editor/EditorPage.svelte";
    import NewProjectPage from "$lib/pages/new/NewProjectPage.svelte";
    import type { Project } from '$lib/types/project';

    let projectId = $state<string | null>(null);
    let projects: Project[] | null = $state(null);
    let page: string = $state("PROJECTS");
    let localDB: IDBOpenDBRequest | null = $state(null);
    let opfsRoot: FileSystemDirectoryHandle | null = $state(null);

    onMount(async () => {

        const urlParams = new URLSearchParams(window.location.search);
        projectId = urlParams.get("project");
        if (projectId) {
            page = "EDITOR";
        } else {
            page = "PROJECTS";
        }

        opfsRoot = await navigator.storage.getDirectory();
        localDB = indexedDB.open("wordly", 3);

        localDB.addEventListener("upgradeneeded", (event) => {
            const db = event.target!.result;

            if (!db.objectStoreNames.contains("projects")) {
                db.createObjectStore("projects", { keyPath: "id" });
            }

        });

        localDB.addEventListener("success", (event) => {
            const db = event.target!.result;

            const transaction = db.transaction("projects", "readonly");
            const store = transaction.objectStore("projects");
            const request = store.getAll();
            request.onsuccess = () => {
                projects = request.result;
                console.log("Projects loaded:", projects);
            };
        });

    });

    function navigateTo(newPage: string) {
        page = newPage;
    }

</script>

<div class="app-container">
    {#if !localDB || !opfsRoot || projects === null}
        <h1>Loading...</h1>
    {:else if page === "PROJECTS"}
        <ProjectsPage {projects} navigateTo={navigateTo} {opfsRoot}/>
    {:else if page === "NEW"}
        <NewProjectPage navigateTo={navigateTo} {localDB} {opfsRoot}/>
    {:else if page === "EDITOR"}
        <EditorPage/>
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