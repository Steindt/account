import { error, redirect } from '@sveltejs/kit';
import { validateTicket } from '$lib/cas.js';
import { resetPassword } from '$lib/keycloak.js';

export async function load({ cookies, url }) {
	const ticket = url.searchParams.get('ticket');
	if (ticket == null) throw error(400);
	const username = await validateTicket(ticket, url.toString());
	if (!username) throw error(400);
	resetPassword(
		{
			username
		},
		`${username}@student.lu.se`
	);
	console.log(`Reset password for user ${username}`);
	redirect(302, '/');
}
