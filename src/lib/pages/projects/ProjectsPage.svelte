<script lang="ts">
    import Project from "$lib/pages/projects/components/Project.svelte";

    let props = $props();
    let { projects, navigateTo } = props;
</script>

<div class="projects-page flex h-full w-full">
    {#if projects.length > 0}
        <h1>Projects</h1>
        <ul>
            <li>
                <button onclick={() => navigateTo("NEW")}>New Project</button>
            </li>
            {#each projects as project}
                <li><Project {project} /></li>
            {/each}
        </ul>
    {:else}
        <div class="flex flex-col items-center justify-center h-full w-full">
            <p class="pb-2">No project found</p>
            <button onclick={() => navigateTo("NEW")} class="bg-primary text-white p-2 rounded hover:bg-primary-hover cursor-pointer">
                Create New Project
            </button>
        </div>
    {/if}
</div>