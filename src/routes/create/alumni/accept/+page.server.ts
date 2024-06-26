import { error, redirect } from '@sveltejs/kit';
import { db } from '$lib/db.js';
import type { User } from '$lib/types.js';
import { activateUser } from '$lib/ipa.js';

export async function load({ cookies, url }) {
	const hashed = url.searchParams.get('hash');
	if (!hashed) throw error(400);
	db.serialize(() => {
		db.get(`SELECT * FROM staged WHERE hashed='${hashed}'`, (err, row) => {
			if (err) throw error(400);
			if (!row) throw error(400);
			const user: User = row;
			activateUser(user);
			console.log(`Activated an alumni account for ${user.username}`);
		});
		db.run(`DELETE FROM staged WHERE hashed='${hashed}'`);
	});
	redirect(302, '/');
}
