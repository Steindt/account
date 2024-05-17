import { error, redirect } from '@sveltejs/kit';
import { db } from '$lib/db.js';

export async function load({ cookies, url }) {
	const hashed = url.searchParams.get('hash');
	if (!hashed) throw error(400);
	db.run(`DELETE FROM staged WHERE hashed='${hashed}'`);
	console.log('Denied creation of alumni account');
	redirect(302, '/');
}
