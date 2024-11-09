<script lang="ts">
    export let label: string = "Select"
    export let values: {key: string, value: string}[] = [
        {key: "1", value: "Option 1"},
        {key: "2", value: "Option 2"},
        {key: "3", value: "Option 3"},
    ]
    export let selected: string = "1"
    export let onChange: (value: string) => void
    export let labelStyle: string = ""
    export let style: string = ""
</script>

<div>
<label style={labelStyle} for="select">{label}</label>
    <select id="select" bind:value={selected} on:change={() => onChange(selected)} style={style}>
        {#each values as option}
            <option value={option.key}>{option.value}</option>
        {/each}
    </select>
</div>

<style>
    select {
        width: 100%;
        padding: 0.5rem;
        margin: 0.5rem 0;
        border-radius: 10px;
        border: none;
        background-color: #525252;
        color: white;
        min-width: 8rem;
    }


</style>
