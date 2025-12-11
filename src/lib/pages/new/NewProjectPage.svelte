<script lang="ts">
    import Feature from "$lib/pages/new/components/Feature.svelte";
    import { SvelteMap } from 'svelte/reactivity';
    import { PGlite } from '@electric-sql/pglite';
    import { LoroDoc } from 'loro-crdt';
    import { features } from '$lib/types/features/features';
		import { dbState } from '$lib/states/db.state.svelte';
		import { opfsState } from '$lib/states/opfs.state.svelte';
		import { projectState } from '$lib/states/project.state.svelte';

    interface Props {
        navigateTo: (page: string) => void;
    }

    let props = $props();
    let { navigateTo } : Props = props;
    let enabledFeatures = new SvelteMap<string, boolean>();
		let db: PGlite | null = dbState.db;
		let opfsRoot: FileSystemDirectoryHandle | null = opfsState.root;

    let name = $state("");
    let picture = $state<File | Blob | null>(null);

    // Initialize enabled features with all features set to false
    features.forEach(feature => {
        enabledFeatures.set(feature.id, false);
    });

    function handleChangePicture(event: Event) {
        const input = event.target as HTMLInputElement;
        const preview = document.getElementById('project-picture-preview') as HTMLImageElement;
        if (input.files && input.files[0]) {
            preview.src = URL.createObjectURL(input.files[0]);
            picture = input.files[0];
        }
    }

    async function createProject() {
        while (indexedDB === null || opfsRoot === null) {
            await new Promise(resolve => setTimeout(resolve, 100));
        }

				if (!db) {
					alert("Database not initialized.");
					return;
				}

        if (!name.trim()) {
            alert("Project name cannot be empty.");
            return;
        }

        let projectUUID = crypto.randomUUID();

        let projectDir = await opfsRoot.getDirectoryHandle(projectUUID, { create: true });
        let pictureHandle = await projectDir.getFileHandle("picture.png", { create: true });
        let writable = await pictureHandle.createWritable();
        if (!picture) {
            let defaultImage = await fetch("images/project_placeholder.png");
            picture = await defaultImage.blob();
        }
        await writable.write(picture);
        await writable.close();


        let file = new LoroDoc();
        let featuresMap = file.getMap("features");
        for (const [featureId, isEnabled] of enabledFeatures.entries()) {
            featuresMap.set(featureId, isEnabled);
        }

        let fileHandles = await projectDir.getFileHandle("file.wordly", { create: true });
        let fileWritable = await fileHandles.createWritable();
        await fileWritable.write(file.export({mode: "snapshot"}));
        await fileWritable.close();

        // Save project to IndexedDB
        await db.exec(`INSERT INTO projects (id, name)
        VALUES ('${projectUUID}', '${name.trim()}');`);

				// Navigate to the newly created project
				projectState.id = projectUUID;
        document.location.href = `/?project=${projectUUID}`;
    }


</script>

<div class="new-project-page flex flex-col h-full w-full items-center justify-start p-4">
    <div class="flex flex-row items-start justify-between w-full">
        <button class="bg-secondary text-white p-2 rounded hover:bg-secondary-hover cursor-pointer mb-4" onclick={() => navigateTo("PROJECTS")}>
            &lsaquo; Back
        </button>
        <h1>New project</h1>
        <div></div>
    </div>

    <div class="flex flex-row items-start justify-between w-full">
        <div class="flex flex-col items-start justify-start w-1/3 mr-2 bg-elevation-1 dark:bg-dark-elevation-1 p-2 rounded-xl">
            <label for="project-name" class="mb-2">Name</label>
            <input id="project-name" type="text" class="border border-gray-300 p-2 rounded w-full mb-4" placeholder="Enter project name"
                    bind:value={name} />

            <label for="project-description" class="mb-2">Picture</label>
            <input id="project-picture" type="file" accept="image/*" class="bg-secondary hover:bg-secondary-hover cursor-pointer p-2 rounded w-full mb-4"
                   onchange="{handleChangePicture}" />
            <img src="images/project_placeholder.png" alt="Project picture" class="w-full aspect-square object-cover rounded" id="project-picture-preview" />
        </div>

        <div class="w-2/3 bg-elevation-1 dark:bg-dark-elevation-1 p-2 rounded-xl ml-2">
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
    <div class="flex flex-row items-center justify-start w-full m-2 mt-4">
        <button class="bg-primary text-white p-2 rounded hover:bg-primary-hover cursor-pointer" onclick={createProject}>
            Create Project
        </button>
    </div>
</div>
