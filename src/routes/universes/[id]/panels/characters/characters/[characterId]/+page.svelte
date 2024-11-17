<script>
    import Select from "$lib/components/generics/forms/Select.svelte";
    import {onMount} from "svelte";

    const widthCells = 16;

    export let data;
    let {character, template} = data;

    let isSaving = false;

    let fields = template.fields

    function placeField(fieldID, field) {
        let cell = document.querySelector(`#field-${fieldID}`);
        console.log(cell);
        if (cell) {
            console.log("Placing field", field);
            cell.innerHTML = field.name;
            cell.style.position = "absolute";
            cell.style.top = `${field.column * 2}rem`;
            cell.style.left = `${field.row * 2}rem`;
            cell.style.width = `${field.rowSize * 2}rem`;
            cell.style.height = `${field.columnSize * 2}rem`;
        }
    }

    onMount(() => {
        for (let i = 0; i < fields.length; i++) {
            placeField(i, fields[i]);
        }
    });

</script>

<div class="template-editor">
    <div class="template-editor-header">
        <Select
                label=""
        />
        <p>{isSaving ? "Saving..." : "Saved"}</p>
    </div>
    <div class="template-editor-body">
        <div class="template-editor-body-row relative">
            {#each fields as field, i}
                {#if field.type === "text"}
                    <input type="text" placeholder={field.name} id={"field-" + i} />
                {/if}
                {#if field.type === "image"}
                    <input type="file" id={"field-" + i} />
                {/if}
            {/each}
        </div>
    </div>
</div>

<style>
    .template-editor {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .template-editor-header {
        width: 100%;
        background: #464646;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 1rem;
        color: white;
    }

    .template-editor-body {
        width: 45%;
        background: #464646;
        margin: 1rem;
        padding: 1rem;
    }

    .template-editor-body-row {
        display: flex;
        justify-content: space-between;
    }

    .template-editor-body-cell {
        width: 2rem;
        height: 2rem;
        background: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .template-editor-body-cell:hover {
        background: #ccc;
    }

    .template-editor-body-cell.active {
        background: #f00;
    }

    .template-editor-body-cell.active:hover {
        background: #f00;
    }

    .template-editor-body-cell.active:hover {
        background: #f00;
    }

</style>