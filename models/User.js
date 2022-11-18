const mongoose = require('mongoose');

const User = mongoose.model('User', {
	username: { type: String },
	email: { type: String },
	account: {
		username: { type: String },
		avatar: { type: Object },
	},
	biography: { type: String },
	hash: { type: String },
	token: { type: String },
	salt: { type: String },
	favorites: {
		comics: { type: Array },
		characters: { type: Array },
	},
});

module.exports = User;
