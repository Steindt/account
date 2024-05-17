<script>
	import Error from '$lib/components/Error.svelte';

	export let form;
</script>

<div class="flex flex-col items-center">
	<div class="w-full sm:w-96">
		<h2 class="text-center">Alumni reset password form</h2>
		<p class="text-center">
			Once submitted, if the STIL-ID can be found in our systems, a password reset link will be sent
			to the email address associated with the account. <br /><br />If you do not have access to the
			email address, please contact our administrators at
			<a href="mailto:rootm@dsek.se" class="text-blue-400">rootm@dsek.se</a>.
		</p>
		<form method="POST" class="flex flex-col">
			<h3>Userdata</h3>
			<div class="p-4">
				<input
					required
					type="text"
					placeholder="STIL-id (ab1234cd-s, da64ab)"
					name="username"
					class="p-1"
					value={form?.username ?? ''}
				/>
				<Error errors={form?.errors?.username} />
			</div>
			<button type="submit" class="btn p-4 shadow-lg hover:shadow">Submit</button>
		</form>
	</div>
</div>
