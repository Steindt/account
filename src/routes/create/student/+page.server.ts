import { fail, redirect, type Actions } from '@sveltejs/kit';
import { CASURL } from '$env/static/private';
import type { User } from '$lib/types';
import { sanitize } from '$lib/sanitize';

export const actions = {
	default: async ({ request, cookies, url }) => {
		const data = await request.formData();
		const firstname = data.get('firstname')?.toString();
		const lastname = data.get('lastname')?.toString();
		const email = data.get('email')?.toString();
		if (!firstname || !lastname || !email) return fail(400);
		let user: User = {
			firstname,
			lastname,
			email
		};
		const errors = sanitize(user);
		if (errors) {
			return {
				firstname,
				lastname,
				email,
				errors
			};
		}
		cookies.set(
			'userdata',
			JSON.stringify({
				firstname,
				lastname,
				email
			}),
			{
				path: '/',
				sameSite: 'lax',
				httpOnly: true,
				secure: false,
				maxAge: 300
			}
		);
		throw redirect(
			302,
			`${CASURL}login?service=${encodeURIComponent(url.protocol + '//' + url.host + url.pathname + '/callback')}&renew=true`
		);
	}
} satisfies Actions;
