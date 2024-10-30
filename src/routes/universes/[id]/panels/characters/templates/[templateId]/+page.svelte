<script lang="ts" xmlns="http://www.w3.org/1999/html">
    import type {CharactersTemplatesFieldsSelect} from "$lib/database/schemas/characters.templates.fields";
    import TextField from "$lib/components/generics/forms/TextField.svelte";
    import {onMount} from "svelte";

    export let data;
    let {template, templateFields} = data as { template: any, templateFields: CharactersTemplatesFieldsSelect[] }
    let isSaving: boolean = false

    let offset = {
        x: 50,
        y: 50
    }
    let gridSize = 50;
    const width = 16 * gridSize;
    let selectedField = null;
    let pressedField = null;
    let pressedSide = null;
    let timeMouseDown = 0;

    function drawGrid(canvas, ctx) {
        // draw page
        offset.x = canvas.width / 2 - 8 * gridSize;
        let pageColor = '#d2d2d2';
        ctx.fillStyle = pageColor;
        ctx.fillRect(offset.x, offset.y, width, canvas.height);

        // draw grid

        let gridColor = '#494949';
        ctx.strokeStyle = gridColor;
        ctx.lineWidth = 1;

        for (let i = offset.x; i < width + offset.x + 1; i += gridSize) {
            ctx.beginPath();
            ctx.moveTo(i, offset.y);
            ctx.lineTo(i, canvas.height);
            ctx.stroke();
        }

        for (let i = offset.y; i < canvas.height + offset.y; i += gridSize) {
            ctx.beginPath();
            ctx.moveTo(offset.x, i);
            ctx.lineTo(width + offset.x, i);
            ctx.stroke();
        }
    }

    function drawFields(canvas, ctx) {
        templateFields.forEach((field) => {
            let x = field.row * gridSize + offset.x;
            let y = field.column * gridSize + offset.y;
            let width = field.rowSize * gridSize;
            let height = field.columnSize * gridSize;
            let color = '#e5e5e5'
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.roundRect(x, y, width, height, 15);
            ctx.fill();

            // draw text
            ctx.fillStyle = '#000000';
            ctx.font = "12px Arial";
            let xPos = x + (width / 2) - (ctx.measureText(field.name).width / 2);
            if (xPos < x) xPos = x + 10;
            const yPos = y + (height / 2) + 5;
            ctx.fillText(field.name, xPos, yPos, width - 20);
        })

        // if selected, draw outline
        if (selectedField) {
            let x = selectedField.row * gridSize + offset.x;
            let y = selectedField.column * gridSize + offset.y;
            let width = selectedField.rowSize * gridSize;
            let height = selectedField.columnSize * gridSize;
            let color = '#000000'
            ctx.strokeStyle = color;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.roundRect(x, y, width, height, 15);
            ctx.stroke();
        }

    }

    function render(canvas, ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawGrid(canvas, ctx);
        drawFields(canvas, ctx);
    }

    function saveTemplate() {
        isSaving = true
        fetch(`/api/characters/templates/${template.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: template.name,
                fields: templateFields
            })
        }).then((res) => {
            isSaving = false
        })
    }

    onMount(() => {
        let body = document.getElementById('body');
        let canvas = document.getElementById('canvas') as HTMLCanvasElement;
        canvas.width = window.innerWidth;
        canvas.height = body.clientHeight;
        let ctx = canvas.getContext('2d');

        //drawToolbar(canvas, ctx);
        render(canvas, ctx);

        canvas.onmousedown = function (e) {
            let x = e.clientX - canvas.getBoundingClientRect().left;
            let y = e.clientY - canvas.getBoundingClientRect().top;
            templateFields.forEach((field) => {
                let fieldX = field.row * gridSize + offset.x;
                let fieldY = field.column * gridSize + offset.y;
                let fieldWidth = field.rowSize * gridSize;
                let fieldHeight = field.columnSize * gridSize;
                if (x >= fieldX && x <= fieldX + fieldWidth && y >= fieldY && y <= fieldY + fieldHeight) {
                    pressedField = field;

                    let xSide = x - fieldX;
                    let ySide = y - fieldY;
                    if (xSide < 10) {
                        pressedSide = 'left';
                    } else if (xSide > fieldWidth - 10) {
                        pressedSide = 'right';
                    } else if (ySide < 10) {
                        pressedSide = 'top';
                    } else if (ySide > fieldHeight - 10) {
                        pressedSide = 'bottom';
                    } else {
                        pressedSide = null;
                    }
                }
            })

            timeMouseDown = new Date().getTime();
        }

        canvas.onmouseup = function (e) {
            let timeMouseUp = new Date().getTime();

            if (timeMouseUp - timeMouseDown < 200) {
                let x = e.clientX - canvas.getBoundingClientRect().left;
                let y = e.clientY - canvas.getBoundingClientRect().top;
                let isField = false;

                templateFields.forEach((field) => {
                    let fieldX = field.row * gridSize + offset.x;
                    let fieldY = field.column * gridSize + offset.y;
                    let fieldWidth = field.rowSize * gridSize;
                    let fieldHeight = field.columnSize * gridSize;
                    if (x >= fieldX && x <= fieldX + fieldWidth && y >= fieldY && y <= fieldY + fieldHeight) {
                        selectedField = field;
                        render(canvas, ctx);

                        const fieldProperty = document.querySelector('.field-property');
                        fieldProperty.style.visibility = 'visible';
                        isField = true;
                        console.log(selectedField)
                    }
                })

                if (!isField) {
                    if (selectedField) {
                        selectedField = null;
                        const fieldProperty = document.querySelector('.field-property');
                        fieldProperty.style.visibility = 'hidden';
                        render(canvas, ctx);
                    } else {
                        // create new field
                        let row = Math.floor((x - offset.x) / gridSize);
                        let column = Math.floor((y - offset.y) / gridSize);

                        if (row < 0 || column < 0) return;
                        if (row > 16 || column > 16) return;

                        let field = {
                            name: 'Field',
                            type: 'text',
                            row: row,
                            column: column,
                            rowSize: 1,
                            columnSize: 1
                        }

                        templateFields.push(field);
                        selectedField = field;
                        render(canvas, ctx);

                        const fieldProperty = document.querySelector('.field-property');
                        fieldProperty.style.visibility = 'visible';
                    }

                }
            }

            timeMouseDown = 0;
            pressedField = null;
        }

        canvas.onmousemove = function (e) {
            let x = e.clientX - canvas.getBoundingClientRect().left;
            let y = e.clientY - canvas.getBoundingClientRect().top;
            let timeMouseUp = new Date().getTime();

            // change cursor on hover
            let isHover = false;
            let hoverSide = null;
            templateFields.forEach((field) => {
                let fieldX = field.row * gridSize + offset.x;
                let fieldY = field.column * gridSize + offset.y;
                let fieldWidth = field.rowSize * gridSize;
                let fieldHeight = field.columnSize * gridSize;
                if (x >= fieldX && x <= fieldX + fieldWidth && y >= fieldY && y <= fieldY + fieldHeight) {
                    isHover = true;

                    let xSide = x - fieldX;
                    let ySide = y - fieldY;
                    if (xSide < 10) {
                        hoverSide = 'left';
                    } else if (xSide > fieldWidth - 10) {
                        hoverSide = 'right';
                    } else if (ySide < 10) {
                        hoverSide = 'top';
                    } else if (ySide > fieldHeight - 10) {
                        hoverSide = 'bottom';
                    } else {
                        hoverSide = null;
                    }
                }
            })

            if (!pressedField) {
                if (isHover) {

                    if (hoverSide === 'left' || hoverSide === 'right') {
                        canvas.style.cursor = 'ew-resize';
                    } else if (hoverSide === 'top' || hoverSide === 'bottom') {
                        canvas.style.cursor = 'ns-resize';
                    } else {
                        canvas.style.cursor = 'move';
                    }
                } else {
                    canvas.style.cursor = 'default';
                }
            }

            if (timeMouseUp - timeMouseDown > 200) {
                let row = Math.floor((x - offset.x) / gridSize);
                let column = Math.floor((y - offset.y) / gridSize);

                if (pressedField) {

                    if (pressedSide === 'left') {
                        if (row < 0) return;
                        if (row > 16) return;
                        if (row + pressedField.rowSize > 16) return;



                        pressedField.row = row;
                        pressedField.rowSize = pressedField.rowSize + pressedField.row - row;
                    } else if (pressedSide === 'right') {
                        if (row < 0) return;
                        if (row > 16) return;
                        if (row < pressedField.row) return;

                        let isCovering = false;
                        templateFields.forEach((field) => {
                            if (field !== pressedField) {
                                let aLeft = pressedField.row;
                                let aRight = row;
                                let bLeft = field.row;
                                let bRight = field.row + field.rowSize;

                                if (aLeft <= bRight && aRight >= bLeft) {
                                    let aTop = pressedField.column;
                                    let aBottom = pressedField.column + pressedField.columnSize;
                                    let bTop = field.column;
                                    let bBottom = field.column + field.columnSize;

                                    if (aTop < bBottom && aBottom > bTop) {
                                        isCovering = true;
                                    }
                                }


                            }
                        })

                        if (isCovering) return;

                        pressedField.rowSize = row - pressedField.row + 1;
                    } else if (pressedSide === 'top') {
                        if (column < 0) return;
                        if (column > 16) return;
                        if (column + pressedField.columnSize > 16) return;
                        pressedField.column = column;
                        pressedField.columnSize = pressedField.columnSize + pressedField.column - column;
                    } else if (pressedSide === 'bottom') {
                        if (column < 0) return;
                        if (column > 16) return;
                        if (column < pressedField.column) return;

                        let isCovering = false;
                        templateFields.forEach((field) => {
                            if (field !== pressedField) {
                                let aTop = pressedField.column;
                                let aBottom = column;
                                let bTop = field.column;
                                let bBottom = field.column + field.columnSize;

                                if (aTop <= bBottom && aBottom >= bTop) {
                                    let aLeft = pressedField.row;
                                    let aRight = pressedField.row + pressedField.rowSize;
                                    let bLeft = field.row;
                                    let bRight = field.row + field.rowSize;

                                    if (aLeft < bRight && aRight > bLeft) {
                                        isCovering = true;
                                    }
                                }
                            }
                        })

                        if (isCovering) return;

                        pressedField.columnSize = column - pressedField.column + 1;
                    } else {
                        if (row < 0) return;
                        if (row > 16) return;
                        if (column < 0) return;
                        if (column > 16) return;
                        if (row + pressedField.rowSize > 16) return;
                        if (column + pressedField.columnSize > 16) return;

                        let isCovering = false;
                        templateFields.forEach((field) => {
                            if (field !== pressedField) {
                                let aLeft = row;
                                let aRight = row + pressedField.rowSize;
                                let bLeft = field.row;
                                let bRight = field.row + field.rowSize;

                                if (aLeft < bRight && aRight > bLeft) {
                                    let aTop = column;
                                    let aBottom = column + pressedField.columnSize;
                                    let bTop = field.column;
                                    let bBottom = field.column + field.columnSize;

                                    if (aTop < bBottom && aBottom > bTop) {
                                        isCovering = true;
                                    }
                                }
                            }
                        })

                        if (isCovering) return;

                        pressedField.row = row;
                        pressedField.column = column;
                    }

                    render(canvas, ctx);
                }
            }
        }
    })


</script>

<div class="template-editor-header">
    <TextField label="Name" style="margin-left: 10px" labelStyle="display:none;" value={template.name} onChange={(e) => {
        template = {...template, name: e.target.value}
    }}/>
    <p>{isSaving}</p>
</div>

<div class="body" id="body">
    <canvas id="canvas" width="100" height="100"></canvas>
    <div class="field-property">

        <!-- Name -->
        <div class="property">
            <label for="name">Name</label>
            <input
                    id="name"
                    type="text"
                    value={selectedField ? selectedField.name : ""}
                    on:change={(e) => {
                    selectedField = {...selectedField, name: e.target.value}
                }}
            />
        </div>

        <!-- Type -->
        <div class="property">
            <label for="type">Type</label>
            <select
                    id="type"
                    class="type"
                    value={selectedField ? selectedField.type : ""}
                    on:change={(e) => {
                    selectedField = {...selectedField, type: e.target.value}
                }}
            >
                <option value="text">Text</option>
                <option value="image">Image</option>
            </select>
        </div>

        <!-- delete -->
        <button
            class="delete property"
            on:click={() => {
            templateFields = templateFields.filter((field) => field !== selectedField)
            selectedField = null;
            const canvas = document.getElementById('canvas');
            render(canvas, canvas.getContext('2d'));
            const fieldProperty = document.querySelector('.field-property');
            fieldProperty.style.visibility = 'hidden';
        }}>Delete</button>


    </div>
</div>

<style>


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

    .body {
        display: flex;
        justify-content: space-between;
        flex-direction: row;
        flex-grow: 1;
    }

    canvas {
        background: #e7e7e7;
    }

    .field-property {
        width: 400px;
        position: fixed;
        right: 50px;
        top: 150px;
        background: #3d3d3d;
        border-radius: 15px;
        padding: 20px;
        height: 260px;
        display: flex;
        flex-direction: column;
        visibility: hidden;
    }

    input {
        width: 100%;
        padding: 10px;
        border-radius: 5px;
        border: none;
        background: #818181;
        color: white;
    }

    select {
        width: 100%;
        padding: 10px;
        border-radius: 5px;
        border: none;
        background: #818181;
        color: white;
    }

    label {
        color: white;
    }

    button {
        align-self: flex-end;
        padding: 10px;
        border-radius: 5px;
        border: none;
        background: #cc1d1d;
        color: white;
        cursor: pointer;
    }

    .property {
        margin-bottom: 20px;
    }


</style>
