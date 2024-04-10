<script>
import Header from "$lib/components/Header.svelte";
import TextField from "$lib/components/forms/TextField.svelte";
import TextButton from "$lib/components/forms/TextButton.svelte";

let name = "";
export let data;
const {session} = data;

async function createUniverse() {
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
        // TODO handle error
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
            <TextField label="Name" bind:value={name} onChange={createUniverse} />
            <div class="width-1">
                <TextButton label="Create"/>
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
        height: 100vh;
    }
</style>


