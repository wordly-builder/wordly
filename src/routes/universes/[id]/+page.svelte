<script lang="ts">
    import Header from "$lib/components/Header.svelte";
    import FloatingButton from "$lib/components/generics/FloatingButton.svelte";

    export let data;
    let {universe} = data;

    function hasPanel() {
        if (universe.charactersPanel)
            return true;
        if (universe.mapsPanel)
            return true;
        return false;
    }

</script>

<div>
    {#if universe}
        <h1>{universe.name}</h1>
        {#if hasPanel()}
            <div class="panel">
                {#if universe.charactersPanel}
                    <a href="/universe/{universe.id}/characters">Characters</a>
                {/if}
                {#if universe.mapsPanel}
                    <a href="/universe/{universe.id}/maps">Maps</a>
                {/if}
            </div>
        {:else}
            <div class="center">
                <p>Please integrate a panel to start creating your universe.</p>
            </div>
        {/if}
        <FloatingButton onClick={() => window.location.href = `/universes/${universe.id}/add`}>Add Panel</FloatingButton>
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
