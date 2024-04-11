<script lang="ts">
    import Header from "$lib/components/Header.svelte";
    import Select from "$lib/components/generics/forms/Select.svelte";

    export let data;
    const universe = data.universe;
    const universes = data.universes;

    let selectedUniverse = universe.id;

    const universesList = universes.map((u: any) => {
        return {
            key: u.id,
            value: u.name
        };
    });

    function onChange(event: any) {
        selectedUniverse = event;

        // change page to selected universe
        window.location.href = `/universes/${selectedUniverse}`;
    }
</script>

<Header>
    <Select label="" values={universesList} bind:selected={selectedUniverse} onChange={onChange}/>
    <div class="spacer"></div>
</Header>

<slot/>

<style>
    .spacer {
        flex-grow: 0.8;
    }
</style>
