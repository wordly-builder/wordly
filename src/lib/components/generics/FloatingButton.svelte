<script lang="ts">
    export let onClick = () => {};
</script>

<button class="floating-button" on:click={onClick}><slot /></button>

<style>
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
    }</style>
