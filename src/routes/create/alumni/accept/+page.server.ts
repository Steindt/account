import { error, redirect } from '@sveltejs/kit';
import { db } from '$lib/db.js';
import type { User } from '$lib/types.js';
import { activateUserIPA } from '$lib/ipa.js';
import { sendMail } from '$lib/mail';

export async function load({ cookies, url }) {
	const hashed = url.searchParams.get('hash');
	if (!hashed) throw error(400);
	let user: User | undefined = undefined;
	db.serialize(() => {
		db.get(`SELECT * FROM staged WHERE hashed='${hashed}'`, (err, row) => {
			if (err) throw err;
			if (row) {
				user = row;
				activateUserIPA(user);
				console.log(`Activated an alumni account for ${user.username}`);
			} else {
				console.error('Account not staged');
			}
		});
		db.run(`DELETE FROM staged WHERE hashed='${hashed}'`);
		if (user && user.email) {
			sendMail({
				to: user.email,
				subject: `Account activated`,
				text: `Your account on dsek.se has been activated`
			});
		} else {
			throw error(400, 'Account not staged');
		}
	});
	redirect(302, '/');
}
