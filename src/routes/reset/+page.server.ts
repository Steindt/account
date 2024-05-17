import { CASURL } from '$env/static/private';
import { redirect, type Actions } from '@sveltejs/kit';

export const actions = {
	default: async ({ request, url }) => {
		redirect(
			302,
			`${CASURL}login?service=${encodeURIComponent(url.toString() + '/callback')}&renew=true`
		);
	}
} satisfies Actions;
