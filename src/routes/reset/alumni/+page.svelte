<div class="flex flex-col items-center">
	<div class="w-full sm:w-96">
		<h1 class="text-center text-xl font-bold">Alumni reset password form</h1>
		<p class="text-center">
			Once submitted, if the STIL-ID and email corresponds to an account in our system, a password
			reset link will be sent to the email address. <br /><br />If you do not have access to the
			email address connected to your account, please contact our administrators at
			<a href="mailto:rootm@dsek.se" class="text-blue-400">rootm@dsek.se</a>.
		</p>
		<form class="flex flex-col">
			<h3 class="mb-3 mt-3 font-bold">Userdata</h3>
			<div class="flex items-center justify-between">
				<label for="username"> STIL-ID </label>
				<input
					required
					type="text"
					placeholder="Example: ab1234cd-s, da64st"
					name="username"
					class="p-1"
				/>
			</div>
			<button type="submit" class="btn p-4 shadow-lg hover:shadow">Submit</button>
		</form>
	</div>
</div>
