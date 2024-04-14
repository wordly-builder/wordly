<script lang="ts">
    export let data;
    const { template } = data;
</script>

{#if template}
    <slot/>
{:else}
    <div class="page">
        <h1>404</h1>
        <p>Template doesn't exist</p>
    </div>
{/if}

<style>
    .page {
        position: absolute;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
    }
</style>
