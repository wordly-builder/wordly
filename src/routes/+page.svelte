<script>
	import { page } from "$app/stores";
	import logo from '$lib/images/logo.svg';
	import  { onMount } from 'svelte';

	var isMouseDown = false;
	var drawColor = 'red';

	onMount(() => {
		const canvas = document.getElementById('canvas');

		if (canvas) {
			const ctx = canvas.getContext('2d');
			ctx.canvas.width = window.innerWidth;
			ctx.canvas.height = window.innerHeight;

			function mousedown() {
				isMouseDown = true;
				// setup random color
				drawColor = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`;
			}
			function mouseup() {
				isMouseDown = false;
			}

			document.onmousemove = function(event) {
				if(isMouseDown) {  //Only draw if mouse is down
					ctx.fillStyle = drawColor;
					ctx.arc(event.clientX, event.clientY, 10, 0, 2 * Math.PI);
					ctx.fill();
					ctx.beginPath();
				}
			}

			canvas.addEventListener('mousedown', mousedown);
			canvas.addEventListener('mouseup', mouseup);
			//canvas.addEventListener('mouseleave', mouseup);

		}
	});

	function signIn() {
		document.location.href = '/login';
	}

	function signOut() {

	}
</script>

<svelte:head>
	<title>Wordly</title>
	<meta name="description" content="Create your own worlds" />
</svelte:head>

<section>
	<canvas id="canvas" class="canvas" width="100%" height="100%"></canvas>

	<h1>
		<img src={logo} alt="Logo" />
	</h1>

	<div class="space"></div>

	<div class="actions">
		{#if $page.data.session}
			<button on:click={() => signOut()}>Sign Out</button>
		{:else}
			<button on:click={() => signIn()}>Sign In </button>
		{/if}
	</div>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 5em;
	}

	h1 img {
		width: 15em;
		z-index: 1;
	}

	.space {
		height: 10rem;
	}

	.actions {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	button {
		background-color: #858585;
		border: none;
		border-radius: 0.5rem;
		padding: 0.5rem 1rem;
		font-size: 1rem;
		cursor: pointer;
		color: white;
		z-index: 1;
	}

	.canvas {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
</style>
