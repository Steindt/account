import { redirect } from '@sveltejs/kit';
import type { User } from '$lib/types.js';

export function load({ cookies }) {
	const cookie = cookies.get('userdata');
	if (!cookie) throw redirect(302, 'No data found');
	const data: User = JSON.parse(cookie);
}
