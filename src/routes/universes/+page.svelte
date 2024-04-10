<script>
    import Header from "$lib/components/Header.svelte";

    export let data;
    const universes = data.universes;
</script>


<Header />
<div class="page">
    {#if universes && universes.length > 0}
        <ul>
            {#each universes as universe}
                <li>{universe.name}</li>
            {/each}
        </ul>
    {:else}
        <div class="no-project">
            <p>You don't seem to have an universe yet.<br/>
                Create a new one by clicking the button at the bottom right corner.</p>
        </div>
    {/if}

    <a class="floating-button" href="universes/create">Create Universe</a>
</div>

<style>
    .page {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .no-project {
        position: absolute;
        display: flex;
        top: 50%;
        width: 100%;
        justify-content: center;
        text-align: center;
    }

    .floating-button {
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 10px 20px;
        border-radius: 5px;
        background-color: #3d3d3d;
        color: white;
        border: none;
        cursor: pointer;
    }
</style>
