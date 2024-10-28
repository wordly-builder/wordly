<script lang="ts">
    import type {CharactersTemplatesFieldsSelect} from "$lib/database/schemas/characters.templates.fields";
    import TextField from "$lib/components/generics/forms/TextField.svelte";
    import { browser} from "$app/environment";
    import {onMount} from "svelte";

    export let data;
    let {template, templateFields} = data as {template: any, templateFields: CharactersTemplatesFieldsSelect[]}
    let isSaving: boolean = false
    let Draggable = null

    onMount(async () => {
        Draggable = await import("@shopify/draggable")

        const draggable = new Draggable.Sortable(document.querySelectorAll('.template-body'), {
            draggable: 'p',
        })


    })


</script>

<div class="template-editor-header">
    <TextField label="Name" style="margin-left: 10px" labelStyle="display:none;" value={template.name} onChange={(e) => {
        template = {...template, name: e.target.value}
        setLastEdited()
    }} />
    <p>{isSaving}</p>
</div>

<div class="body">
    <div class="template-body" id="template-body">
        <p class="draggable">test</p>

    </div>

</div>

<style>
    h1 {
        font-size: 1.5em;
        margin: 10px;
        color: white;
    }

    .template-editor-header {
        width: 100%;
        background: #464646;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    p {
        margin: 10px;
        color: white;
    }

    .template-body {
        width: 70%;
        background: #b4b4b4;
        display: grid;
        margin: 20px;
        border-radius: 20px;
        overflow: hidden;
        height: fit-content;
    }

    .body {
        display: flex;
        justify-content: space-between;
        flex-direction: row;
        flex-grow: 1;
    }

    .row-editor input, .column-editor input {
        border-radius: 5px;
        width: 3em
    }


</style>
