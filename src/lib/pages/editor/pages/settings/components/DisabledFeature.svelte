<script lang="ts">
    import type {Feature} from "$lib/features/feature";
    import type { LoroDoc } from 'loro-crdt';
    import type { ProjectMetadata } from '$lib/types/project.metadata';
    import { features } from '$lib/types/features/features';

    interface Props {
      feature: Feature,
      project: LoroDoc | null,
      opfsRoot: FileSystemDirectoryHandle | null,
      projectMetadata: ProjectMetadata | null,
      updateFeatures: () => void;
    }

    let { feature, project = $bindable(), opfsRoot, projectMetadata, updateFeatures }: Props = $props();
    let isDarkMode = $state(window.matchMedia('(prefers-color-scheme: dark)').matches);
    let icon = $derived(isDarkMode ? feature.iconWhite : feature.iconBlack);

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
        isDarkMode = event.matches;
    });

    async function ensureAdd() {
      if (!project || !opfsRoot || !projectMetadata) {
        alert("Error enabling feature :<");
        return;
      }

      if (confirm(`Are you sure you want to add the feature "${feature.name}"?`)) {
        let featuresToEnable = [];
        for (const rf of feature.requiredFeatures) {
          const feat = features.find(f => f.id === rf);
          const isEnabled = project?.getMap("features").get(feat!.id);
          if (!feat || isEnabled) continue;
          featuresToEnable.push(feat);
        }
        if (featuresToEnable.length > 0) {
          if (confirm(`This feature requires the following features to be enabled: ${featuresToEnable.map(f => "'" + f.name + "'").join(', ')}. Do you want to enable them?`)) {
            for (const feat of featuresToEnable) {
              project!.getMap("features").set(feat.id, true);
              feat.onEnable(project!);
            }
            project!.getMap("features").set(feature.id, true);
            feature.onEnable(project!);
          }
        } else {
          project!.getMap("features").set(feature.id, true);
          feature.onEnable(project!);
        }

        const projectDir = await opfsRoot.getDirectoryHandle(projectMetadata.id, { create: false });
        const projectFileHandle = await projectDir.getFileHandle("file.wordly", { create: false });
        const writable = await projectFileHandle.createWritable();
        await writable.write(project!.export({mode: "snapshot"}));
        await writable.close();

        updateFeatures();
        alert(`Feature "${feature.name}" has been enabled successfully!`);


      }
    }
</script>

<div class="flex flex-row justify-between items-center mt-1 mb-1">
        <div class="flex items-center">
            <img src={icon}
                 alt={feature.name}
                 id="feature-icon-{feature.id}"
                 class="w-6 h-6 mr-2">
            <span class="text-lg font-semibold">{feature.name}</span>
        </div>
        <span class="text-sm text-gray-500">{feature.description}</span>
        <button
            class="bg-primary text-white p-2 rounded hover:bg-primary-hover cursor-pointer ml-4"
            onclick={ensureAdd}>
            Enable
        </button>
</div>