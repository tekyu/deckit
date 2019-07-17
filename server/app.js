require("dotenv").config();
/* SERVER IMPORTS */
const express = require("express");
const app = express();
// const util = require("util");
const server = require("http").createServer();
const io = require("socket.io")(server);
const port = process.env.PORT || 3011;
const cors = require("cors");
const bodyParser = require("body-parser");
const express_session = require("express-session");
/* MONGO RELATED IMPORTS */

// SHOULD BE IMPORTED AS A MODULE
const mongoose = require("mongoose");

/* UTILITY IMPORTS */
const chalk = require("chalk");
const memu = require("./src/utils/memory-usage");
const morgan = require("morgan");
/* PASSPORT IMPORTS */

// SHOULD BE IMPORTED AS A AUTH MODULE

const passport = require("passport");
const User = require("./src/models/User");
// var silence = new User({ username: "Silence" });
// console.log("silence", silence);

const LocalStrategy = require("passport-local").Strategy;
const local = new LocalStrategy((username, password, done) => {
	User.findOne({ username })
		.then(user => {
			if (!user || !user.validPassword(password)) {
				done(null, false, { message: "Invalid username/password" });
			} else {
				done(null, user);
			}
		})
		.catch(e => done(e));
});
passport.use("local", local);

passport.serializeUser(function(user, done) {
	console.log("serialize user", user);
	done(null, user._id);
});

passport.deserializeUser(function(userId, done) {
	console.log("deserialize user", userId);
	User.findById(userId, (err, user) => done(err, user));
});

/* APP */
app.options(
	"*",
	cors({
		credentials: true,
		origin: process.env.DEV_ADDRESS,
		optionsSuccessStatus: 200
	})
);
app.post(
	"*",
	cors({
		credentials: true,
		origin: process.env.DEV_ADDRESS,
		optionsSuccessStatus: 200
	})
);
app.get(
	"*",
	cors({
		credentials: true,
		origin: process.env.DEV_ADDRESS,
		optionsSuccessStatus: 200
	})
);
app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(
	express_session({
		secret: "hanabala dzis nie srala",
		resave: false, //required
		saveUninitialized: false //required
	})
);
app.use(passport.initialize());
app.use(passport.session());
app.listen(port, () => console.log(`Server listening on port ${port}`));
app.get("/", function(req, res) {
	res.sendFile(__dirname + "/index.html");
});

// Create the database connection
mongoose.connect(process.env.DEVDB_CONN, { useNewUrlParser: true });

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on("connected", function() {
	console.log(
		"Mongoose default connection open to " + process.env.DB_ADDRESS
	);
});

const loggedInOnly = (req, res, next) => {
	if (req.isAuthenticated()) next();
	else res.redirect("/login");
};

const loggedOutOnly = (req, res, next) => {
	if (req.isUnauthenticated()) next();
	else res.redirect("/");
};

app.post("/api/check", (req, res, next) => {
	console.log("check", req.isAuthenticated());
	if (req.isAuthenticated()) {
		console.log("true", req.user);
		const {
			friends,
			activeGames,
			username,
			ranking,
			notifications
		} = req.user;
		const data = {
			friends,
			activeGames,
			username,
			ranking,
			notifications
		};
		res.status(200).send(data);
	} else {
		res.status(401).send();
	}
});

app.get("/api/logout", (req, res) => {
	req.session.destroy(err => {
		if (err) return next(err);

		req.logout();

		res.sendStatus(200);
		console.log("req", req.session, req.user);
	});
});

app.post("/api/login", (req, res, next) => {
	passport.authenticate("local", function(err, user, info) {
		if (err) {
			return;
		}
		if (!user) {
			res.status(401).send(info.message);
			return;
		}
		req.login(user, function(err) {
			if (err) {
				return next(err);
			}
			const {
				friends,
				activeGames,
				username,
				ranking,
				notifications
			} = user;
			const data = {
				friends,
				activeGames,
				username,
				ranking,
				notifications
			};
			return res.status(200).send(data);
		});
	})(req, res, next);
});

app.post("/api/register", (req, res, next) => {
	const { username, password } = req.body;
	User.create({ username, password })
		.then(user => {
			console.log(`created user ${user}`);
		})
		.catch(err => {
			console.log(`Cannot create user with error ${err.name}`);
			if (err.name === "ValidationError") {
				res.status(400).send("Username is already taken");
			}
		});
});
