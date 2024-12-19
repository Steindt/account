import { db } from '$lib/db';
import { getToken } from '$lib/keycloak';
import type { ServerInit } from '@sveltejs/kit';
import axios from 'axios';
import { KEYCLOAKREALM, KEYCLOAKURL } from '$env/static/private';

export const init: ServerInit = async () => {
	db.each(`SELECT * FROM resetemail`, async (err, row: any) => {
		if (err) {
			console.error(err);
		} else {
			setTimeout(
				async () => {
					const token = await getToken();
					await axios.put(
						`${KEYCLOAKURL}admin/realms/${KEYCLOAKREALM}/users/${row.uid}`,
						{
							email: row.email
						},
						{
							headers: {
								Authorization: 'Bearer ' + token
							}
						}
					);
					db.run(`DELETE FROM resetemail WHERE username='${row.username}'`);
				},
				1000 * 60 * 60 * 24
			);
		}
	});
};
