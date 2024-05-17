import { redirect, type Actions } from '@sveltejs/kit';
import { CASURL } from '$env/static/private';

export const actions = {
	default: async ({ request, cookies, url }) => {
		const data = await request.formData();
		const firstname = data.get('firstname')?.toString();
		const lastname = data.get('lastname')?.toString();
		const email = data.get('email')?.toString();
		console.log('test');
		if (!firstname || !lastname || !email) return { success: false };
		cookies.set(
			'userdata',
			JSON.stringify({
				firstname,
				lastname,
				email
			}),
			{
				path: '/create/student/callback',
				sameSite: true,
				httpOnly: true,
				maxAge: 300,
				secure: true
			}
		);
		throw redirect(
			302,
			`${CASURL}login?service=${encodeURIComponent(url.protocol + url.hostname + url.pathname + '/callback&renew=true')}`
		);
	}
} satisfies Actions;
