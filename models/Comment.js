const mongoose = require('mongoose');

const Comment = mongoose.model('Comment', {
	post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
	comment: {
		type: String,
		required: true,
	},
	createdAt: { type: String },
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
});

module.exports = Comment;
