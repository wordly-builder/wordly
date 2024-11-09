<script lang="ts">
    export let label = "Label";
    export let value = "Value";
    export let onChange: (e: any) => void = (e: any) => {};
    export  let error = false;
    export let style = "";
    export let labelStyle = "";
</script>

<div>
    <label class={error ? "error" : ""} style="{labelStyle}" for="input">{label}</label>
    <input id="input" type="text" bind:value={value} on:change={onChange} class={error ? "error" : ""} style={style} />
</div>

<style>
    div {
        display: flex;
        flex-direction: column;
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
