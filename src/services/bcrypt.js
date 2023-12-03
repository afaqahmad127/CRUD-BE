import bcrypt from 'bcrypt';
export const bCryptService = {
	saltRound: 10,
	encrypt: (password) =>
		new Promise((resolve, reject) => {
			bcrypt.hash(password, bCryptService.saltRound, function (err, hash) {
				if (err) return reject(err);
				resolve(hash);
			});
		}),
	compare: (userEntered, hash) =>
		new Promise((resolve, reject) => {
			bcrypt.compare(userEntered, hash, function (err, result) {
				if (err) return reject(err);
				resolve(result);
			});
		}),
};
