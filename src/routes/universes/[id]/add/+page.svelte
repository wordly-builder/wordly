<script lang="ts">
    import {getInactivePanels} from '$lib/data/panels/panels';
    import type {Panel} from "$lib/data/panels/panel";
    export let data;
    let {universe, session} = data;
    let panels = getInactivePanels(universe);

    function addPanel(panel: Panel) {

        panel.create(universe.id, session).then(() => {
            window.location.href = `/universes/${universe.id}/panels/${panel.url}`;
        }).catch((error) => {
            console.error(error);
        });
    }


</script>

<div>
    {#if universe}
        <h1>Add panel</h1>
        <div class="flex">
            {#each panels as panel}
                <button class="panel" on:click={() => addPanel(panel)}>
                    <svelte:component this={panel.icon} style="font-size:4em"/>
                    <h2>{panel.name}</h2>
                </button>
            {/each}
        </div>
    {:else}
        <div class="center">
            <h1>404</h1>
            <p>Universe not found</p>
        </div>
    {/if}
</div>

<style>
    .flex {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }

    .panel {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 1rem;
        padding: 1rem;
        width: 8rem;
        height: 8rem;
        border: none;
        border-radius: 10px;
        background-color: #c4c4c4;
        cursor: pointer;
    }

    .panel:hover {
        background-color: #d4d4d4;
    }

    .center {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
    }
</style>
