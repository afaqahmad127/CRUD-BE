import { ErrorCodes, ErrorCodesMeta } from '../../constants/index.js';
import { postService } from '../../services/index.js';
import { httpResponse } from '../../utils/index.js';

const controller = {
	create: async (req, res) => {
		try {
			return httpResponse.CREATED(
				res,
				(await postService.createPost(req.body)) || {}
			);
		} catch (e) {
			if (e.message === ErrorCodes.POST_ALREADY_EXISTS) {
				return httpResponse.CONFLICT(
					req,
					res,
					{ body: req.body },
					ErrorCodesMeta.POST_ALREADY_EXISTS.message,
					'Create post'
				);
			}
			return httpResponse.INTERNAL_SERVER(
				req,
				res,
				{ body: req.body },
				e.message,
				'Create post'
			);
		}
	},
	read: async (req, res) => {
		try {
			return httpResponse.SUCCESS(
				res,
				(await postService.getPost({ _id: req.params.id })) || {}
			);
		} catch (e) {
			if (e.message === ErrorCodes.POST_NOT_FOUND) {
				return httpResponse.NOT_FOUND(
					req,
					res,
					{ params: req?.params },
					ErrorCodesMeta.POST_NOT_FOUND.message,
					'Get post'
				);
			}
			return httpResponse.INTERNAL_SERVER(
				req,
				res,
				{ params: req?.params },
				e.message,
				'Get post'
			);
		}
	},
	update: async (req, res) => {
		try {
			return httpResponse.SUCCESS(
				res,
				(await postService.updatePost({ _id: req.params.id }, req.body)) || {}
			);
		} catch (e) {
			if (
				e.message === ErrorCodes.POST_NOT_FOUND ||
				ErrorCodes.POST_ALREADY_EXISTS
			) {
				return httpResponse.NOT_FOUND(
					req,
					res,
					{ params: req?.params, body: req?.body },
					e.message === ErrorCodes.POST_NOT_FOUND
						? ErrorCodesMeta.POST_NOT_FOUND.message
						: e.message === ErrorCodes.POST_ALREADY_EXISTS
						? ErrorCodesMeta.POST_ALREADY_EXISTS.message
						: e.message,
					'Update POST'
				);
			}
			return httpResponse.INTERNAL_SERVER(
				req,
				res,
				{ body: req.body },
				e.message,
				'Update post'
			);
		}
	},
	delete: async (req, res) => {
		try {
			return httpResponse.SUCCESS(
				res,
				(await postService.deletePost({ _id: req.params.id })) || {}
			);
		} catch (e) {
			if (e.message === ErrorCodes.POST_NOT_FOUND) {
				return httpResponse.NOT_FOUND(
					req,
					res,
					{ params: req?.params },
					ErrorCodesMeta.POST_NOT_FOUND.message,
					'Get post'
				);
			}
			return httpResponse.INTERNAL_SERVER(
				req,
				res,
				{ params: req?.params },
				e.message,
				'Get post'
			);
		}
	},
	getAll: async (req, res) => {
		try {
			return httpResponse.SUCCESS(res, await postService.getAll());
		} catch (e) {
			return httpResponse.INTERNAL_SERVER(
				req,
				res,
				{},
				e.message,
				'Get All post'
			);
		}
	},
};

export default controller;
