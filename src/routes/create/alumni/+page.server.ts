import type { Actions } from './$types';
import { db } from '$lib/db';
import { sendMail } from '$lib/mail';
import { stageUser } from '$lib/ipa';
import { sanitize } from '$lib/sanitize';
import { hash } from '$lib/hash';
import { ADMINMAIL, MAILSOURCE } from '$env/static/private';
import { fail } from '@sveltejs/kit';

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const username = data.get('username')?.toString();
		const firstname = data.get('firstname')?.toString();
		const lastname = data.get('lastname')?.toString();
		const email = data.get('email')?.toString();
		if (!username || !firstname || !lastname || !email) return fail(400);
		if (!ADMINMAIL || !MAILSOURCE) {
			throw Error('Administrator mail or mail source not set up');
		}

		let user = {
			username,
			firstname,
			lastname,
			fullname: '',
			email
		};

		const errors = sanitize(user);
		if (errors) {
			return {
				username,
				firstname,
				lastname,
				email,
				errors
			};
		}

		user.fullname = `${user.firstname} ${user.lastname}`;

		if (await stageUser(user, false)) {
			db.run(
				`INSERT INTO staged VALUES ('${user.username}', '${user.firstname}', '${user.lastname}', '${user.fullname}', '${user.email}', '${hash(user.username)}')`,
				(err) => {
					if (err) {
						console.error(err);
					} else {
						console.log(`Staged user ${user.username}`);
					}
				}
			);
			const acceptLink = '';
			const denyLink = '';
			sendMail({
				to: ADMINMAIL,
				subject: `${username} has been staged`,
				text: `An account has been staged and waiting activation:\n
				Username: ${username}\n
				First name: ${firstname}\n
				Last name: ${lastname}\n
				Email: ${email}\n
				Accept: ${acceptLink}\n
				Deny: ${denyLink}\n
				`
			});
		}
	}
} satisfies Actions;
