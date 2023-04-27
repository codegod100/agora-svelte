<script>
	import Header from './Header.svelte';
	// import './styles.css';
	import { page } from '$app/stores';
</script>

<svelte:head>
	{#await $page.data.string then people}
		<meta name="description" content={people} />
	{/await}
	<title>[[{$page.params.name || $page.data.node}]]</title>
	<meta name="HandheldFriendly" content="True" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<link
		rel="search"
		type="application/opensearchdescription+xml"
		title="Agora"
		href="/search.xml"
	/>
	<link
		rel="stylesheet"
		type="text/css"
		href="//fonts.googleapis.com/css?family=Merriweather:300,700,700italic,300italic|Open+Sans:700,400"
	/>
	<link
		rel="stylesheet"
		media="screen"
		type="text/css"
		href="/css/screen-light.css"
		id="theme-link"
	/>
</svelte:head>

<div class="app">
	<main>
		<Header />
		<slot />
	</main>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
</style>
