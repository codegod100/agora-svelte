<script>
	export let data;
	import { page } from '$app/stores';
</script>

<!-- <div>Path: {$page.params.path}</div> -->

<div class="subnode">
	<div class="subnode-header">{$page.params.path}</div>
	<div>{@html data.body}</div>
	<div>{@html data.raw}</div>
</div>
