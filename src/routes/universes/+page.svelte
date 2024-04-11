<script>
    import Header from "$lib/components/Header.svelte";

    export let data;
    const universes = data.universes;
</script>


<Header />
<div class="page">
    {#if universes && universes.length > 0}
        <h1>Universes</h1>
        <div class="projects-container">
            <div class="project">Name</div>
            {#each universes as universe, i}
                <a href="universes/{universe.id}"><div class={"project " + (i % 2 === 0 ? "even" : "odd")}>{universe.name}</div></a>
            {/each}
        </div>
    {:else}
        <div class="no-project">
            <p>You don't seem to have an universe yet.<br/>
                Create a new one by clicking the button at the bottom right corner.</p>
        </div>
    {/if}

    <a class="floating-button" href="universes/create">Create Universe</a>
</div>

<style>
    h1 {
        text-align: left;
        padding: 0;
    }

    .page {
        display: flex;
        flex-direction: column;
        margin: 0 30px;
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

    .projects-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        flex-direction: column;
    }

    .project {
        padding: 20px;
        border-radius: 5px;
        color: black;
    }

    a:hover {
        text-decoration: none;
    }

    .even {
        background-color: #afafaf;
    }

    .even:hover {
        background-color: #c0c0c0;
    }

    .odd {
        background-color: #e0e0e0;
    }

    .odd:hover {
        background-color: #f0f0f0;
    }
</style>
