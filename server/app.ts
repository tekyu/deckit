require("dotenv").config();
/* SERVER IMPORTS */
import express from "express";
import http from "http";
import socketIo from "socket.io";
import cors from "cors";
import bodyParser from "body-parser";
import expressSession from "express-session";
/* MONGO RELATED IMPORTS */

// SHOULD BE IMPORTED AS A MODULE
import mongoose from "mongoose";

/* UTILITY IMPORTS */
import chalk from "chalk";
import memu from "./src/utils/memory-usage";
import morgan from "morgan";
/* PASSPORT IMPORTS */

// SHOULD BE IMPORTED AS A AUTH MODULE
import shortId from "shortid";
import passport from "passport";
import User from "./src/models/User";

// var silence = new User({ username: "Silence" });
// console.log("silence", silence);
const app = express();

const server = http.createServer();
const io = socketIo(server);
const port = process.env.PORT || 3011;

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
	expressSession({
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

/**
 * Adding room to pool with initial data of available servers
 * @param {Object} data Settings for room
 * @returns {Promise} Promise object with data to render in Waiting room on resolve and error on rejection
 */
const addRoomToPool = data => {
	return new Promise((resolve, reject) => {
		try {
			if (data.private) {
				io.deckitRooms.private[data.id] = data;
				resolve({
					changed: false,
					room: io.deckitRooms.private[data.id]
				});
			} else {
				io.deckitRooms.public[data.id] = data;
				resolve({
					rooms: io.deckitRooms.public,
					changed: true,
					room: io.deckitRooms.public[data.id]
				});
			}
		} catch (err) {
			reject(err);
		}
	});
};

io.gameRooms = {};

io.on("connection", socket => {
	const game = {
		id: "shortid",
		game: "deckit",
		public: false,
		password: "password",
		name: "Test name",
		owner: "mongoid",
		players: 4,
		maxPlayers: 10,
		playersList: [], // only id's
		stage: "waiting", // waiting | ready | ingame | paused | completed
		gameOptions: {
			decks: [],
			deckSize: 5,
			state: "waiting", // waiting | paused | hinter | picking | scorecheck | pointscheck | dispensecards,
			hintInRound: "Hint",
			hintCardInRound: "kjhgfd",
			pickedCardsInRound: [],
			maxPoints: 64,
			winners: [],
			round: 0,
			players: [
				{
					id: "mongoid",
					nickname: "Nickname",
					color: "color",
					progress: 0,
					pickedCard: "id",
					score: 0,
					deck: [],
					status: "ready" // ready | waiting | inactive | problem
				}
			]
		}
	};

	// const getInitialGameRoom = data => {
	// 	return prepareInitialGameRoom(data);
	// };

	// const prepareInitialGameRoom = data => {
	// 	const { game, gameOptions } = data;
	// 	const gameroom = new Gameroom(data);
	// 	const initialGameOptions = prepareInitialGameOptions(game, gameOptions);
	// 	gameroom.gameOptions = initialGameOptions;
	// 	return gameroom;
	// };

	// const prepareInitialGameOptions = (game, options) => {
	// 	return (
	// 		gameMap.find(_game => {
	// 			return _game === game;
	// 		}).gameOptions || {}
	// 	);
	// };

	socket.on("createGame", data => {
		// const _color = randomColor(0.3, 0.99).hexString();

		// const game = getInitialGameRoom(data);
		socket.join(data.id);
		// socket.gameRooms.push(data.id);

		// addRoomToPool(data) // change to game
		// 	.then(res => {
		// 		if (res.changed) {
		// 			io.in(waitingRoom).emit("updatedServers", res.rooms);
		// 			console.log(
		// 				chalk.bgBlue("[emitting] updatedServers 1"),
		// 				res.rooms
		// 			);
		// 		}
		// 		socket.emit("roomCreated");
		// 		console.log(chalk.bgBlue("[emitting] roomCreated"));
		// 		io.in(data.id).emit("updateRoom", res.room);
		// 		console.log(chalk.bgBlue("[emitting] updateRoom"));
		// 	})
		// 	.catch(rej => {
		// 		throw "Cannot add room to pool of existing rooms" + rej;
		// 	});
	});
});
