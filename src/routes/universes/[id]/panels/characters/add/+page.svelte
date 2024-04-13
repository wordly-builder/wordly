<script>
    import TextField from "$lib/components/generics/forms/TextField.svelte";
    import TextButton from "$lib/components/generics/forms/TextButton.svelte";

    let name = "";
</script>

<div class="page">
    <h1>New character</h1>
    <form class="form">
        <TextField label="Name" bind:value={name} />
        <TextButton label="Create"/>
    </form>

</div>

<style>
    .page {
        padding: 1rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        align-items: center;
    }

    .form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        width: 30%
    }
</style>
