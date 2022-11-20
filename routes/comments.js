const express = require('express');

const isAuthenticated = require('../middlewares/isAuthenticated');
const Comment = require('../models/Comment');
const Post = require('../models/Post');
const router = express.Router();

router.post('/user/post', isAuthenticated, async (req, res) => {
	try {
		const { title, description } = req.body;
		const user = req.user;
		const date = new Date();
		const newPost = new Post({
			author: user._id,
			title,
			description,
			createdAt: date,
		});

		await newPost.save();

		res.status(200).json({
			newPost,
		});
	} catch (error) {
		res.status(400).json(error.message);
	}
});

router.get('/blog/posts', async (req, res) => {
	try {
		const getPosts = await Post.find()
			.populate('author', 'account')
			.populate({ path: 'replies', populate: { path: 'author', select: 'account createdAt' } })
			.exec();

		res.status(200).json(getPosts);
	} catch (error) {
		res.status(400).json(error.message);
	}
});

router.post('/user/comment', isAuthenticated, async (req, res) => {
	try {
		const { post, comment } = req.body;
		const user = req.user;

		const newComment = new Comment({
			post: post,
			comment,
			author: user._id,
		});
		await newComment.save();

		const getPost = await Post.findById(post);
		console.log(getPost);
		const getOldReplies = getPost.replies;

		getOldReplies.push(newComment._id);
		getPost.replies = getOldReplies;

		await getPost.save();

		res.status(200).json({ newComment });
	} catch (error) {
		res.status(400).json(error.message);
	}
});

module.exports = router;
