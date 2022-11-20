const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');

const isAuthenticated = require('../middlewares/isAuthenticated');
const User = require('../models/User');

const router = express.Router();

router.post('/user/comics', isAuthenticated, fileUpload(), async (req, res) => {
	try {
		const comicsID = req.body.id;
		const user = req.user;

		const comicsList = user.favorites.comics;
		const charactersList = user.favorites.characters;
		console.log(comicsList);

		if (!comicsList.find((comics) => comics === comicsID)) {
			comicsList.push(comicsID);
			console.log(comicsList);

			user.favorites = { comics: comicsList, characters: charactersList };
			await user.save();
			return res.status(200).json(user.favorites);
		} else {
			return res.status(200).json('already in db');
		}
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

router.post('/user/characters', isAuthenticated, fileUpload(), async (req, res) => {
	try {
		const characterId = req.body.id;
		const user = req.user;

		const comicsList = user.favorites.comics;
		const charactersList = user.favorites.characters;

		if (charactersList.length === 0 || !charactersList.find((character) => character === characterId)) {
			charactersList.push(characterId);
			user.favorites = { comics: comicsList, characters: charactersList };
			await user.save();
			return res.status(200).json(user.user);
		} else {
			return res.status(200).json('already in db');
		}
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

router.get('/user/favorites', isAuthenticated, fileUpload(), async (req, res) => {
	try {
		const user = req.user;
		console.log(user);
		res.status(200).json(user.favorites);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

router.post('/user/biographie', isAuthenticated, fileUpload(), async (req, res) => {
	try {
		const user = req.user;

		const findUser = await User.findByIdAndUpdate(user._id);
		res.status(200).json(findUser);
	} catch (error) {
		res.status(400).json(error.message);
	}
});

module.exports = router;
