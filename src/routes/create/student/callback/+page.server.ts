import { error, redirect } from '@sveltejs/kit';
import type { User } from '$lib/types.js';
import { validateTicket } from '$lib/cas.js';
import { activateUser, checkAlreadyExists, stageUser } from '$lib/ipa.js';

export async function load({ cookies, url }) {
	const cookie = cookies.get('userdata');
	if (!cookie) throw redirect(302, 'No data found');
	const data: User = JSON.parse(cookie);
	const ticket = url.searchParams.get('ticket');
	if (ticket == null || !data) throw error(400);
	const username = await validateTicket(ticket, url.protocol + '//' + url.host + url.pathname);
	const user: User = {
		username,
		firstname: data.firstname,
		lastname: data.lastname,
		email: data.email
	};
	if (await checkAlreadyExists(user)) {
		console.log(`There already exists an account with the username ${user.username}`);
		throw error(400);
	}
	await stageUser(user, true);
	await activateUser(user);
	console.log(`Activated a student account for ${user.username}`);
	redirect(302, '/');
}
