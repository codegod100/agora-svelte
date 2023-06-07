<script>
	export let data;
	import { page } from '$app/stores';
</script>

{#each data.nodes as node}
	<div class="node">
		<div class="node-header main-header">
			<span
				>📚 Node <a
					href="/node/{node.name}"
					title="A node is a collection of resources with a matching name or an explicit relationship to a context."
					>[[{node.name}]]</a
				>
			</span>
		</div>
		{#each node.subnodes as subnode}
			<div class="subnode">
				<div class="subnode-header">
					<span class="subnode-id">
						<span class="subnode-links">
							<a href="@agora/index" title="subnode index.md">📓</a>
							<a href="/raw/{subnode.relPath}"><tt title="index.md">{subnode.relPath}</tt></a>
							(text) by
							<a href="/@agora">@<span class="subnode-user">{subnode.user}</span></a>
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
					{@html subnode.data}
				</span>
			</div>
		{/each}
	</div>
{/each}

<style>
	td {
		border: 1px solid black;
		padding: 10px;
	}
</style>
