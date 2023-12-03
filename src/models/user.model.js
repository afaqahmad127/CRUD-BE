import mongoose from 'mongoose';
import { bCryptService } from '../services/index.js';
import { ROLE } from '../constants/index.js';
const Schema = mongoose.Schema;
const userSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		role: {
			type: String,
			enum: Object.values(ROLE),
			default: ROLE.USER,
		},
		password: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

userSchema.pre('save', async function (next) {
	this.password = await bCryptService.encrypt(this.password);
	this.email = this.email.toLowerCase();
	next();
});
export const User = mongoose.model('User', userSchema);
