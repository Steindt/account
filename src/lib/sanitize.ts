// Returns array of strings informing of each error
export const sanitize = (user: {
	username: string;
	firstname: string;
	lastname: string;
	fullname: string;
	email: string;
}) => {
	let errors: string[] = [];
	errors = checkLength('Username', user.username, 3, 12, errors);
	errors = checkLength('Firstname', user.firstname, 1, 255, errors);
	errors = checkLength('Lastname', user.lastname, 1, 255, errors);
	errors = checkLength('Email', user.email, 1, 255, errors);

	const illegalCharactersUsername = /[ `!@#$%^&*()_+=\[\]{};':"\\|,.<>\/?~åäö]/;
	const illegalCharactersName = /[`!@#$%^&*()_+=\[\]{};':"\\|,.<>\/?~1234567890]/;
	const illegalCharactersEmail = /[`!#$%^&*()_=\[\]{};':"\\|,<>\/?~]/;

	user.email = parseString(user.email);

	errors = checkCharacters('Username', user.username, illegalCharactersUsername, errors);
	errors = checkCharacters('Firstname', user.firstname, illegalCharactersName, errors);
	errors = checkCharacters('Lastname', user.lastname, illegalCharactersName, errors);
	errors = checkCharacters('Email', user.email, illegalCharactersEmail, errors);

	return errors;
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
