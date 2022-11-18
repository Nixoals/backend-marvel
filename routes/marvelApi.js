const express = require('express');
const axios = require('axios');
const MD5 = require('crypto-js/md5');
const Base64 = require('crypto-js/enc-base64');

const router = express.Router();
// const ApiKey = process.env.REACTEUR_API_KEY;
const ApiPrivateKeyMarvel = process.env.MARVEL_API_PRIVATE_KEY;
const ApiKeyMarvel = process.env.MARVEL_API_KEY;

const ts = 1;

let hash = MD5(ts + ApiPrivateKeyMarvel + ApiKeyMarvel);
hash = hash.toString(Base64);
console.log(hash);

const baseUrlMarvel = 'https://gateway.marvel.com/v1/public';

//get all Comics
router.get('/comics', async (req, res) => {
	try {
		const { limit, skip, title } = req.query;
		let limitValue, skipValue, titleValue;

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

		const url = `${baseUrlMarvel}/comics?apiKey=${ApiKeyMarvel}${limitValue}`;

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

		const url = `${baseUrlMarvel}/comics/${characterId}?apiKey=${ApiKeyMarvel}`;

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
			nameValue = `nameStartsWith=${name}`;
		} else {
			nameValue = '';
		}
		const order = '&orderBy=name';
		const api = `&apiKey=${ApiKeyMarvel}`;

		const url = `${baseUrlMarvel}/characters?ts=1&hash=${hash}${nameValue}${order}${limitValue}${skipValue}${api}`;
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

		const url = `${baseUrlMarvel}/character/${id}?apiKey=${ApiKeyMarvel}`;
		console.log(url);
		const response = await axios.get(url);

		res.status(200).json(response.data);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

module.exports = router;
