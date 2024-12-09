import axios, { type AxiosResponse } from 'axios';
import type { KeycloakUser, User } from './types';
import {
	KEYCLOAKREALM,
	KEYCLOAKURL,
	KEYCLOAKUSERNAME,
	KEYCLOAKPASSWORD
} from '$env/static/private';
import { setTimeout } from 'timers';
import { db } from './db';

const getToken = async () => {
	const res = await axios
		.post(
			`${KEYCLOAKURL}realms/master/protocol/openid-connect/token`,
			{
				username: KEYCLOAKUSERNAME,
				password: KEYCLOAKPASSWORD,
				grant_type: 'password',
				client_id: 'admin-cli'
			},
			{
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					Accept: 'application/json'
				}
			}
		)
		.catch((err) => {
			console.error(err.data);
		});

	const token = (res as AxiosResponse<any, any>).data.access_token;
	return token;
};

const activateUser = async (user: User) => {
	const token = await getToken();

	const search = await axios
		.get(`${KEYCLOAKURL}admin/realms/${KEYCLOAKREALM}/users`, {
			params: {
				username: user.username,
				exact: true
			},
			headers: {
				Authorization: 'Bearer ' + token,
				Accept: 'application/json'
			}
		})
		.catch((err) => {
			console.error(err.data);
		});

	if (!search || search.data.length == 0) {
		return false;
	}

	const id = search.data[0];

	await axios
		.put(
			`${KEYCLOAKURL}admin/realms/${KEYCLOAKREALM}/users/${id}`,
			{
				id: id,
				requiredActions: ['UPDATE_PASSWORD']
			},
			{
				headers: {
					Authorization: 'Bearer ' + token
				}
			}
		)
		.catch((err) => {
			console.error(err.data);
		});

	await axios
		.put(`${KEYCLOAKURL}admin/realms/${KEYCLOAKREALM}/users/${id}/execute-actions-email`, null, {
			headers: {
				Authorization: 'Bearer ' + token,
				'Content-Type': 'application/json'
			}
		})
		.catch((err) => {
			console.error(err.data);
		});

	console.log(`Successfully activated ${user.username}`);
};

const getUser = async (user: User, token: string) => {
	const response = await axios
		.get(`${KEYCLOAKURL}admin/realms/${KEYCLOAKREALM}/users`, {
			params: {
				username: user.username,
				exact: true
			},
			headers: {
				Authorization: 'Bearer ' + token,
				Accept: 'application/json'
			}
		})
		.catch((err) => {
			console.error(err.response.data);
		});

	if (!response || response.data.length == 0) {
		return undefined;
	}

	return response.data[0];
};

export const resetPassword = async (user: User, email: string | undefined = undefined) => {
	const token = await getToken();
	const userdata: KeycloakUser = await getUser(user, token);
	try {
		await axios.put(
			`${KEYCLOAKURL}admin/realms/${KEYCLOAKREALM}/users/${userdata.id}`,
			{
				email: email ?? userdata.email
			},
			{
				headers: {
					Authorization: 'Bearer ' + token
				}
			}
		);
		await axios
			.put(
				`${KEYCLOAKURL}admin/realms/${KEYCLOAKREALM}/users/${userdata.id}`,
				{
					requiredActions: ['UPDATE_PASSWORD']
				},
				{
					headers: {
						Authorization: 'Bearer ' + token
					}
				}
			)
			.catch((e) => console.error(e));
		await axios
			.put(
				`${KEYCLOAKURL}admin/realms/${KEYCLOAKREALM}/users/${userdata.id}/execute-actions-email`,
				null,
				{
					headers: {
						Authorization: 'Bearer ' + token,
						'Content-Type': 'application/json'
					}
				}
			)
			.catch((e) => console.error(e));
		db.run(`INSERT INTO resetemail VALUES ('${user.username}', '${user.email}')`, (err) => {
			if (err) {
				console.error(err);
			} else {
				console.log(`Saved user original email`);
			}
		});
	} catch (err) {
		console.error(err);
	}
};
