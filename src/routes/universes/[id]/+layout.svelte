<script lang="ts">
    import Header from "$lib/components/Header.svelte";
    import Select from "$lib/components/generics/forms/Select.svelte";
    import {getPanelsByName} from "../../../lib/data/panels/panels";

    export let data;
    const universe = data.universe;
    const universes = data.universes;
    const activatedPanels = data.activatedPanels;
    const panels = getPanelsByName(activatedPanels);

    let selectedUniverse = universe ? universe._id.toString() : -1;

    const universesList = universes.map((u: any) => {
        return {
            key: u._id.toString(),
            value: u.name
        };
    });

    function onChange(event: any) {
        selectedUniverse = event;

        // change page to selected universe
        window.location.href = `/universes/${selectedUniverse}`;
    }
</script>

{#if universe}
    <Header>
        <Select label="" values={universesList} bind:selected={selectedUniverse} onChange={onChange}/>
        <div class="spacer">
            {#each panels as panel}
                <a href="/universes/{universe._id}/panels/{panel.url}" class="panel">
                    <svelte:component this={panel.icon} style="width: 40px; height: 40px; color: white;"/>
                </a>
            {/each}
        </div>
    </Header>

    <slot/>
{:else}
    <Header />
    <div class="page">
        <h1>404</h1>
        <p>Universe not found</p>
    </div>
{/if}

<style>
    .spacer {
        flex-grow: 0.8;
        display: flex;
        justify-content: center;
    }

    .panel {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 50px;
        height: 50px;
        margin: 0 10px;
        background-color: var(--color-primary);
        border-radius: 50%;
        transition: background-color 0.3s;
    }

    .page {
        display: flex;
        position: absolute;
        width: 100%;
        top: 40%;
        flex-direction: column;
        text-align: center;
    }
</style>
