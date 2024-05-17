<script>
	import Error from '$lib/components/Error.svelte';

	export let form;
</script>

<div class="flex flex-col items-center">
	<div class="w-full sm:w-96">
		<h2 class="text-center">Alumni account creation form</h2>
		<p class="text-center">
			Once submitted, this will send an account creation request to the administrators. You will
			receive an email once accepted.
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
				<input
					required
					type="text"
					placeholder="Firstname"
					name="firstname"
					class="p-1"
					value={form?.firstname ?? ''}
				/>
				<Error errors={form?.errors?.firstname} />
				<input
					required
					type="text"
					placeholder="Lastname"
					name="lastname"
					class="p-1"
					value={form?.lastname ?? ''}
				/>
				<Error errors={form?.errors?.lastname} />
				<input
					required
					type="email"
					placeholder="Email"
					name="email"
					class="p-1"
					value={form?.email ?? ''}
				/>
				<Error errors={form?.errors?.email} />
			</div>
			<h3>Policy</h3>
			<div class="p-4">
				<label class="cursor-pointer">
					<input required type="checkbox" name="policy" />
					I hereby approve that the D-guild within TLTH processes the data above until you terminate
					your membership
				</label>
			</div>
			<button type="submit" class="btn p-4 shadow-lg hover:shadow">Submit</button>
		</form>
	</div>
</div>
