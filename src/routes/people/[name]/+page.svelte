<script>
	/** @type {import('./$types').PageData} */
	export let data;
</script>

<div>
	{#await data.all then people}
		<table>
			<tr><td>UUID</td><td>name</td></tr>
			{#each people as person}
				<tr><td>{person.id}</td> <td>{person.name}</td></tr>
			{/each}
		</table>
		<div>There are {people.length} people in this query</div>
	{/await}
</div>

<style>
	td {
		border: solid black 1px;
	}
</style>
