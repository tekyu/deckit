const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
	username: { type: String, required: true, unique: true },
	hash: { type: String, required: true },
	token: String,
	friends: { type: Array },
	email: { type: String },
	avatar: { data: Buffer, contentType: String },
	activeGames: { type: Array },
	ranking: { type: Number, default: 1200 },
	notifications: { type: Array },
	emailConsent: { type: Boolean, default: false },
	privacyConsent: { type: Boolean, default: false },
	createdCards: { type: Array },
	createdDecks: { type: Array },
	achievements: { type: Array }
});

UserSchema.plugin(uniqueValidator);

UserSchema.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.hash);
};

UserSchema.virtual("password").set(function(value) {
	this.hash = bcrypt.hashSync(value, 12);
});

module.exports = UserSchema;
