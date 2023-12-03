import jwt from 'jsonwebtoken';
import config from '../config/index.js';
import { ErrorCodes } from '../constants/index.js';
export const jwtService = {
	signIn: (data) => {
		return jwt.sign({ ...data }, config.env.jwtSecret);
	},
	verify: (bearerToken) => {
		try {
			return jwt.verify(bearerToken, config.env.jwtSecret);
		} catch (err) {
			throw new Error(ErrorCodes.UNAUTHORIZED);
		}
	},
};
