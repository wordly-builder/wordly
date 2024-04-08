<script lang="ts">
	import { SignIn, SignOut } from "@auth/sveltekit/components"
	import { page } from "$app/stores"
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

	<div>
		{#if $page.data.session}
			{#if $page.data.session.user?.image}
				<img
						src={$page.data.session.user.image}
						class="avatar"
						alt="User Avatar"
				/>
			{/if}
			<span class="signedInText">
      <small>Signed in as</small><br />
      <strong>{$page.data.session.user?.name ?? "User"}</strong>
    </span>
			<SignOut>
				<div slot="submitButton" class="buttonPrimary">Sign out</div>
			</SignOut>
		{:else}
			<span class="notSignedInText">You are not signed in</span>
			<SignIn provider="google"/>
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
</style>
