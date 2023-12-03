import { httpResponse } from '../utils/index.js';

export const whoHasAccess = (role) => {
	return (req, res, next) => {
		const { user } = req;
		if (user && user.role === role) {
			next();
		} else {
			return httpResponse.FORBIDDEN(
				req,
				res,
				{ body: user },
				'User do not have access to perform this action!',
				'Role Base Access Control middleware!'
			);
		}
	};
};
