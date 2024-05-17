import crypto from 'crypto';

const algorithm = 'RSA-SHA512';

export const hash = (text: string) => {
	return crypto.createHash(algorithm).update(text).digest('hex');
};
