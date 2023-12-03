import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const postSchema = new Schema(
	{
		body: {
			type: String,
			required: true,
		},
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
	},
	{ timestamps: true }
);

export const Post = mongoose.model('Post', postSchema);
