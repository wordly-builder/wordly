<script lang="ts">
    import type {CharactersTemplatesFieldsSelect} from "$lib/database/schemas/characters.templates.fields";
    import {onMount} from "svelte";
    import TextField from "$lib/components/generics/forms/TextField.svelte";
    import Select from "$lib/components/generics/forms/Select.svelte";

    export let data;

    let {template, templateFields} = data as {template: any, templateFields: CharactersTemplatesFieldsSelect[]}

    let activeField: CharactersTemplatesFieldsSelect | null = null
    let dragAndDropField: CharactersTemplatesFieldsSelect | null = null
    let isDragging = null
    let isClick = false

    function click(field: CharactersTemplatesFieldsSelect) {
        if (activeField === field)
            activeField = null
        else
            activeField = field
    }

    function displayTemplate() {
        let nb_rows = 0;
        let nb_columns = 0;

        updateField()
        for (const fieldIndex in templateFields) {
            const field = templateFields[fieldIndex]

            // check max row
            const maxRow = field.row + field.rowSize - 1;
            if (nb_rows < maxRow)
                nb_rows = maxRow

            // check max column
            const maxColumn = field.column + field.columnSize - 1;
            if (nb_columns < maxColumn)
                nb_columns = maxColumn
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
            if (a.row === b.row)
                return a.column - b.column
            return a.row - b.row
        })

        for (const fieldIndex in fields) {
            const field = fields[fieldIndex]

            const fieldElement = document.createElement('div')

            fieldElement.style.gridRow = `${field.row} / span ${field.rowSize}`
            fieldElement.style.gridColumn = `${field.column} / span ${field.columnSize}`
            fieldElement.style.padding = '5px'
            fieldElement.style.display = 'flex'
            fieldElement.style.flexDirection = 'column'

            const container = document.createElement('button')
            container.className = 'field'
            container.id = `field`
            container.style.display = 'flex'
            container.style.justifyContent = 'center'
            container.style.alignItems = 'center'
            container.style.height = `${field.rowSize * 50}px`
            container.style.backgroundColor = '#737373'
            container.style.borderRadius = '20px'
            container.style.border = 'none'
            container.style.cursor = 'pointer'

            // Add drag and drop
            container.addEventListener('mousedown', (e) => {
                // set dragging
                isDragging = {x: e.clientX, y: e.clientY}
                dragAndDropField = field
                isClick = true

                // set timout to check if drag or click
                setTimeout(() => {
                    isClick = false
                }, 200)
            })

            fieldElement.appendChild(container)

            const text = document.createElement('p')
            text.id='field-text'
            text.textContent = field.name
            text.style.margin = '10px'
            text.style.color = 'white'

            container.appendChild(text)

            templateBody.appendChild(fieldElement)
        }

    }

    function updateField() {
        if (activeField !== null) {
            const index = templateFields.findIndex((field) => {
                if (activeField === null)
                    return false
                return field.id === activeField.id
            })
            if (index !== -1) {
                templateFields[index] = activeField
            }
        }
    }

    function computeFieldsSize(grow_row: boolean = false) {
        // control overlaps by moving other fields
        // if overlap by row push down
        templateFields = templateFields.sort((a, b) => {
            if (a.row === b.row)
                return a.column - b.column
            return a.row - b.row

        })

        for (const fieldIndex in templateFields) {
            const field = templateFields[fieldIndex]
            for (const fieldIndex2 in templateFields) {
                if (fieldIndex === fieldIndex2)
                    continue;

                const field2 = templateFields[fieldIndex2]

                // check if row overlaps
                if (field2.row >= field.row && field2.row <= field.row + field.rowSize - 1) {
                    // check if column overlaps
                    if ((field2.column >= field.column && field2.column <= field.column + field.columnSize - 1) ||
                        (field2.column + field2.columnSize - 1 >= field.column && field2.column + field2.columnSize - 1 <= field.column + field.columnSize - 1)) {

                        // push down
                        if (grow_row) {
                            field2.row = field.row + field.rowSize
                        } else {
                            field2.column = field.column + field.columnSize
                        }
                    }
                }

                // apply changes
                templateFields[fieldIndex2] = field2

            }
        }
    }

    function resizeField(row: number, column: number) {
        if (row < 1 || column < 1 || activeField === null)
            return

        const grow_row = activeField.rowSize !== row
        activeField = {...activeField, rowSize: row, columnSize: column}
        updateField();

        computeFieldsSize(grow_row)
        displayTemplate()
    }

    function onDragOver(e: any) {
        e.preventDefault()
        // only start drag if mouse move
        if (isDragging === null || isClick=== true)
            return
        if (isDragging.x - e.clientX < 5 && isDragging.y - e.clientY < 5)
            return

        // delete all occurence of the draaged field
        templateFields = templateFields.filter((f) => f.id !== dragAndDropField?.id)

        // get template body start position
        const templateBody = document.getElementById('template-body')
        if (templateBody === null)
            return
        const startX = templateBody.getBoundingClientRect().left
        const startY = templateBody.getBoundingClientRect().top
        const sizeX = templateBody.getBoundingClientRect().width
        const sizeY = templateBody.getBoundingClientRect().height

        let nb_rows = 0;
        let nb_columns = 0;
        for (const fieldIndex in templateFields) {
            const field = templateFields[fieldIndex]

            // check max row
            const maxRow = field.row + field.rowSize - 1;
            if (nb_rows < maxRow)
                nb_rows = maxRow

            // check max column
            const maxColumn = field.column + field.columnSize - 1;
            if (nb_columns < maxColumn)
                nb_columns = maxColumn
        }

        const cellSizeX = sizeX / nb_columns
        const cellSizeY = sizeY / nb_rows

        const pointerRow = Math.floor((e.clientY - startY) / cellSizeY) + 1
        const pointerColumn = Math.floor((e.clientX - startX) / cellSizeX) + 1

        // add a new field at the cursor position
        if (dragAndDropField === null)
            return
        const newField = {
            templateId: dragAndDropField.templateId,
            id: dragAndDropField.id,
            name: dragAndDropField.name,
            type: dragAndDropField.type,
            row: pointerRow,
            column: pointerColumn,
            rowSize: dragAndDropField.rowSize,
            columnSize: dragAndDropField.columnSize
        }
        if (newField.row < 1)
            newField.row = 1
        if (newField.column < 1)
            newField.column = 1
        templateFields.push(newField)
        computeFieldsSize(true)
        displayTemplate()
    }

    onMount(() => {
        displayTemplate()

        // add onmouve event to drag and drop element
        const dragAndDropElement = document.getElementById('drag-and-drop-element')
        if (dragAndDropElement === null)
            return

        window.addEventListener('mousemove', (e) => {
            dragAndDropElement.style.left = `${e.clientX}px`
            dragAndDropElement.style.top = `${e.clientY}px`
        })

        window.onmouseup = (e) => {
            dragAndDropElement.style.display = 'none'

            // check if drag or click
            if (isClick && dragAndDropField !== null) {
                isClick = false
                click(dragAndDropField);
                return
            }

            if (dragAndDropField === null)
                return

            // check if an occurence of the field already exist
            if (templateFields.find((f) => f.id === dragAndDropField?.id) === undefined) {
                templateFields.push(dragAndDropField)
            }

            dragAndDropField = null
            displayTemplate()

        }

        const templateBody = document.getElementById('template-body')
        if (templateBody === null)
            return

        templateBody.addEventListener('mousemove', onDragOver)
    })
