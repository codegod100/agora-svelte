<script>
	export let data;
	import { page } from '$app/stores';
</script>

<div class="node">
	<div class="node-header main-header">
		<span
			>📚 Node <a
				href="/index"
				title="A node is a collection of resources with a matching name or an explicit relationship to a context."
				>[[{$page.params.name}]]</a
			>
		</span>
	</div>
	{#if data.files.length == 0}
		<iframe
			title="wikipedia"
			id="exec-wp"
			src="https://en.wikipedia.org/wiki/{$page.params.name}"
			style="max-width: 100%;"
			width="99%"
			height="800px"
			allow="fullscreen"
		/>
	{/if}
	{#each data.files as file}
		<div class="subnode">
			<div class="subnode-header">
				<span class="subnode-id">
					<span class="subnode-links">
						<a href="@agora/index" title="subnode index.md">📓</a>
						<a href="/raw/index.md"><tt title="index.md">{file.path}</tt></a> (text) by
						<a href="/@agora">@<span class="subnode-user">{file.user}</span></a>
					</span>
				</span>

				<span class="subnode-contrib">
					<!-- 
						<a href="/raw/index.md" style="text-decoration: none;" title="view original (source)"></a>
						<a href="/export/@agora/index" style="text-decoration: none;" title="export (html)">⤓</a>
				-->

					<button onclick="downvote('1')" title="uprank this subnode">⇣</button>
					<button onclick="upvote('1')" title="uprank this subnode">⇡</button>
				</span>
			</div>
			<span class="subnode-content">
				{@html file.data}
			</span>
		</div>
	{/each}
</div>

<style>
	td {
		border: 1px solid black;
		padding: 10px;
	}
</style>
