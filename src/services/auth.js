import { ErrorCodes } from '../constants/index.js';
import { User } from '../models/index.js';
import { bCryptService } from './bcrypt.js';
import { jwtService } from './jwt.js';

export const authService = {
	save: async (data) => {
		try {
			const user = await authService.getUser({ email: data.email });
			if (user) {
				throw new Error(ErrorCodes.USER_ALREADY_EXISTS);
			}
			return await new User(data).save();
		} catch (e) {
			throw new Error(e.message);
		}
	},
	login: async (data) => {
		const user = await authService.getUser({ email: data.email });
		if (!user) {
			throw new Error(ErrorCodes.USER_NOT_EXISTS_WITH_THIS_EMAIL);
		}
		if (!(await bCryptService.compare(data.password, user.password))) {
			throw new Error(ErrorCodes.YOUR_PASSWORD_IS_INCORRECT);
		}
		return { user, token: jwtService.signIn(user ?? {}) };
	},
	getUser: async (query = {}) => {
		try {
			return await User.findOne(query).lean();
		} catch (e) {
			throw new Error(e.message);
		}
	},
	update: async (query, data) =>
		User.findOneAndUpdate(query, data, { new: true })
			.then((res) => res)
			.catch((err) => {
				throw new Error(err);
			}),
	delete: (query) =>
		User.findOneAndDelete(query)
			.then((res) => res)
			.catch((err) => {
				throw new Error(err);
			}),
	updateUser: async (query, body) => {
		const user = await authService.getUser(query);
		if (!user) {
			throw new Error(ErrorCodes.USER_NOT_EXISTS_WITH_ID);
		} else {
			return await authService.update(query, body);
		}
	},
};
