<script lang="ts">
    import { features } from "$lib/features/features";
    import Feature from "$lib/pages/new/components/Feature.svelte";
    import { SvelteMap } from 'svelte/reactivity';

    let props = $props();
    let { navigateTo } = props;
    let enabledFeatures = $state(new SvelteMap<string, boolean>());

    // Initialize enabled features with all features set to false
    features.forEach(feature => {
        enabledFeatures.set(feature.id, false);
    });

    function handleChangePicture(event: Event) {
        const input = event.target as HTMLInputElement;
        const preview = document.getElementById('project-picture-preview') as HTMLImageElement;
        if (input.files && input.files[0]) {
            preview.src = URL.createObjectURL(input.files[0]);
        }
    }
</script>

<div class="new-project-page flex flex-col h-full w-full items-center justify-start">
    <div class="flex flex-row items-start justify-between w-full">
        <button class="bg-secondary text-white p-2 rounded hover:bg-secondary-hover cursor-pointer mb-4" onclick={() => navigateTo("PROJECTS")}>
            &lsaquo; Back
        </button>
        <h1>New project</h1>
        <div></div>
    </div>

    <div class="flex flex-row items-start justify-between w-full">
        <div class="flex flex-col items-start justify-start w-1/3 m-2 bg-elevation-1 dark:bg-dark-elevation-1 p-2 rounded-xl">
            <label for="project-name" class="mb-2">Name</label>
            <input id="project-name" type="text" class="border border-gray-300 p-2 rounded w-full mb-4" placeholder="Enter project name" />

            <label for="project-description" class="mb-2">Picture</label>
            <input id="project-picture" type="file" accept="image/*" class="bg-secondary hover:bg-secondary-hover cursor-pointer p-2 rounded w-full mb-4"
                   onchange="{handleChangePicture}" />
            <img src="images/project_placeholder.png" alt="Project picture" class="w-full aspect-square object-cover rounded" id="project-picture-preview" />
        </div>

        <div class="w-2/3 bg-elevation-1 dark:bg-dark-elevation-1 p-2 rounded-xl m-2">
            <p class="mb-2">Features</p>
            {#each features as feature}
                <Feature {feature}  bind:checked={
                () => enabledFeatures.get(feature.id) || false,
                (value) => enabledFeatures.set(feature.id, value)
                }
                onChange={(value) => {if (value) {
                    for (const requiredFeature of feature.requiredFeatures) {
                        if (!enabledFeatures.get(requiredFeature)) {
                            enabledFeatures.set(requiredFeature, true);
                        }
                    }
                } else {
                    for (const key of enabledFeatures.keys()) {
                        if (features.find(f => f.id === key)?.requiredFeatures.includes(feature.id)) {
                            enabledFeatures.set(key, false);
                        }
                    }
                }

                }}
                />
            {/each}

        </div>
    </div>
    <div class="flex flex-row items-center justify-start w-full m-2">
        <button class="bg-primary text-white p-2 rounded hover:bg-primary-hover cursor-pointer">
            Create Project
        </button>
    </div>
</div>
