import Joi from 'joi';
import mongoose from 'mongoose';
export const mongoIdValidation = Joi.string()
	.custom((value, helpers) => {
		if (!mongoose.Types.ObjectId.isValid(value)) {
			return helpers.error('any.invalid');
		}
		return value;
	})
	.required()
	.messages({
		'any.invalid': 'The provided ID is not a valid MongoDB ObjectID',
	});
export const createPost = {
	body: Joi.object().keys({
		body: Joi.string().min(3).required(),
		userId: mongoIdValidation,
	}),
};
export const updatePost = {
	params: Joi.object().keys({
		id: mongoIdValidation,
	}),
	body: Joi.object().keys({
		body: Joi.string().min(3).required(),
	}),
};
export const getPost = {
	params: Joi.object().keys({
		id: mongoIdValidation,
	}),
};
export const deletePost = {
	params: Joi.object().keys({
		id: mongoIdValidation,
	}),
};
