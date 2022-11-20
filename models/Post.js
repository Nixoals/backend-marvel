const mongoose = require('mongoose');

const Post = mongoose.model('Post', {
	title: { type: String },
	author: {
		// To reference the user that left the comment. If needed
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'User',
	},
	description: {
		type: String,
		required: true,
	},

	replies: [{ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Comment' }],
	createdAt: { type: String },
});

module.exports = Post;
