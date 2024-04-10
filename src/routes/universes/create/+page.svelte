<script lang="ts">
import Header from "$lib/components/Header.svelte";
import TextField from "$lib/components/generics/forms/TextField.svelte";
import TextButton from "$lib/components/generics/forms/TextButton.svelte";
import {showSnackbar} from "$lib/components/generics/snackbar";


let name = "";
let errorName = false;

export let data;
const {session} = data;

function onNameChange(event: any) {
    name = event.target.value;
    errorName = false;
}

async function createUniverse() {
    if (name === "") {
        errorName = true;
        showSnackbar("Please fill in the name field");
        return;
    }

    const response = await fetch('/api/universes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name, session})
    });
    if (response.ok) {
        // redirect to the new universe
        const {universe} = await response.json();
        window.location.href = `/universes/${universe.id}`;
    } else {
        showSnackbar("An error occurred while creating the universe");
    }
}

</script>

<Header />
<div>
    <h1>
        New Universe
    </h1>
    <div class="page">
        <form>
            <TextField label="Name*" bind:value={name} onChange={onNameChange} error={errorName}/>
            <div class="width-1">
                <TextButton label="Create" onClick={createUniverse}/>
            </div>
        </form>
    </div>
</div>

<style>
    h1 {
        font-size: 2em;
    }

    form {
        display: flex;
        flex-direction: column;
        gap: 1em;
        width: 30%;
    }

    .width-1 {
        width: 30%;
    }

    .page {
        display: flex;
        justify-content: center;
    }
</style>


