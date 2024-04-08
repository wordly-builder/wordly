<script lang="ts">
	import { signIn, signOut } from "@auth/sveltekit/client"
	import logo from '$lib/images/logo.svg';

	let password = "";
</script>

<svelte:head>
	<title>Wordly</title>
	<meta name="description" content="Create your own worlds" />
</svelte:head>

<section>
	<h1>
		<picture>
			<img src={logo} alt="Logo" />
		</picture>
	</h1>

	<div class="actions">
		<div class="wrapper-form">
			<button on:click={() => signIn()}>Sign In </button>
		</div>
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
		display: block;
		position: relative;
		width: 100%;
		height: 0;
		padding: 0 0 calc(100% * 495 / 2048) 0;
	}

	h1 img {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		display: block;
	}
</style>
