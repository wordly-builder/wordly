<script lang="ts">
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
        <p>Please integrate a panel to start creating your universe.</p>
    {/if}
</div>
