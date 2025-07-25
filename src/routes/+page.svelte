<script lang="ts">

    import {onMount} from "svelte";
    import ProjectsPage from "$lib/pages/projects/ProjectsPage.svelte";
    import EditorPage from "$lib/pages/editor/EditorPage.svelte";
    import NewProjectPage from "$lib/pages/new/NewProjectPage.svelte";

    let projects: any[] = $state([]);
    let page: string = $state("PROJECTS");

    onMount(() => {
        let localDB = indexedDB.open("wordly", 1);

        localDB.addEventListener("upgradeneeded", (event) => {
            const db = event.target!.result;

            if (!db.objectStoreNames.contains("projects")) {
                db.createObjectStore("projects", {keyPath: "project"});
            }

        });

        localDB.addEventListener("success", (event) => {
            const db = event.target!.result;

            const transaction = db.transaction("projects", "readonly");
            const store = transaction.objectStore("projects");
            const request = store.getAll();
            request.onsuccess = () => {
                projects = request.result;
            };
        });
    });

    function navigateTo(newPage: string) {
        page = newPage;
    }

</script>

<div class="app-container">
    {#if page === "PROJECTS"}
        <ProjectsPage {projects} navigateTo={navigateTo}/>
    {:else if page === "NEW"}
        <NewProjectPage navigateTo={navigateTo}/>
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