<script>
	import '../app.css';
	import { page } from '$app/stores';
	console.log($page.url.pathname);
</script>

<nav class="mb-2 flex bg-[#F280A1] p-2">
	{#if $page.url.pathname != '/'}
		<a href="/">Home</a>
	{/if}
	<a href="https://dsek.se" class="btn ml-auto pr-2">Main website</a>
</nav>
<slot />
