<script>
	import "../app.css";
</script>

<div class="app">
	<main>
		<slot />
	</main>

</div>

<style lang="postcss">

	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		width: 100%;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		width: 100%;
		box-sizing: border-box;
	}

</style>
