//HTTP Responses
import { ErrorCodesMeta } from '../constants/error-codes.js';
import { SuccessCodesMeta } from '../constants/success-codes.js';
import { logAction } from './logs.js';
export const httpResponse = {
	SUCCESS: (res, data = {}, message = SuccessCodesMeta.SUCCESS.message) => {
		res.status(200).json({
			meta: {
				status: 200,
				response: 'OK',
				message,
			},
			data,
		});
	},
	CREATED: (res, data = {}, message = SuccessCodesMeta.CREATED.message) => {
		res.status(201).json({
			meta: {
				status: 201,
				response: 'Created',
				message,
			},
			data,
		});
	},
	ACCEPTED: (res, data = {}, message = SuccessCodesMeta.ACCEPTED.message) => {
		res.status(202).json({
			meta: {
				status: 202,
				response: 'Accepted',
				message,
			},
			data,
		});
	},
	NON_AUTHORATIVE: (
		req,
		res,
		data = {},
		message = SuccessCodesMeta.NON_AUTHORATIVE.message,
		action
	) => {
		logAction(req, action, 'info');
		res.status(203).json({
			meta: {
				status: 203,
				response: 'Non-Authoritative Information',
				message,
			},
			data,
		});
	},
	NO_CONTENT: (
		req,
		res,
		data = {},
		message = SuccessCodesMeta.NO_CONTENT.message,
		action
	) => {
		logAction(req, action, 'error', { data, error: message });
		res.status(204).json({
			meta: {
				status: 204,
				response: 'No Content',
				message,
			},
			data,
		});
	},
	NOT_MODIFIED: (
		req,
		res,
		data = {},
		message = SuccessCodesMeta.NOT_MODIFIED.message,
		action
	) => {
		logAction(req, action, 'error', { data, error: message });
		res.status(304).json({
			meta: {
				status: 304,
				response: 'Not Modified.',
				message,
			},
			data,
		});
	},
	BAD_REQUEST: (
		req,
		res,
		data = {},
		message = ErrorCodesMeta.BAD_REQUEST.message,
		action
	) => {
		logAction(req, action, 'error', { data, error: message });
		res.status(400).json({
			meta: {
				status: 400,
				response: 'Bad Request',
				message,
			},
			data,
		});
	},
	UNAUTHORIZED: (
		req,
		res,
		data = {},
		message = ErrorCodesMeta.UNAUTHORIZED.message,
		action
	) => {
		logAction(req, action, 'error', { data, error: message });
		res.status(401).json({
			meta: {
				status: 401,
				response: 'Unauthorized',
				message,
			},
			data,
		});
	},
	PAYMENT_REQUIRED: (
		req,
		res,
		data = {},
		message = ErrorCodesMeta.PAYMENT_REQUIRED.message,
		action
	) => {
		logAction(req, action, 'error', { data, error: message });
		res.status(402).json({
			meta: {
				status: 402,
				response: 'Payment Required',
				message,
			},
			data,
		});
	},
	FORBIDDEN: (
		req,
		res,
		data = {},
		message = ErrorCodesMeta.FORBIDDEN.message,
		action
	) => {
		logAction(req, action, 'error', { data, error: message });
		res.status(403).json({
			meta: {
				status: 403,
				response: 'Forbidden',
				message,
			},
			data,
		});
	},
	NOT_FOUND: (
		req,
		res,
		data = {},
		message = ErrorCodesMeta.NOT_FOUND.message,
		action
	) => {
		logAction(req, action, 'error', { data, error: message });
		res.status(404).json({
			meta: {
				status: 404,
				response: 'Not Found',
				message,
			},
			data,
		});
	},
	CONFLICT: (
		req,
		res,
		data = {},
		message = ErrorCodesMeta.CONFLICT.message,
		action
	) => {
		logAction(req, action, 'error', { data, error: message });
		res.status(409).json({
			meta: {
				status: 409,
				response: 'Conflict',
				message,
			},
			data,
		});
	},
	NOT_ALLOWED: (
		req,
		res,
		data = {},
		message = ErrorCodesMeta.NOT_ALLOWED.message,
		action
	) => {
		logAction(req, action, 'error', { data, error: message });
		res.status(405).json({
			meta: {
				status: 405,
				response: 'Method not allowed.',
				message,
			},
			data,
		});
	},
	INTERNAL_SERVER: (
		req,
		res,
		data = {},
		message = ErrorCodesMeta.INTERNAL_SERVER_ERROR.message,
		action
	) => {
		logAction(req, action, 'error', { data, error: message });
		res.status(403).json({
			meta: {
				status: 409,
				response: 'Internal Server Error',
				message,
			},
			data,
		});
	},
};
