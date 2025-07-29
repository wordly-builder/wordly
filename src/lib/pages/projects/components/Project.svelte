<script lang="ts">

    import type { Project } from '$lib/types/project.metadata';

    interface Props {
        project: Project;
        opfsRoot: FileSystemDirectoryHandle | null;
    }

    let props: Props = $props();
    let { project, opfsRoot } = props;

    async function getProjectImage(): string {
        while (!opfsRoot) {
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        let dir = await opfsRoot.getDirectoryHandle(project.id, { create: false });
        try {
            let fileHandle = await dir.getFileHandle('picture.png', { create: false });
            let file = await fileHandle.getFile();
            return URL.createObjectURL(file);
        } catch (_) {
            return 'images/project_placeholder.png'; // Fallback image
        }
    }

    let projectImage = getProjectImage();
</script>

<button class="project flex flex-col h-full w-full items-center justify-center rounded-2xl bg-elevation-1 dark:bg-dark-elevation-1 hover:bg-elevation-2 dark:hover:bg-dark-elevation-2 transition-colors cursor-pointer"
        onclick={() => document.location.href = `/?project=${project.id}`}>
    {#await projectImage}
        <div class="flex items-center justify-center h-full w-full">
            <p>Loading...</p>
        </div>
    {:then imageUrl}
        <img src={imageUrl} alt="Project Image" class="w-full aspect-square object-cover rounded-t-2xl" />
    {/await}
    <h2 class="text-center text-lg font-semibold mt-4 pb-2">{project.name}</h2>
</button>