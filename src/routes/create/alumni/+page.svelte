<div class="flex flex-col items-center">
	<div class="w-full sm:w-96">
		<h1 class="text-center text-xl font-bold">Alumni account creation form</h1>
		<p class="text-center">
			Once submitted, this will send an account creation request to the administrators. You will
			receive an email once accepted.
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
			<div class="flex items-center justify-between">
				<label for="email"> First name </label>
				<input required type="text" placeholder="John" name="email" class="p-1" />
			</div>
			<div class="flex items-center justify-between">
				<label for="email"> Last name </label>
				<input required type="text" placeholder="Doe" name="email" class="p-1" />
			</div>
			<div class="flex items-center justify-between">
				<label for="email"> Email </label>
				<input required type="email" placeholder="john.doe@gmail.com" name="email" class="p-1" />
			</div>
			<h3 class="mb-3 mt-3 font-bold">Policy</h3>
			<label>
				<input required type="checkbox" />
				I hereby approve that the D-guild within TLTH processes the data above until you terminate your
				membership
			</label>
			<button type="submit" class="btn p-4 shadow-lg hover:shadow">Submit</button>
		</form>
	</div>
</div>
