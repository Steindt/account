import type { Error, User } from './types';

const illegalCharactersUsername = /[ `!@#$%^&*()_+=\[\]{};':"\\|,.<>\/?~åäö]/;
const illegalCharactersName = /[`!@#$%^&*()_+=\[\]{};':"\\|,.<>\/?~1234567890]/;
const illegalCharactersEmail = /[`!#$%^&*()_=\[\]{};':"\\|,<>\/?~]/;

// Returns array of strings informing of each error
export const sanitize = (user: User) => {
	let errors: Error = {
		username: [],
		firstname: [],
		lastname: [],
		email: []
	};

	if (user.username) {
		errors.username = checkLength('Username', user.username, 3, 12, errors.username);
		errors.username = checkCharacters(
			'Username',
			user.username,
			illegalCharactersUsername,
			errors.username
		);
	}

	if (user.firstname) {
		errors.firstname = checkLength('Firstname', user.firstname, 1, 255, errors.firstname);
		errors.firstname = checkCharacters(
			'Firstname',
			user.firstname,
			illegalCharactersName,
			errors.firstname
		);
	}

	if (user.lastname) {
		errors.lastname = checkLength('Lastname', user.lastname, 1, 255, errors.lastname);
		errors.lastname = checkCharacters(
			'Lastname',
			user.lastname,
			illegalCharactersName,
			errors.lastname
		);
	}

	if (user.email) {
		errors.email = checkLength('Email', user.email, 1, 255, errors.email);
		user.email = parseString(user.email);
		errors.email = checkCharacters('Email', user.email, illegalCharactersEmail, errors.email);
	}

	return errors.username.length > 0 ||
		errors.firstname.length > 0 ||
		errors.lastname.length > 0 ||
		errors.email.length > 0
		? errors
		: undefined;
};

const checkLength = (
	field: string,
	text: string,
	minLength: number,
	maxLength: number,
	errors: string[]
) => {
	if (text.length < minLength || text.length > maxLength) {
		const l = `${field} is too ${text.length < minLength ? `short, minimum length is ${minLength}` : `long, maximum length is ${maxLength}`}`;
		console.log(l);
		errors.push(l);
	}
	return errors;
};

const checkCharacters = (field: string, text: string, chars: RegExp, errors: string[]) => {
	const notOk = chars.exec(text);
	if (notOk) {
		const l = `${field} ${text} has illegal characters (${notOk})`;
		console.log(l);
		errors.push(l);
	}
	return errors;
};

const parseString = (text: string) => {
	return text
		.replace('å', 'a')
		.replace('ä', 'a')
		.replace('ö', 'o')
		.replace('Å', 'a')
		.replace('Ä', 'a')
		.replace('Ö', 'o')
		.replace(' ', '.')
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/, '');
};
