<script lang="ts">
    export let onClick = () => {
        console.log('clicked');
    }

    export let label = 'Button';
    export let type: "submit" | "button" | "reset" | null | undefined = 'submit';
    export let style = '';
</script>

<button type={type} on:click={onClick} style={style}>{label}</button>

<style>
    button {
        background-color: #3d3d3d;
        border: none;
        color: white;
        padding: 15px 32px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        margin: 4px 2px;
        cursor: pointer;
        border-radius: 8px;
    }

    button:hover {
        background-color: #4d4d4d;
    }
</style>
