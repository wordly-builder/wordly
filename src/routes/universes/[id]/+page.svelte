<script lang="ts">
    import FloatingButton from "$lib/components/generics/FloatingButton.svelte";
    import PanelButton from "$lib/components/PanelButton.svelte";
    import {onMount} from "svelte";
    import {getPanelsByName} from "../../../lib/data/panels/panels";

    onMount(() => {

    })
    export let data;
    let {universe, activatedPanels} = data;
    const panels = getPanelsByName(activatedPanels);

</script>

<div>
    {#if universe}
        <h1>{universe.name}</h1>
        {#if panels.length > 0}
            <div class="panel">
                {#each panels as panel}
                    <PanelButton panel={panel} onClick={() => window.location.href = `/universes/${universe._id}/panels/${panel.url}`} />
                {/each}
            </div>
        {:else}
            <div class="center">
                <p>Please integrate a panel to start creating your universe.</p>
            </div>
        {/if}
        <FloatingButton onClick={() => window.location.href = `/universes/${universe._id}/add`}>Add Panel</FloatingButton>
    {:else}
        <div class="center">
            <h1>404</h1>
            <p>Universe not found</p>
        </div>
    {/if}
</div>

<style>
    .panel {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 1rem;
    }

    .center {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: absolute;
        top: 50%;
        width: 100%;
    }

</style>
