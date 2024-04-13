<script lang="ts">
    import FloatingButton from "$lib/components/generics/FloatingButton.svelte";

    export let data;
    const {characters} = data;
</script>

<div>
    <h1>Characters</h1>
    <ul>
        {#each characters as character}
            <li>
                <a href="/characters/{character.id}">
                    {character.name}
                </a>
            </li>
        {/each}
        <FloatingButton onClick={() => window.location.href = "characters/add"}>
            New Character
        </FloatingButton>
    </ul>
</div>
