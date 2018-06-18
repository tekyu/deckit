const express = require("express");
const app = express();
const util = require("util");
const server = require("http").createServer();
const io = require("socket.io")(server);
const port = 3011;
server.listen(port, () => console.log(`Server listening on port ${port}`));
// app.get('/', function(req, res){
// 	res.sendFile(__dirname + '/index.html');
// });
const Player = require("./src/models/Player");

const chalk = require("chalk");

const UUID = require("node-uuid");
const shortID = require("shortid");
const randomColor = require("random-color");

// const memu = require('./src/utils/memory-usage');

//check cards url
const cards = require("./src/cards/cards");
const deck = cards.cards;
const roomLimit = 7;
const waitingRoom = "wtngrm";

io.deckitRooms = {
    public: {},
    private: {}
};

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

/**
 * Remove room from available rooms
 * @param {String} id Id of a room
 * @returns {Promise} Promise object with available rooms on resolve and error on reject
 */
const removeRoomFromPool = id => {
    return new Promise((resolve, reject) => {
        if (io.sockets.adapter.rooms[id]) {
            reject({
                id: id,
                msg: "Room of given ID does not exist in game"
            });
        }

        const typeOfRoom = (() => {
            if (io.deckitRooms.private[id]) {
                return "private";
            } else if (io.deckitRooms.public[id]) {
                return "public";
            } else {
                reject({
                    id: id,
                    msg: "Room of given ID does not exist in game"
                });
            }
        })();
        io.deckitRooms[typeOfRoom] = Object.keys(
            io.deckitRooms[typeOfRoom]
        ).reduce((total, room) => {
            if (io.deckitRooms[typeOfRoom][room].id !== id) {
                total[room] = io.deckitRooms[typeOfRoom][room];
            }
            return total;
        }, {});
        resolve(io.deckitRooms);
    });
};

/**
 * Finds room by given id
 * @param {String} id id of the room
 * @returns {Promise} Promise object with room object on resolve and id of room on reject
 */
const findServer = id => {
    return new Promise((resolve, reject) => {
        if (io.deckitRooms.private[id]) {
            resolve(io.deckitRooms.private[id]);
        } else if (io.deckitRooms.public[id]) {
            resolve(io.deckitRooms.public[id]);
        } else {
            reject(id);
        }
    });
};

/**
 * Remove player from room
 * @param {String} room Id of room (null if room is waiting room)
 * @param {String} id Id of player to remove
 * @returns {Promise} Promise with room object on both resolve and reject
 */
const removeFromRoom = (room, id) => {
    return new Promise((resolve, reject) => {
        try {
            if (!room) {
                const connectedPlayers = io.sockets.adapter.rooms[
                    waitingRoom
                ].playersConnected.filter(player => {
                    return player.id !== id;
                });

                io.sockets.adapter.rooms[
                    waitingRoom
                ].playersConnected = connectedPlayers;
                resolve(io.sockets.adapter.rooms[waitingRoom]);
            } else {
                findServer(room)
                    .then(room => {
                        room.playersConnected = room.playersConnected.filter(
                            player => {
                                return player.id !== id;
                            }
                        );
                        resolve(room);
                    })
                    .catch(rej => {
                        return reject(room, rej);
                    });
            }
        } catch (err) {
            reject(room, err);
        }
    });
};

/**
 * @description Emits "updateRoom" with most recent data
 * @param {String} roomId Id of a room
 * @param {Object} data Room object
 */
const updateRoom = (roomId, data) => {
    io.in(roomId).emit("updateRoom", data);
    console.log(chalk.bgBlue("[emitting] updateRoom"));
};

/**
 *
 * @param {Object} player
 * @param player.id Socket Id
 * @param player.uuid Generated UUID
 * @param player.nickname Chosen or default nickname
 */
const pushToWaitingRoom = player => {
    if (
        io.sockets.adapter.rooms[waitingRoom] &&
        !io.sockets.adapter.rooms[waitingRoom].playersConnected
    ) {
        io.sockets.adapter.rooms[waitingRoom].playersConnected = [];
    }
    io.sockets.adapter.rooms[waitingRoom].playersConnected.push({
        id: player.id,
        uuid: player.uuid,
        nickname: player.nickname
    });
};

