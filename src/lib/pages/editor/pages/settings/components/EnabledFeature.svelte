<script lang="ts">
    import type {Feature} from "$lib/features/feature";
    import { features } from '$lib/features/features';
    import type { LoroDoc } from 'loro-crdt';
    import type { ProjectMetadata } from '$lib/types/project.metadata';

    interface Props {
        feature: Feature,
        project: LoroDoc | null,
        opfsRoot: FileSystemDirectoryHandle | null,
        projectMetadata: ProjectMetadata | null,
        updateFeatures: () => void;
    }

    let { feature, projectMetadata, opfsRoot, project = $bindable(), updateFeatures }: Props = $props();
    let isDarkMode = $state(window.matchMedia('(prefers-color-scheme: dark)').matches);
    let icon = $derived(isDarkMode ? feature.iconWhite : feature.iconBlack);

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
        isDarkMode = event.matches;
    });

    async function ensureDelete() {
        if (!project || !opfsRoot || !projectMetadata) {
            alert("Error disabling feature :<");
            return;
        }

        // Check if the feature is required by other features
        const requiredBy = features.filter(f => f.requiredFeatures.includes(feature.id));
        if (requiredBy.length > 0) {
            alert(`The feature "${feature.name}" is required by the following features: ${requiredBy.map(f => f.name).join(', ')}. Please disable them first.`);
            return;
        }

        if (confirm(`Are you sure you want to delete the feature "${feature.name}"? This will delete all data related to this feature !`)) {
            project.getMap("features").set(feature.id, false);
            feature.onDisable(project);

            // Save the updated project state
            const projectDir = await opfsRoot.getDirectoryHandle(projectMetadata.id, { create: false });
            const projectFileHandle = await projectDir.getFileHandle("file.wordly", { create: false });
            const writable = await projectFileHandle.createWritable();
            await writable.write(project.export({ mode: "snapshot" }));
            await writable.close();

            updateFeatures();
            alert(`Feature "${feature.name}" has been disabled successfully!`);
        }
    }
</script>

<div class="flex flex-row justify-between items-center">
        <div class="flex items-center">
            <img src={icon}
                 alt={feature.name}
                 id="feature-icon-{feature.id}"
                 class="w-6 h-6 mr-2">
            <span class="text-lg font-semibold">{feature.name}</span>
        </div>
        <span class="text-sm text-gray-500">{feature.description}</span>
        <button
            class="bg-red text-white p-2 rounded hover:bg-red-hover cursor-pointer ml-4"
            onclick={ensureDelete}>
            Disable
        </button>
</div>