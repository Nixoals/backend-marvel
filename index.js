const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;

require('dotenv').config();
mongoose.connect(process.env.MONGODB_URI_LOCAL);

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_COULD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
	secure: true,
});

const app = express();
app.use(express.json());
app.use(cors());

const marvelApiRoutes = require('./routes/marvelReacteurApi');
app.use(marvelApiRoutes);

const signUpRoute = require('./routes/signUp');
app.use(signUpRoute);

const loginRoute = require('./routes/login');
app.use(loginRoute);

const userFavorites = require('./routes/user');
app.use(userFavorites);

// const marvelApiRoutes = require('./routes/marvelApi');
// app.use(marvelApiRoutes);

app.all('*', (req, res) => {
	res.status(404).json({ message: 'this route does not exist' });
});

app.listen(process.env.PORT_LOCAL, () => {
	console.log(`server started on port : ${process.env.PORT_LOCAL}`);
});
