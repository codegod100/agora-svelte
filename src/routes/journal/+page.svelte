<script>
	/** @type {import('./$types').PageData} */
	export let data;
</script>

<div>
	{#await data.journals then journals}
		<table>
			<tr><td>basename</td><td>user</td><td>content</td></tr>
			{#each journals.slice(1, 30) as journal}
				{#each journal.subnodes as subnode}
					<tr
						><td>{subnode.basename}</td><td>{subnode.user}</td> <td>{@html subnode.content}</td></tr
					>
				{/each}
			{/each}
		</table>
	{/await}
</div>

<style>
	td {
		vertical-align: top;
		border: 1px solid black;
	}
</style>
