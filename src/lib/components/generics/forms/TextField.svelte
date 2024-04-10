<script lang="ts">
    export let label = "Label";
    export let value = "Value";
    export let onChange: (e: any) => void = (e: any) => {};
    export  let error = false;
</script>

<div>
    <label class={error ? "error" : ""}>{label}</label>
    <input type="text" bind:value={value} on:change={onChange} class={error ? "error" : ""}  />
</div>

<style>
    div {
        display: flex;
        flex-direction: column;
        margin-bottom: 1rem;
    }

    label {
        margin-bottom: 0.5rem;
    }

    input {
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 0.25rem;
    }

    .error {
        border-color: red;
        color: red;
    }
</style>
