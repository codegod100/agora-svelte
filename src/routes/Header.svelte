<script>
	import { page } from '$app/stores';
</script>

<nav>
	<div class="navigation">
		<div class="navigation-links">
			<a href="/"><img src="/img/agora.png" class="logo" width="36px" height="36px" /></a>
			<!-- <a href="/" style="text-decoration: none;"><strong>Agora of Flancia</strong> at <strong>anagora.org</strong></a>-->
			<a href="/" style="text-decoration: none;"><strong>anagora.org</strong></a>
			<!-- ⸖ this is called a [[diple]], particularly [[Diple periestigmene]] -->
			&nbsp;⟶&nbsp;
			<a href="/nodes" style="text-decoration: none;">📚&nbsp;all nodes</a>
			|
			<a href="/latest" style="text-decoration: none;">🌀&nbsp;latest</a>
			|
			<a href="/today" style="text-decoration: none;">📅&nbsp;today</a>
			|
			<a data-sveltekit-reload href="/random" style="text-decoration: none;">🎲️&nbsp;random</a>
			|
			<a href="/users" style="text-decoration: none;">🫂&nbsp;users</a>
			|
			<a href="/journals" style="text-decoration: none;">📔&nbsp;journals</a>
			|
			<a href="/annotations" style="text-decoration: none;">✍&nbsp;annotations</a>
			|
			<a href="/settings" style="text-decoration: none;"><strong>⚙</strong>&nbsp;settings</a>
			|
			<a href="#" style="text-decoration: none;" id="theme-toggle">🌙&nbsp;theme</a>
			|
			<a href="/agora-help" style="text-decoration: none;" class="help-button"
				><strong>?</strong>&nbsp;help</a
			>
			|
			<a href="/join" style="text-decoration: none;">🙏&nbsp;join</a>
		</div>
	</div>

	<hr />

	<div class="topline-node">
		<div class="topline-node-wrapper">
			<div class="topline-query">
				<button id="mini-cli-exec" value="exec" title="Searches known Agoras">search</button>
			</div>
			<div class="topline-cli">
				<form action="/exec" method="get">
					<input id="mini-cli" type="text" value={$page.params.name || $page.data.node} name="q" />
				</form>
			</div>
			<button id="mini-cli-clear" value="clear" title="Clears the query box">clear</button>
			<button id="mini-cli-go" value="go" title="Redirects to a [[go]] link if one is found"
				>go</button
			>
		</div>

		<hr />

		<div class="topline-search">
			<strong>↳ on the Internet → </strong>
			<a href="https://www.google.com/search?q=index">Google</a>
			· <a href="https://www.duckduckgo.com/index">DuckDuckGo</a>
			· <a href="https://searx.bar/search?q=index&categories=general&language=en-US">Searx</a>
			·
			<a
				href="https://twitter.com/search?q=index%20filter%3Afollows%20-filter%3Areplies&src=typed_query&f=live"
				>Twitter</a
			>
			· <a href="https://github.com/search?q=index">Github</a>
		</div>

		<div class="topline-agora">
			<strong>↳ in the <a href="https://anagora.org">Agora of Flancia</a> ⬎</strong>
			<div>
				<button id="pull-all" value="pull-all" title="Pulls (embeds) some resources below"
					>pull</button
				>
				<button id="fold-all" value="fold-all" title="Folds (collapses) embeds below">fold</button>
				<button id="retry-elsewhere" value="retry-elsewhere" title="Retries elsewhere if possible"
					>retry</button
				>
			</div>
		</div>
	</div>
</nav>
