import { ErrorCodes } from '../constants/index.js';
import { Post } from '../models/index.js';

export const postService = {
	save: (data) =>
		new Post(data)
			.save()
			.then((res) => res)
			.catch((err) => {
				throw new Error(err);
			}),
	get: (query) =>
		Post.findOne(query)
			.then((res) => res)
			.catch((err) => {
				throw new Error(err);
			}),
	getMany: (query = {}) =>
		Post.find(query)
			.populate('userId')
			.then((res) => res)
			.catch((err) => {
				throw new Error(err);
			}),
	update: (query, data) =>
		Post.findOneAndUpdate(query, data, { new: true })
			.then((res) => res)
			.catch((err) => {
				throw new Error(err);
			}),
	delete: (query) =>
		Post.findOneAndDelete(query)
			.then((res) => res)
			.catch((err) => {
				throw new Error(err);
			}),
	createPost: async (data) => {
		try {
			return postService.save(data);
		} catch (e) {
			throw new Error(e.message);
		}
	},
	updatePost: async (query, data) => {
		try {
			return postService.update(query, data);
		} catch (e) {
			throw new Error(e.message);
		}
	},
	getPost: async (query) => {
		try {
			const post = await postService.get(query);
			if (post) {
				return post;
			} else {
				throw new Error(ErrorCodes.POST_NOT_FOUND);
			}
		} catch (e) {
			throw new Error(e.message);
		}
	},
	deletePost: async (query) => {
		try {
			const post = await postService.get(query);
			if (post) {
				return postService.delete(query);
			} else {
				throw new Error(ErrorCodes.POST_NOT_FOUND);
			}
		} catch (e) {
			throw new Error(e.message);
		}
	},
	getAll: async () => {
		try {
			return await postService.getMany();
		} catch (e) {
			throw new Error(e.message);
		}
	},
};
