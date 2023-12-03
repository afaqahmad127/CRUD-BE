import { ErrorCodes, ErrorCodesMeta } from '../../constants/index.js';
import { authService, postService } from '../../services/index.js';
import { httpResponse } from '../../utils/index.js';

export const controllers = {
	signUp: async (req, res) => {
		try {
			return httpResponse.CREATED(res, await authService.save(req.body));
		} catch (err) {
			if (err.message === ErrorCodes.USER_ALREADY_EXISTS) {
				return httpResponse.CONFLICT(
					req,
					res,
					req.body,
					ErrorCodesMeta.USER_ALREADY_EXISTS.message,
					'signUp'
				);
			} else {
				return httpResponse.INTERNAL_SERVER(
					req,
					res,
					req.body,
					err.message,
					'signUp'
				);
			}
		}
	},
	login: async (req, res) => {
		try {
			return httpResponse.SUCCESS(res, await authService.login(req.body));
		} catch (err) {
			if (
				err.message === ErrorCodes.USER_NOT_EXISTS_WITH_THIS_EMAIL ||
				err.message === ErrorCodes.YOUR_PASSWORD_IS_INCORRECT
			) {
				return httpResponse.NOT_FOUND(
					req,
					res,
					req.body,
					err.message === ErrorCodes.USER_NOT_EXISTS_WITH_THIS_EMAIL
						? ErrorCodesMeta.USER_NOT_EXISTS_WITH_THIS_EMAIL.message
						: err.message === ErrorCodes.YOUR_PASSWORD_IS_INCORRECT
						? ErrorCodesMeta.YOUR_PASSWORD_IS_INCORRECT.message
						: '',
					'login'
				);
			} else {
				return httpResponse.INTERNAL_SERVER(
					req,
					res,
					req.body,
					err.message,
					'login'
				);
			}
		}
	},
	profile: async (req, res) => {
		try {
			return httpResponse.SUCCESS(res, {
				user: await authService.getUser({ _id: req.user._id }),
				posts: await postService.getMany({ userId: req.user._id }),
			});
		} catch (err) {
			return httpResponse.INTERNAL_SERVER(
				req,
				res,
				req.body,
				err.message,
				'login'
			);
		}
	},
	deleteUser: async (req, res) => {
		try {
			return httpResponse.SUCCESS(
				res,
				(await authService.deleteUser({ _id: req.params.id })) || {}
			);
		} catch (e) {
			if (e.message === ErrorCodes.USER_NOT_EXISTS_WITH_ID) {
				return httpResponse.NOT_FOUND(
					req,
					res,
					{ params: req?.params },
					ErrorCodesMeta.USER_NOT_EXISTS_WITH_ID.message,
					'Deleting User'
				);
			}
			return httpResponse.INTERNAL_SERVER(
				req,
				res,
				{ params: req?.params },
				e.message,
				'Deleting User'
			);
		}
	},
	updateUser: async (req, res) => {
		try {
			return httpResponse.SUCCESS(
				res,
				(await authService.updateUser({ _id: req.params.id }, req.body)) || {}
			);
		} catch (e) {
			if (
				e.message === ErrorCodes.USER_NOT_EXISTS_WITH_ID ||
				ErrorCodes.USER_NOT_EXISTS_WITH_ID
			) {
				return httpResponse.NOT_FOUND(
					req,
					res,
					{ params: req?.params, body: req?.body },
					ErrorCodesMeta.USER_NOT_EXISTS_WITH_ID.message,
					'Update User'
				);
			}
			return httpResponse.INTERNAL_SERVER(
				req,
				res,
				{ body: req.body },
				e.message,
				'Update User'
			);
		}
	},
};
