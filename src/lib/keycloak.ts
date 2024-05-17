import axios, { type AxiosResponse } from 'axios';

const getToken = async () => {
	const res = await axios
		.post(
			`${process.env.KEYCLOAKURL}realms/master/protocol/openid-connect/token`,
			{
				username: process.env.KEYCLOAKUSERNAME,
				password: process.env.KEYCLOAKPASSWORD,
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

const activateUser = async (user: {
	username: string;
	firstname: string;
	lastname: string;
	fullname: string;
	email: string;
}) => {
	const token = await getToken();

	const search = await axios
		.get(`${process.env.KEYCLOAKURL}admin/realms/${process.env.KEYCLOAKREALM}/users`, {
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
			`${process.env.KEYCLOAKURL}admin/realms/${process.env.KEYCLOAKREALM}/users/${id}`,
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
		.put(
			`${process.env.KEYCLOAKURL}admin/realms/${process.env.KEYCLOAKREALM}/users/${id}/execute-actions-email`,
			null,
			{
				headers: {
					Authorization: 'Bearer ' + token,
					'Content-Type': 'application/json'
				}
			}
		)
		.catch((err) => {
			console.error(err.data);
		});

	console.log(`Successfully activated ${user.username}`);
};
