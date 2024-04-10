<script>
    export let label = "Label";
    export let value = "Value";
    export let onChange = () => {};
</script>

<div>
    <label>{label}</label>
    <input type="text" bind:value={value} on:change={onChange} />
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
</style>
