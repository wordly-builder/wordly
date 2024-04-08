<script lang="ts">
	import { signIn, signOut } from "@auth/sveltekit/client";
	import { page } from "$app/stores";
	import logo from '$lib/images/logo.svg';
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
	}
</style>
