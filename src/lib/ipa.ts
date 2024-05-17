import child_process from 'child_process';
import util from 'util';
import type { User } from './types';

const exec = util.promisify(child_process.exec);

export const stageUser = async (user: User, student: boolean) => {
	const res = await exec(
		`ipa stageuser-add ${user.username} 
      --first=${user.firstname} 
      --last=${user.lastname} 
      --cn=${user.fullname} 
      --random --email=${user.email} 
      --class=${student ? 'student' : 'alumni'}`
	).catch((err) => {
		console.error(`Failed to stage user:
      Username: ${user.username}\n
      Firstname: ${user.firstname}\n
      Lastname: ${user.lastname}\n
      Fullname: ${user.fullname}\n
      Email: ${user.email}\n`);
		console.error(err);
		return false;
	});
	// TODO: Check stdout and stderr
	return true;
};

export const activateUser = async (user: User) => {
	await exec(`ipa stageuser-activate ${user.username}`).catch((err) => {
		console.error(`Failed to activate user:
    Username: ${user.username}\n
    Firstname: ${user.firstname}\n
    Lastname: ${user.lastname}\n
    Fullname: ${user.fullname}\n
    Email: ${user.email}\n`);
		console.error(err);
		return false;
	});
	// TODO: Check stdout and stderr
	return true;
};

export const checkAlreadyExists = async (user: User) => {
	const res = await exec(`ipa user-find --login="${user.username}"`);
	let number = '0';
	for (let i = 10; i < 20; i++) {
		let c = res.stdout.charAt(i);
		if (c >= '0' && c <= '9') {
			number = c;
		}
	}

	// TODO: Check stderr

	return number != '0';
};
