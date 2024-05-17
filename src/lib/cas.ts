import axios from 'axios';
import xml2js from 'xml2js';
import { CASURL } from '$env/static/private';

export const validateTicket = async (ticket: string, url: string) => {
	const response = await axios.get(
		`${CASURL}serviceValidate?service=${encodeURI(url)}&ticket=${ticket}&renew=true`
	);
	const xml = await xml2js.parseStringPromise(response.data);
	let result: string | undefined;
	try {
		if (xml['cas:serviceResponse'].hasOwnProperty('cas:authenticationSuccess')) {
			result = xml['cas:serviceResponse']['cas:authenticationSuccess'][0]['cas:user'][0];
		} else {
			result = xml['cas:serviceResponse']['cas:authenticationFailure'][0]['$']['code'];
		}
	} catch (err) {
		result = undefined;
	}
	return result;
};
