<script lang="ts">
    import type {CharactersTemplatesFieldsSelect} from "$lib/database/schemas/characters.templates.fields";
    import {onMount} from "svelte";

    export let data;

    let {template, templateFields} = data as {template: any, templateFields: CharactersTemplatesFieldsSelect[]}

    function displayTemplate() {
        let nb_rows = 0;
        let nb_columns = 0;

        for (const fieldIndex in templateFields) {
            const field = templateFields[fieldIndex]

            // check max row
            const rows = field.rows.split(',');
            for (const rid in  rows) {
                const row = rows[rid]
                if (nb_rows < +row)
                    nb_rows = +row
            }

            // check max column
            const columns = field.columns.split(',');
            for (const cid in columns) {
                const column = columns[cid]
                if (nb_columns < +column)
                    nb_columns = +column
            }
        }

        const templateBody = document.getElementById('template-body')
        if (templateBody === null)
            return

        while (templateBody.firstChild) {
            templateBody.removeChild(templateBody.firstChild);
        }

        // set css grid
        templateBody.style.gridTemplateColumns = `repeat(${nb_columns}, 1fr)`
        const fields = templateFields.sort((a, b) => {
            const a_rows = a.rows.split(',')
            const b_rows = b.rows.split(',')

            if (a_rows[0] === b_rows[0]) {
                const a_columns = a.columns.split(',')
                const b_columns = b.columns.split(',')

                return +a_columns[0] - +b_columns[0]
            }

            return +a_rows[0] - +b_rows[0]
        })

        for (const fieldIndex in fields) {
            const field = fields[fieldIndex]

            const fieldElement = document.createElement('div')
            const rows = field.rows.split(',')
            const columns = field.columns.split(',')
            const rowStart = rows[0]
            const columnStart = columns[0]

            fieldElement.style.gridRow = `${rowStart} / span ${rows.length}`
            fieldElement.style.gridColumn = `${columnStart} / span ${columns.length}`
            fieldElement.style.border = '1px solid black'
            fieldElement.style.padding = '5px'
            fieldElement.style.display = 'flex'
            fieldElement.style.flexDirection = 'column'

            const container = document.createElement('div')
            container.style.display = 'flex'
            container.style.justifyContent = 'space-between'
            container.style.alignItems = 'center'
            container.style.height = `${rows.length * 50}px`
            fieldElement.appendChild(container)

            const input = document.createElement('input')
            input.type = 'text'
            input.placeholder = field.name

            container.appendChild(input)

            templateBody.appendChild(fieldElement)
        }

    }

    onMount(() => {
        displayTemplate()
    })
</script>

<div class="template-editor-header">
    <h1>{template.name}</h1>
</div>

<div class="body">
    <div class="template-body" id="template-body">
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
        align-items: start;
    }

    .template-body {
        width: 70%;
        background: #b4b4b4;
        display: grid;
    }

    .body {
        display: flex;
        justify-content: center;
    }
</style>
