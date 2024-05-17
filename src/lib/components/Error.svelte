<script lang="ts">
	export let errors: string[] | undefined;
</script>

<div class="mb-4">
	{#if errors && errors.length > 0}
		{#each errors as error}
			<p class="text-left text-sm text-red-500">{error}</p>
		{/each}
	{/if}
</div>
