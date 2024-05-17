import nodemailer from 'nodemailer';
import type SMTPTransport from 'nodemailer/lib/smtp-transport';
import { MAILHOST, MAILPORT, MAILUSERNAME, MAILPASSWORD, MAILSOURCE } from '$env/static/private';

let transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo>;
if (MAILHOST && MAILPORT && MAILUSERNAME && MAILPASSWORD && MAILSOURCE) {
	transporter = nodemailer.createTransport({
		host: MAILHOST,
		port: parseInt(MAILPORT as string),
		secure: false,
		auth: {
			user: MAILUSERNAME,
			pass: MAILPASSWORD
		},
		tls: {
			maxVersion: 'TLSv1.2',
			minVersion: 'TLSv1.2',
			ciphers: 'ECDHE-RSA-AES256-GCM-SHA384'
		}
	});
} else {
	console.error('Could not create transporter, missing settings');
	throw Error('Missing environment variables for sending emails');
}

export const sendMail = async (mail: { to: string; subject: string; text: string }) => {
	await transporter.sendMail(mail);
	console.log(`Mail sent from ${MAILSOURCE} to ${mail.to} with subject ${mail.subject}`);
};