</script>

<div class="template-editor-header">
    <h1>{template.name}</h1>
</div>

<div class="body">
    <div class="template-body" id="template-body">
    </div>
    {#if activeField !== null}
        <div class="field-menu">
            <div class="form">
                    <TextField
                        label="Name"
                        labelStyle="color: white;"
                        value={activeField.name}
                        onChange={(e) => {
                            if (activeField === null)
                                return
                            activeField = {...activeField, name: e.target.value}
                            displayTemplate()
                        }}
                    />
                    <Select
                        label="Type"
                        labelStyle="color: white;"
                        selected={activeField.type}
                        values={[
                            {key: 'text', value: 'Text'},
                            {key: 'image', value: 'Image'},
                        ]}
                        onChange={(e) => {
                            if (activeField === null)
                                return
                            activeField = {...activeField, type: e}
                            displayTemplate()
                        }}
                    />
                    <div class="gris-editor">
                        <div class="row-editor">
                            <label style="color: white">Row size</label>
                            <input type="number" value={activeField.rowSize} on:change={(e) => resizeField(+e.target.value, activeField.columnSize)} />
                        </div>
                        <div class="column-editor">
                            <label style="color: white">Column size</label>
                            <input type="number" value={activeField.columnSize} on:change={(e) => resizeField(activeField.rowSize, +e.target.value)} />
                        </div>
                    </div>
            </div>
        </div>
    {/if}
</div>

<div class="drag-and-drop-element" id="drag-and-drop-element">
    <p>text</p>
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

    .field-menu {
        width: 20%;
        background: #464646;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        border-top: 1px solid #b4b4b4;
        position: sticky;
    }

    .form {
        display: flex;
        flex-direction: column;
        padding: 10px;
    }

    .gris-editor {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .row-editor, .column-editor {
        margin: 10px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    .row-editor input, .column-editor input {
        border-radius: 5px;
        width: 3em
    }

    .drag-and-drop-element {
        display: none;
        position: absolute;
        background: #707070;
        border-radius: 20px;
        padding: 10px;
        color: white;
    }


</style>
