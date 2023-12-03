import Joi from 'joi';
import validator from 'validator';

const isStrongPassword = (value, helpers) => {
	if (!validator.isStrongPassword(value)) {
		return helpers.message('Password must be strong');
	}
	return value;
};

export const updateUser = {
	body: Joi.object().keys({
		name: Joi.string().min(4).required(),
	}),
};
export const signUp = {
	body: Joi.object().keys({
		name: Joi.string().min(4).required(),
		email: Joi.string().email().required(),
		password: Joi.string()
			.custom(isStrongPassword, 'Password must be a strong password')
			.required(),
	}),
};

export const update = {
	params: Joi.object().keys({
		id: Joi.string().required(),
	}),
	body: Joi.object().keys({
		personal_name: Joi.string(),
		company_name: Joi.string(),
		email: Joi.string(),
	}),
};

export const login = {
	body: Joi.object().keys({
		email: Joi.string().email().required(),
		password: Joi.string().required(),
	}),
};
