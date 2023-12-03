export const ErrorCodes = {
	USER_ALREADY_EXISTS: 'USER_ALREADY_EXISTS',
	USER_NOT_EXISTS_WITH_THIS_EMAIL: 'USER_NOT_EXISTS_WITH_THIS_EMAIL',
	USER_NOT_EXISTS_WITH_ID: 'USER_NOT_EXISTS_WITH_ID',
	YOUR_PASSWORD_IS_INCORRECT: 'YOUR_PASSWORD_IS_INCORRECT',
	INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
	BAD_REQUEST: 'BAD_REQUEST',
	UNAUTHORIZED: 'UNAUTHORIZED',
	PAYMENT_REQUIRED: 'PAYMENT_REQUIRED',
	FORBIDDEN: 'FORBIDDEN',
	NOT_FOUND: 'NOT_FOUND',
	NOT_ALLOWED: 'NOT_ALLOWED',
	CONFLICT: 'CONFLICT',
	INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
	ERROR: 'ERROR',
	POST_ALREADY_EXISTS: 'POST_ALREADY_EXISTS',
	POST_NOT_FOUND: 'POST_NOT_FOUND',
};

export const ErrorCodesMeta = {
	USER_ALREADY_EXISTS: {
		code: ErrorCodes.USER_ALREADY_EXISTS,
		message: 'User already exist with this email',
	},
	POST_ALREADY_EXISTS: {
		code: ErrorCodes.POST_ALREADY_EXISTS,
		message: 'Post      already exist!',
	},
	INVALID_TWO_FACTOR_AUTH_CODE: {
		code: ErrorCodes.INVALID_TWO_FACTOR_AUTH_CODE,
		message: 'Invalid two factor auth code!',
	},
	POST_NOT_FOUND: {
		code: ErrorCodes.POST_NOT_FOUND,
		message: 'Post not found!',
	},
	USER_NOT_EXISTS_WITH_THIS_EMAIL: {
		code: ErrorCodes.USER_NOT_EXISTS_WITH_THIS_EMAIL,
		message: 'User not exist with this email',
	},
	USER_NOT_EXISTS_WITH_ID: {
		code: ErrorCodes.USER_NOT_EXISTS_WITH_ID,
		message: 'User not exist with this id',
	},
	YOUR_PASSWORD_IS_INCORRECT: {
		code: ErrorCodes.YOUR_PASSWORD_IS_INCORRECT,
		message: 'Your password is incorrect',
	},
	INVALID_CREDENTIALS: {
		code: ErrorCodes.INVALID_CREDENTIALS,
		message: 'Invalid credentials',
	},
	BAD_REQUEST: {
		code: ErrorCodes.BAD_REQUEST,
		message: 'Bad Request',
	},
	UNAUTHORIZED: {
		code: ErrorCodes.UNAUTHORIZED,
		message: 'Unauthorized',
	},
	PAYMENT_REQUIRED: {
		code: ErrorCodes.PAYMENT_REQUIRED,
		message: 'Payment Required',
	},
	FORBIDDEN: {
		code: ErrorCodes.FORBIDDEN,
		message: 'Forbidden',
	},
	NOT_FOUND: {
		code: ErrorCodes.NOT_FOUND,
		message: 'Not Found',
	},
	NOT_ALLOWED: {
		code: ErrorCodes.NOT_ALLOWED,
		message: 'Not Allowed',
	},
	CONFLICT: {
		code: ErrorCodes.CONFLICT,
		message: 'Conflict',
	},
	INTERNAL_SERVER_ERROR: {
		code: ErrorCodes.INTERNAL_SERVER_ERROR,
		message: 'Internal Server Error',
	},
	ERROR: {
		code: ErrorCodes.ERROR,
		message: 'Error',
	},
};

export default ErrorCodes;
