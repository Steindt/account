import { resetPassword } from '$lib/keycloak';
import { sanitize } from '$lib/sanitize';
import type { User } from '$lib/types';
import { fail, type Actions } from '@sveltejs/kit';

export const actions = {
	default: async ({ request, url }) => {
		const data = await request.formData();
		const username = data.get('username')?.toString();
		if (!username) return fail(400);
		let user: User = {
			username
		};
		const errors = sanitize(user);
		if (errors) {
			return {
				username,
				errors
			};
		}
		resetPassword(user);
	}
} satisfies Actions;
