const express = require('express');
const axios = require('axios');

const router = express.Router();
const ApiKey = process.env.REACTEUR_API_KEY;
const ApiKeyMarvel = process.env.MARVEL_API_KEY;

const baseUrl = 'https://lereacteur-marvel-api.herokuapp.com';
const baseUrlMarvel = 'https://gateway.marvel.com:443/v1/public';

//get all Comics
router.get('/comics', async (req, res) => {
	try {
		const { limit, skip, title } = req.query;
		let limitValue, skipValue, titleValue;
		console.log(title);
		if (limit) {
			limitValue = `&limit=${limit}`;
		} else {
			limitValue = '';
		}
		if (skip) {
			skipValue = `&skip=${skip}`;
		} else {
			skipValue = '';
		}
		if (title) {
			titleValue = `&title=${title}`;
		} else {
			titleValue = '';
		}

		const url = `${baseUrl}/comics?apiKey=${ApiKey}${limitValue}${skipValue}${titleValue}`;
		console.log(url);
		const response = await axios.get(url);

		res.status(200).json(response.data);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

// get list of comics from specific character
router.get('/comics/:characterId', async (req, res) => {
	try {
		const { characterId } = req.params;

		const url = `${baseUrl}/comics/${characterId}?apiKey=${ApiKey}`;

		console.log(url);
		const response = await axios.get(url);
		res.status(200).json(response.data);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

// get  all Characters
router.get('/characters', async (req, res) => {
	try {
		const { limit, skip, name } = req.query;

		let limitValue, skipValue, nameValue;

		if (limit) {
			limitValue = `&limit=${limit}`;
		} else {
			limitValue = '';
		}
		if (skip) {
			skipValue = `&skip=${skip}`;
		} else {
			skipValue = '';
		}
		if (name) {
			nameValue = `&name=${name}`;
		} else {
			nameValue = '';
		}

		const url = `${baseUrl}/characters?apiKey=${ApiKey}${limitValue}${skipValue}${nameValue}`;
		console.log(url);
		const response = await axios.get(url);

		res.status(200).json(response.data);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

// get specific character
router.get('/character/:id', async (req, res) => {
	try {
		const { id } = req.params;

		const url = `${baseUrl}/character/${id}?apiKey=${ApiKey}`;
		console.log(url);
		const response = await axios.get(url);

		res.status(200).json(response.data);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

module.exports = router;
