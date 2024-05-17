<div class="flex flex-col items-center">
	<div class="w-full sm:w-96">
		<h1 class="text-center text-xl font-bold">Student account creation</h1>
		<p class="text-center">
			Once submitted, you will be redirected to Lund University's login website to confirm you are a
			student. Once confirmed, the account will be created.
		</p>
		<form method="POST" class="flex flex-col">
			<h3 class="mb-3 mt-3 font-bold">Userdata</h3>
			<div class="flex items-center justify-between">
				<label for="Tair"> First name </label>
				<input required type="text" placeholder="John" name="firstname" class="p-1" />
			</div>
			<div class="flex items-center justify-between">
				<label for="lastname"> Last name </label>
				<input required type="text" placeholder="Doe" name="lastname" class="p-1" />
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
