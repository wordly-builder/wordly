<script lang="ts">

    import type {Panel} from "$lib/data/panels/panel";

    export let panel: Panel;
    export let onClick: () => void = () => {};
</script>

<button class="panel" on:click={onClick}>
    <svelte:component this={panel.icon} style="font-size:4em"/>
    <h2>{panel.name}</h2>
</button>

<style>
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
</style>