io.on("connection", socket => {
    socket.uuid = UUID();
    socket.gameProperties = {};
    socket.deckitRooms = [];

    /**
     * @description Receiving event "createServer"
     * @param {Object} data Initial data of a room from form
     */
    socket.on("createServer", data => {
        const _color = randomColor(0.3, 0.99).hexString();
        socket.color = _color;
        socket.progress = 0;
        data.id = shortID.generate();
        data.playersConnected = [];
        // const player = new Player({
        //     id: socket.id,
        //     uuid: socket.uuid,
        //     nickname: socket.nickname,
        //     gameProperties: socket.gameProperties,
        //     color: _color
        // });
        data.playersConnected.push({
            id: socket.id,
            uuid: socket.uuid,
            nickname: socket.nickname,
            gameProperties: socket.gameProperties,
            status: false,
            color: _color,
            progress: 0,
            picked: false,
            pickedCard: null,
            score: 0,
            deck: []
        });
        data.waiting = true;
        data.allReady = false;
        data.started = false;
        data.paused = false;
        data.ended = false;
        data.full = false;
        data.state = null;
        data.stage = null;
        data.initialCards = [];
        data.hint = null;
        data.hintCard = null;
        data.pickedCards = null;
        data.maxPoints = data.maxPoints;
        data.mode = data.private ? "private" : "public";
        data.winners = [];
        data.owner = socket.id;
        data.deckSize = 5;
        data.round = 0;

        socket.join(data.id);
        socket.deckitRooms.push(data.id);

        addRoomToPool(data)
            .then(res => {
                if (res.changed) {
                    io.in(waitingRoom).emit("updatedServers", res.rooms);
                    console.log(
                        chalk.bgBlue("[emitting] updatedServers 1"),
                        res.rooms
                    );
                }
                socket.emit("roomCreated");
                console.log(chalk.bgBlue("[emitting] roomCreated"));
                io.in(data.id).emit("updateRoom", res.room);
                console.log(chalk.bgBlue("[emitting] updateRoom"));
            })
            .catch(rej => {
                throw "Cannot add room to pool of existing rooms" + rej;
            });
    });

    console.log(chalk.green(`Client connected with socket id ${socket.id}`));

    socket.on("readyToWait", () => {
        console.log(chalk.bgGreen("[receiving] readyToWait"));
        socket.emit(
            "playersInWaitingRoom",
            io.sockets.adapter.rooms[waitingRoom].playersConnected
        );
        console.log(
            chalk.bgBlue("[emitting] playersInWaitingRoom"),
            io.sockets.adapter.rooms[waitingRoom].playersConnected
        );
        socket.emit("updatedServers", io.deckitRooms.public);
        console.log(
            chalk.bgBlue("[emitting] updatedServers 2"),
            io.deckitRooms.public
        );
    });

    socket.on("getUUID", nickname => {
        console.log(chalk.bgGreen("[receiving] getUUID"), nickname);
        socket.uuid = UUID();
        socket.nickname = nickname;
        socket.emit("playerConnected", {
            uuid: socket.uuid,
            nickname: socket.nickname,
            gameProperties: socket.gameProperties
        });
        console.log(chalk.bgBlue("[emitting] playerConnected"), {
            uuid: socket.uuid,
            nickname: socket.nickname,
            gameProperties: socket.gameProperties
        });
        socket.join(waitingRoom);
        socket.deckitRooms.push(waitingRoom);
        pushToWaitingRoom({
            id: socket.id,
            uuid: socket.uuid,
            nickname: socket.nickname
        });

        socket
            .to(waitingRoom)
            .emit(
                "playersInWaitingRoom",
                io.sockets.adapter.rooms[waitingRoom].playersConnected
            );
        console.log(
            chalk.bgBlue("[emitting] playersInWaitingRoom [on] getUUID"),
            {
                uuid: socket.uuid,
                nickname: socket.nickname,
                gameProperties: socket.gameProperties
            }
        );
    });

    /**
     * @description Receiving event "joinServer"
     * @param {String} id id of the server
     */
    socket.on("joinServer", id => {
        console.log(chalk.bgGreen("[receiving] joinServer"), id);
        let _color = randomColor(0.3, 0.99).hexString();
        socket.color = _color;
        socket.progress = 0;
        findServer(id).then(room => {
            if (room.started) {
                socket.emit("gameStarted");
                console.log(chalk.bgBlue("[emitting] gameStarted"));
            } else if (room.size > room.playersConnected.length) {
                socket.join(id);
                socket.deckitRooms.push(id);
                room.playersConnected.push({
                    id: socket.id,
                    uuid: socket.uuid,
                    nickname: socket.nickname,
                    gameProperties: socket.gameProperties,
                    status: false,
                    color: _color,
                    progress: 0,
                    picked: false,
                    pickedCard: null,
                    score: 0,
                    deck: []
                });
                socket.emit("roomJoined", room);
                console.log(chalk.bgBlue("[emitting] roomJoined"));
                io.in(id).emit("updateRoom", room);
                console.log(chalk.bgBlue("[emitting] updateRoom"));
                io.in(waitingRoom).emit(
                    "updatedServers",
                    io.deckitRooms.public
                );
                console.log(
                    chalk.bgBlue("[emitting] updatedServers 1"),
                    io.deckitRooms.public
                );
            } else {
                socket.emit("roomFull");
                console.log(chalk.bgBlue("[emitting] roomFull"));
            }
        });
    });

    /**
     * WAITING ROOM END
     */

    socket.on("leaveServer", id => {
        console.log(chalk.bgGreen("[receiving] leaveServer"), id);
        if (id) {
            socket.leave(id);
            socket.deckitRooms = socket.deckitRooms.filter(room => {
                room !== id;
            });
            leaveServer(id, socket.id);
        } else {
            removeFromRoom(null, socket.id).then(res => {
                io.in(waitingRoom).emit(
                    "playersInWaitingRoom",
                    res.playersConnected
                );
                console.log(
                    chalk.bgBlue("[emitting] playersInWaitingRoom"),
                    res.playersConnected
                );
            });
        }
    });

    /**
     * Leave room by given id
     * @param {String} id Room id
     * @param {String} socketId Socket id
     */
    const leaveServer = (id, socketId) => {
        removeFromRoom(id, socketId)
            .then(res => {
                io.in(id).emit("updateRoom", res);
                console.log(chalk.bgBlue("[emitting] updateRoom"));

                if (res.playersConnected.length === 0) {
                    removeRoomFromPool(id)
                        .then(res2 => {
                            io.in(waitingRoom).emit(
                                "updatedServers",
                                io.deckitRooms.public
                            );
                            console.log(
                                chalk.bgBlue("[emitting] updatedServers")
                            );
                        })
                        .catch(rej => {
                            throw "Cannot remove room from pool of existing rooms";
                        });
                } else {
                    io.in(waitingRoom).emit(
                        "updatedServers",
                        io.deckitRooms.public
                    );
                    console.log(chalk.bgBlue("[emitting] updatedServers"));
                }
            })
            .catch(rej => {
                if (id !== waitingRoom) {
                    removeRoomFromPool(rej)
                        .then(res => {
                            socket.emit("updatedServers", res.public);
                            console.log(
                                chalk.bgBlue("[emitting] updatedServers")
                            );
                        })
                        .catch(rej => {
                            throw "Cannot remove room from pool of existing rooms";
                        });
                }
            });
    };

    socket.on("changePlayerStatusInRoom", params => {
        console.log(
            chalk.bgGreen("[receiving] changePlayerStatusInRoom"),
            params.status
        );
        findServer(params.room).then(res => {
            let _player = res.playersConnected.filter(player => {
                return player.id === socket.id;
            })[0];
            _player.status = params.status;
            let newReadyStatus =
                res.playersConnected.filter(player => {
                    return !player.status;
                }).length > 0
                    ? false
                    : true;
            res.allReady = newReadyStatus;
            let tick = () => {
                setTimeout(
                    room => {
                        room.started = true;
                        room.waiting = false;
                        room.initialCards = [...deck];
                        startGame(room);
                    },
                    1000,
                    res
                );
            };
            if (res.allReady) {
                tick();
            } else {
                clearTimeout(tick);
            }
            io.to(params.room).emit("updateRoom", res);
            console.log(chalk.bgBlue("[emitting] updateRoom"));
        });
    });

    /**
     * Start game after every player is ready
     * @param {Object} room Room object
     */
    startGame = room => {
        room.deckSize = (() => {
            if (room.playersConnected.length > 3) {
                return 5;
            } else {
                // return 7;
                return 5;
            }
        })();
        distributeCards(room)
            .then(res => {
                res.round = 0;
                res.hinter = res.playersConnected[room.round].id;
                res.hint = null;
                res.stage = "hintable";
                io.in(res.id).emit("updateRoom", res);
                console.log(
                    chalk.bgBlue("[emitting] updateRoom on setTimeout")
                );
            })
            .catch(rej => {
                throw "Cannot distribute cards";
            });
    };

    /**
     * @description Get card from room.initialCards based on a random number from initialCards length
     * @param {Array} cards room.initialCards
     * @returns {Object} Object of _randomCard: {Object} and _randomIndex: {Number}
     */
    const getRandomCard = cards => {
        let randomNumber = Math.floor(Math.random() * cards.length);

        return { _randomCard: cards[randomNumber], _randomIndex: randomNumber };
    };

    /**
     * @description Checks if random draw card already exist in player's deck
     * @param {Object} randomCard Single card object
     * @param {Array} deck Player's deck
     * @returns {Boolean} Boolean of if is duplicate
     */
    const checkForDuplicate = (randomCard, deck) => {
        return deck.filter(function(card) {
            return card.id === randomCard.id;
        }).length > 0
            ? true
            : false;
    };

    /**
     * @description Distributing initial cards to every connected player
     * @param {Object} room Room object
     * @returns {Object} Room object
     */
    const distributeCards = room => {
        return new Promise((resolve, reject) => {
            room = distributeCards2(room);
            if (room) {
                resolve(room);
            } else {
                reject(room);
            }
        });
    };

    socket.on("sendHint", data => {
        console.log(chalk.bgGreen("[receiving] sendHint"), data);
        findServer(data.room).then(room => {
            room.hint = data.hint;
            room.hintCard = data.selectedCard;
            room.stage = "pickable";

            const player = findPlayer(room.playersConnected, socket.id);
            player.deck = player.deck.filter(card => {
                return card.id !== data.selectedCard.id;
            });
            room.playersConnected = room.playersConnected.map(_player => {
                return _player.id === player.id ? player : _player;
            });
            io.in(room.id).emit("updateRoom", room);
            console.log(chalk.bgBlue("[emitting] updateRoom"));
        });
    });

    socket.on("sendPickedCard", data => {
        console.log(chalk.bgGreen("[receiving] sendPickedCard"), data);
        findServer(data.room).then(room => {
            let player = room.playersConnected.filter(_player => {
                return _player.id === socket.id;
            })[0];

            player.pickedCard = data.pickedCard;
            player.picked = true;

            player.deck = player.deck.filter(card => {
                return card.id !== data.pickedCard.id;
            });
            room.playersConnected = room.playersConnected.map(_player => {
                return _player.id === player.id ? player : _player;
            });
            if (
                room.stage === "pickable" &&
                hasAllPlayersPicked(room.playersConnected, room.hinter)
            ) {
                room.pickedCards = getPickedCards(room);
                room.playersConnected = resetPlayersPicked(
                    room.playersConnected
                );
                room.stage = "roundable";
            }
            updateRoom(room.id, room);
        });
    });

    socket.on("sendRoundCard", data => {
        console.log(chalk.bgGreen("[receiving] sendRoundCard"), data);
        findServer(data.room)
            .then(room => {
                let player = room.playersConnected.filter(_player => {
                    return _player.id === socket.id;
                })[0];

                player.pickedCard = data.pickedCard;
                player.picked = true;

                room.playersConnected = room.playersConnected.map(_player => {
                    return _player.id === player.id ? player : _player;
                });

                if (
                    room.stage === "roundable" &&
                    hasAllPlayersPicked(room.playersConnected, room.hinter)
                ) {
                    room.stage = "summingRound";

                    room.roundCards = getRoundCards(room);
                    room.playersConnected = calculateRoundPoints(room);

                    room.winners = room.playersConnected.filter(player => {
                        return player.score >= room.maxPoints;
                    });
                    if (room.winners.length > 0) {
                        room.ended = true;
                        room.stage = "winner";
                        io.in(room.id).emit("gameover", room.winners);
                        console.log(
                            chalk.bgBlue("[emitting] gameover"),
                            room.winners
                        );
                        updateRoom(room.id, room);
                    } else {
                        room.round = room.round + 1;
                        room.hinter = getNextHinter(room);
                        room.hint = null;
                        room.playersConnected = resetPlayersPicked(
                            room.playersConnected
                        );
                        room = distributeCards2(room);
                        room.roundCards = null;
                        room.pickedCards = null;
                        room.stage = "hintable";
                        updateRoom(room.id, room);
                    }
                } else {
                    updateRoom(room.id, room);
                }
            })
            .catch(res => {
                throw "Room not found" + res;
            });
    });

    /**
     * @description Distribute cards to each player untill deck is full
     * @param {Object} room Room object
     * @returns {Object} Room object
     */
    const distributeCards2 = room => {
        room.playersConnected = room.playersConnected.map(player => {
            while (player.deck.length < room.deckSize) {
                if (!room.initialCards.length > 0) {
                    break;
                }

                let { _randomCard, _randomIndex } = getRandomCard(
                    room.initialCards
                );
                if (!checkForDuplicate(_randomCard, player.deck)) {
                    player.deck = [...player.deck, _randomCard];
                    room.initialCards.splice(_randomIndex, 1);
                }
            }
            return player;
        });
        return room;
    };

    /**
     * @description Get picked cards from users
     * @param {Object} room Room object
     * @returns {Object} Object of picked cards
     */
    const getPickedCards = room => {
        return room.playersConnected.map(player => {
            return {
                id: player.id,
                card:
                    room.hinter === player.id
                        ? room.hintCard
                        : player.pickedCard
            };
        });
    };

    /**
     * @description Get picked cards from users for stage 'roundable'
     * @param {Object} room Room object
     * @returns {Object} Object of picked cards
     */
    const getRoundCards = room => {
        return room.playersConnected.reduce((total, player) => {
            if (player.id !== room.hinter) {
                total.push({
                    id: player.id,
                    card: player.pickedCard
                });
            }
            return total;
        }, []);
    };

    /**
     * @description Checks if all players have picked their card according to hint
     * @param {Array} players Array of players in the room
     * @param {String} hinter  id of a player who gave a hint
     * @returns {Boolean} True if all have picked cards
     */
    const hasAllPlayersPicked = (players, hinter) => {
        return players.filter(player => {
            return player.picked || player.id === hinter;
        }).length === players.length
            ? true
            : false;
    };

    /**
     * @description Change each player's property picked to false
     * @param {Object} players Array of connected players
     * @returns {Object} Object of connected players
     */
    const resetPlayersPicked = players => {
        return players.map(player => {
            return {
                ...player,
                picked: false,
                pickedCard: null
            };
        });
    };

    /**
     * @description Determine next hinter. Starts 2nd position in the array, because first hinter is determined on the start
     * @param {Object} room Room object
     * @returns {String} Id of a new hinter
     */
    const getNextHinter = room => {
        try {
            return room.playersConnected[
                room.round % room.playersConnected.length
            ].id;
        } catch (err) {
            throw "Cannot determine new hinter" + err;
        }
    };

    /**
     * @description Calculate round points by rules
     * @param {Object} room Room object
     * @returns {Object} Room.playersConnected
     */
    const calculateRoundPoints = room => {
        let hintedCard = room.hintCard;
        let hinter = room.hinter;

        /**
         * RULES
         * If all players find the hinter card
         * * hinter: 0pts, others: 2pts
         * If no players find the hinter card
         * * hinter: 0pts, others: 2pts + bonus per vote
         * If at least one player, but not all have found the hinter card
         * * hinter: 3pts, players who found: 3pts, + bonus per vote
         */

        // if all players find the hinter card
        let cardsEqualToHinterCard = room.roundCards.filter(card => {
            return card.card === hintedCard.id;
        });

        if (cardsEqualToHinterCard.length === room.roundCards.length) {
            // all players have found a hint card
            // hinter: 0pts, others: 2pts
            room.playersConnected = room.playersConnected.map(player => {
                player.score =
                    player.id !== hinter ? +(player.score + 2) : player.score;
                return player;
            });
            console.log(
                chalk.bgMagenta(
                    "all players have found a hint card, hinter: 0pts, others: 2pts"
                ),
                room.playersConnected
            );
            // return room;
        } else if (cardsEqualToHinterCard.length === 0) {
            // no player have found a hint card
            // hinter: 0pts, others: 2pts + bonus per vote
            const _tempRoom = { ...room };
            _tempRoom.playersConnected = _tempRoom.playersConnected.map(
                player => {
                    player.score =
                        player.id !== hinter
                            ? +(player.score + 2)
                            : player.score;
                    return player;
                }
            );
            // bonus
            _tempRoom.roundCards.forEach(card => {
                const ownerOfTheCard = findPlayerByCardId(
                    _tempRoom.playersConnected,
                    card.card
                );
                console.log(
                    "ownerofhtecard",
                    _tempRoom.roundCards,
                    ownerOfTheCard,
                    card
                );
                if (ownerOfTheCard.id !== hinter) {
                    ownerOfTheCard.score = ownerOfTheCard.score + 1;
                }
                if (ownerOfTheCard.id !== hinter) {
                    ownerOfTheCard.score = +(ownerOfTheCard.score + 1);
                }
                console.log(
                    chalk.bgYellow("temproom?"),
                    _tempRoom.playersConnected,
                    ownerOfTheCard
                );
                _tempRoom.playersConnected = updatePlayer(
                    _tempRoom.playersConnected,
                    ownerOfTheCard
                );
                room = { ...room, ..._tempRoom };
            });
            console.log(
                chalk.bgMagenta(
                    "no player have found a hint card, hinter: 0pts, others: 2pts + bonus 1pts ea."
                ),
                room.playersConnected
            );
        } else {
            const _tempRoom = { ...room };
            console.log(
                "ROOMKdsf___________________________________",
                _tempRoom.playersConnected
            );
            _tempRoom.roundCards.forEach(card => {
                const ownerOfTheCard = findPlayerByCardId(
                    _tempRoom.playersConnected,
                    card.card
                );
                console.log(
                    "ownerofhtecard2",
                    _tempRoom.playersConnected,
                    ownerOfTheCard,
                    card
                );
                if (ownerOfTheCard.id !== hinter) {
                    ownerOfTheCard.score = ownerOfTheCard.score + 1;
                }
                console.log(
                    chalk.bgYellow("temproom?"),
                    _tempRoom.playersConnected,
                    ownerOfTheCard
                );

                _tempRoom.playersConnected = updatePlayer(
                    _tempRoom.playersConnected,
                    ownerOfTheCard
                );
                room = { ...room, ..._tempRoom };
            });
            console.log(
                chalk.bgMagenta(
                    "normal round score, hinter: 3pts, players who found: 3pts + bonus 1pts ea., others: bonus 1pts ea."
                ),
                room.playersConnected
            );
        }
        return room.playersConnected;
    };

    /**
     * @description Finds and updates player inside room
     * @param {Array} players room.playersConnected
     * @param {Object} player single player
     * @returns {Array} Updated room.playersConnected
     */
    const updatePlayer = (players, player) => {
        console.log("updateplayer", players, player);
        const newPlayers = players.map(_player => {
            console.log(
                chalk.bgBlue("loop"),
                player.id,
                _player.id,
                player.id === _player.id,
                player.id === _player.id ? player : _player
            );
            if (player.id === _player.id) {
                console.log("JEST KURWA TKAIE SAMO", player);
            } else {
                console.log("NIE JEST KURWA TKAIE SAMO", _player);
            }
            return player.id === _player.id ? player : _player;
        });
        console.log(chalk.bgCyan("updateplayer"), players, newPlayers);
        return newPlayers;
    };

    /**
     * @description Find player by his roundCard.id
     * @param {Array} players Array of room.connectedPlayers
     * @param {String} cardId Id of a selected card in stage 'roundable'
     */
    const findPlayerByCardId = (players, cardId) => {
        console.log(chalk.bgMagenta("ddddddd"), players, cardId);
        const foundPlayer = players.filter(player => {
            return player.pickedCard === cardId;
        });
        return foundPlayer.length > 0 ? foundPlayer[0] : null;
    };

    /**
     * @description Find player by his id
     * @param {Array} players Array of room.connectedPlayers
     * @param {String} id Id of a player
     * @returns Player object or null
     */
    const findPlayer = (players, id) => {
        const _player = players.filter(player => {
            return player.id === id;
        });
        return _player ? _player[0] : null;
    };

    /**
     * CHAT
     */

    /**
     * @description Receive event when someone send message
     * @param {String} room Id of a room
     * @param {String} msg Message string
     */
    socket.on("messageSentFromClient", (room, msg) => {
        console.log(
            chalk.bgGreen("[receiving] messageSentFromClient"),
            room,
            msg
        );
        if (!room) {
            room = waitingRoom;
        }
        socket.to(room).emit("messageSentToRoom", {
            msg: msg,
            id: socket.id,
            nickname: socket.nickname,
            color: socket.color
        });
        console.log(chalk.bgBlue("[emitting] messageSentToRoom"), {
            msg: msg,
            id: socket.id,
            nickname: socket.nickname,
            color: socket.color
        });
    });

    socket.on("disconnect", () => {
        console.log(
            chalk.red("Socket disconnected with id"),
            socket.id,
            socket.deckitRooms,
            io.deckitRooms
        );
        socket.deckitRooms.forEach(room => {
            leaveServer(room, socket.id);
        });
        // io
        // .in(waitingRoom)
        // .emit(
        //   "playersInWaitingRoom",
        //   io.sockets.adapter.rooms[waitingRoom].playersConnected
        // );
    });
});
