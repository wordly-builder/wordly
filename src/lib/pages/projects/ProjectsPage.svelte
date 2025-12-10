<script lang="ts">
    import Project from "$lib/pages/projects/components/Project.svelte";
    import type { ProjectMetadata } from '$lib/types/project.metadata';

    interface Props {
        projects: ProjectMetadata[];
        navigateTo: (page: string) => void;
    }

    let props: Props = $props();
    let { projects, navigateTo } = props;


</script>

<div class="flex flex-col h-full w-full p-4">
    {#if projects.length > 0}
        <h1 class="mb-4">Projects</h1>
        <div class=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            <div class="flex">
                <button onclick={() => navigateTo("NEW")} class="w-full bg-elevation-1 dark:bg-dark-elevation-1 rounded-2xl cursor-pointer hover:bg-elevation-2 dark:hover:bg-dark-elevation-2 transition-colors">
                    <div class="aspect-square w-full flex items-center justify-center">
                        <p class="text-center text-6xl">+</p>
                    </div>
                    <p class="text-center text-lg font-semibold mt-4 pb-2">Create New Project</p>
                </button>
            </div>
            {#each projects as project}
                <div class="flex">
                    <Project {project}/>
                </div>
            {/each}
        </div>
    {:else}
        <div class="flex flex-col items-center justify-center h-full w-full">
            <p class="pb-2">No project found</p>
            <button onclick={() => navigateTo("NEW")} class="bg-primary text-white p-2 rounded hover:bg-primary-hover cursor-pointer">
                Create New Project
            </button>
        </div>
    {/if}
</div>