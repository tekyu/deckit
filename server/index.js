const express = require("express");
const app = express();

const server = require("http").createServer();
const io = require("socket.io")(server);
const port = 5000;
server.listen(port, () => console.log(`Server listening on port ${port}`));

const chalk = require('chalk');

const UUID = require("node-uuid");
const shortID = require("shortid");
const randomColor = require("random-color");

// const memu = require('./src/utils/memory-usage');

//check cards url
const cards = require("./src/cards/cards");
const deck = cards.cards;
const roomLimit = 10;
const waitingRoom = "wtngrm";

io.deckitRooms = {
  public: {},
  private: {}
};

/**
 * PROMISES?
 */

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
        resolve({ changed: false, room: io.deckitRooms.private[data.id] });
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
 * @param {String} id 
 * @returns {Promise} Promise object with available rooms on resolve and error on reject
 */
const removeRoomFromPool = id => {
  console.log("[removeRoomFromPool]", id, io.sockets.adapter.rooms);
  return new Promise((resolve, reject) => {
    if (!io.sockets.adapter.rooms[id]) {
      // io.deckitRooms.private[id] = undefined;
      io.deckitRooms.public[id] = undefined;

      io.deckitRooms.public = Object.keys(io.deckitRooms.public).reduce(
        (total, room) => {
          if (io.deckitRooms.public[room]) {
            total[room] = io.deckitRooms.public[room];
          }
          return total;
          console.log("total", total, io.deckitRooms.public[room]);
        },
        {}
      );
      console.log("[removeRoomFromPool] resolve", io.deckitRooms);
      resolve(io.deckitRooms);
    } else {
      console.log("[removeRoomFromPool] reject", id);
      reject("No room");
    }
  });
};

/**
 * Finds room by given id
 * @param {String} id id of the room
 * @returns {Promise} Promise object with room object on resolve and id of room on reject 
 */
const findServer = id => {
  console.log("[findServer]", id, io.deckitRooms.public);
  return new Promise((resolve, reject) => {
    if (io.deckitRooms.private[id]) {
      console.log("[findServer] found private room with id", id);
      resolve(io.deckitRooms.private[id]);
    } else if (io.deckitRooms.public[id]) {
      console.log("[findServer] found public room with id", id);
      resolve(io.deckitRooms.public[id]);
    } else {
      console.log("[findServer] reject", id);
      reject(id);
    }
  });
};

/**
 * Remove player from room
 * @param {String} room Id of room
 * @param {String} id Id of player to remove
 * @returns {Promise} Promise with room object on both resolve and reject
 */
const removeFromRoom = (room, id) => {
  return new Promise((resolve, reject) => {
    console.log("[removeFromRoom]", room, id);
    try {
      if (!room) {
        let connectedPlayers =
          io.sockets.adapter.rooms[waitingRoom].playersConnected;
        console.log("[removeFromRoom] waitingRoom", connectedPlayers);
        connectedPlayers = connectedPlayers.filter(player => {
          return player.id !== id;
        });
        io.sockets.adapter.rooms[
          waitingRoom
        ].playersConnected = connectedPlayers;
        console.log("[removeFromRoom] waitingRoom FILTERED", connectedPlayers);
        resolve(io.sockets.adapter.rooms[waitingRoom]);
      } else {
        findServer(room)
          .then(room => {
            let connectedPlayers = room.playersConnected;
            console.log("[removeFromRoom] BEFORE LOOP", id, connectedPlayers);
            connectedPlayers = connectedPlayers.filter(player => {
              console.log("[removeFromRoom] LOOP", player.id, id);
              return player.id !== id;
            });
            room.playersConnected = connectedPlayers;
            console.log(
              "[removeFromRoom] after findServer and filter",
              room,
              io.deckitRooms.public[room.id]
            );
            resolve(room);
          })
          .catch(rej => {
            return reject(room);
          });
      }
    } catch (err) {
      reject(room);
    }
  });
};

io.on("connection", socket => {
  // socket.uuid = uuid();
  socket.gameProperties = {};
  socket.deckitRooms = [];
  // socket.on('playersInWaitingRoom', () => {
  //   socket.emit('playersInWaitingRoom',io.sockets.adapter.rooms[waitingRoom].playersConnected);
  // });

  /**
   * WAITING ROOM
   */
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

  socket.on("createServer", data => {
    let _color = randomColor(0.3, 0.99).hexString();
    socket.color = _color;
    socket.progress = 0;
    data.id = shortID.generate();
    data.playersConnected = [];
    data.playersConnected.push({
      id: socket.id,
      uuid: socket.uuid,
      nickname: socket.nickname,
      gameProperties: socket.gameProperties,
      status: false,
      color: _color,
      progress:0,
      picking:false,
      pickedCard: null,
    });
    data.waiting = true;
    data.allReady = false;
    data.started = false;
    data.paused = false;
    data.ended = false;
    data.full = false;
    data.state = null;
    data.stage = null;
    data.initialDeck = null;
    data.hint = null;
    data.hintCard = null;

    socket.join(data.id);
    socket.deckitRooms.push(data.id);

    addRoomToPool(data).then(res => {
      if (res.changed) {
        io.in(waitingRoom).emit("updatedServers", res.rooms);
        console.log(chalk.bgBlue("[emitting] updatedServers 1"), res.rooms);
      }
      socket.emit("roomCreated");
      console.log(chalk.bgBlue("[emitting] roomCreated"));
      io.in(data.id).emit("updateRoom", res.room);
      console.log(chalk.bgBlue("[emitting] updateRoom"), res.room);
    });

    // joinedToServer
    // io.in(data.id).emit('updatePlayers',)
    // socket.emit('joinedToServer',data);
    // console.log('[emiting] joinedToServer',data);

    // socket
    //   .to(data.id)
    //   .emit(
    //     "updateRoomInfo",
    //     io.sockets.adapter.rooms[data.id].playersConnected
    //   );
    // console.log("[emiting] waitingForPlayers", io.sockets.adapter.rooms[waitingRoom].playersConnected);
  });

  console.log(chalk.green(`Client connected with socket id ${socket.id}`));

  socket.on("readyToWait", () => {
    console.log(chalk.bgGreen("[receiving] readyToWait"));
    socket.emit(
      "playersInWaitingRoom",
      io.sockets.adapter.rooms[waitingRoom].playersConnected
    );
    console.log(chalk.bgBlue(
      "[emitting] playersInWaitingRoom"),
      io.sockets.adapter.rooms[waitingRoom].playersConnected
    );
    socket.emit("updatedServers", io.deckitRooms.public);
    console.log(chalk.bgBlue("[emitting] updatedServers 2"), io.deckitRooms.public);
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
    console.log(chalk.bgBlue("[emitting] playersInWaitingRoom [on] getUUID"), {
      uuid: socket.uuid,
      nickname: socket.nickname,
      gameProperties: socket.gameProperties
    });

    // socket.to(waitingRoom).emit('newPlayer',{id:socket.id,uuid:socket.uuid,nickname:nickname});
  });

  /**
   * @param {String} id id of the server
   */
  socket.on("joinServer", id => {
    console.log(chalk.bgGreen("[receiving] joinServer"), id);
    let _color = randomColor(0.3, 0.99).hexString();
    socket.color = _color;
    socket.progress = 0;
    findServer(id).then(room => {
      if (room.size !== room.playersConnected) {
        socket.join(id);
        socket.deckitRooms.push(id);
        room.playersConnected.push({
          id: socket.id,
          uuid: socket.uuid,
          nickname: socket.nickname,
          gameProperties: socket.gameProperties,
          status: false,
          color: _color,
          progress:0,
          picking:false,
          pickedCard: null,
        });
        socket.emit("roomJoined", room);
        console.log(chalk.bgBlue("[emitting] roomJoined"));
        io.in(id).emit("updateRoom", room);
        console.log(chalk.bgBlue("[emitting] updateRoom"), room);
      } else {
        socket.emit("roomFull");
        console.log(chalk.bgBlue("[emitting] roomFull"));
      }

      io.in(waitingRoom).emit("updatedServers", io.deckitRooms.public);
      console.log(chalk.bgBlue("[emitting] updatedServers 1"), io.deckitRooms.public);
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
        io.in(waitingRoom).emit("playersInWaitingRoom", res.playersConnected);
        console.log(chalk.bgBlue("[emitting] playersInWaitingRoom"), res.playersConnected);
      });
    }
  });

  /**
   * Leave room by given id
   * @param {String} id Room id
   * @param {String} socketId Socket id
   */
  const leaveServer = (id, socketId) => {
    console.log("[leaveServer]", id);
    removeFromRoom(id, socketId)
      .then(res => {
        console.log("[leaveServer] then.removeFromRoom", res);
        io.in(id).emit("updateRoom", res);
        if (res.playersConnected.length === 0) {
          removeRoomFromPool(id).then(res2 => {
            console.log(
              chalk.bgBlue("[emitting] updatedServers [from] then.removeRoomFromPool"),
              res2.public,
              "deckitRooms",
              io.deckitRooms.public
            );
            io.in(waitingRoom).emit("updatedServers", io.deckitRooms.public);
          });
        } else {
          io.in(waitingRoom).emit("updatedServers", io.deckitRooms.public);
        }
      })
      .catch(rej => {
        if (id !== waitingRoom) {
          removeRoomFromPool(rej)
            .then(res => {
              socket.emit("updatedServers", res.public);
              console.log(
                chalk.bgBlue("[emitting] updatedServers [from] removeRoomFromPool"),
                res.public
              );
            })
            .catch(rej => {
              console.log("[removeRoomFromPool] REJECT", rej);
            });
        }
      });
  };

  socket.on("changePlayerStatusInRoom", params => {
    console.log(
      chalk.bgGreen("[receiving] changePlayerStatusInRoom"),
      params.room,
      params.status
    );
    findServer(params.room).then(res => {
      // let _room = {...res};
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
          3000,
          res
        );
      };
      if (res.allReady) {
        tick();
      } else {
        clearTimeout(tick);
      }
      console.log("_____________________", _player);
      io.to(params.room).emit("updateRoom", res);
      console.log(
        chalk.bgBlue("[emitting] updateRoom"),
        res,
        io.deckitRooms.public[params.room]
      );
    });
  });

  /**
   * Start game after every player is ready
   * @param {Object} room Room object
   */
  startGame = room => {
    console.log('startGame');
    distributeCards(room).then(res=>{
      console.log('then.distributeCards',res.playersConnected);
      res.round = 0;
      res.hinter = res.playersConnected[room.round].id;
      res.stage = 'hintable';
      io.in(res.id).emit("updateRoom", res);
      console.log(
        chalk.bgBlue("[emitting] updateRoom on setTimeout"),
        res,
      );  
      });
  };

/**
 * Distributing initial cards to every connected player
 * @param {Object} room Room object
 * @returns {Object} Room object 
 */
  const distributeCards = room => {
    return new Promise((resolve,reject) => {
      room.playersConnected.forEach(player=>{
        let _deck = [];
        while (_deck.length < 5) {
          if (room.initialCards.length > 0) {
            let rand = Math.floor(Math.random() * room.initialCards.length);
            let t = room.initialCards[rand];
            let el = _deck.filter(function(el) {
              return el.id === t.id;
            });
  
            if (!el.length) {
              _deck.push(t);
              room.initialCards.splice(rand, 1);
            }
          } else {
            break;
          }
        }
        player.deck = _deck;
      });
      resolve(room);
    });
  };

  socket.on('sendHint',data=>{
    console.log(chalk.bgGreen('[receiving] sendHint'),data);
    findServer(data.room).then(room=>{
      room.hint = data.hint;
      room.hintCard = data.hintCard;
      room.stage = 'pickable';
      io.in(data.id).emit("updateRoom", room);
      console.log(chalk.bgBlue("[emitting] updateRoom"), room);
    });
  });

  socket.on('sendPickedCard',data=>{
    findServer(data.room).then(room=>{
      // room.stage = 
    });
  });


  /**
   * CHAT
   */

  socket.on("messageSentFromClient", (room, msg) => {
    console.log(chalk.bgGreen("[receiving] messageSentFromClient"), room, msg);
    if (!room) {
      room = waitingRoom;
    }
    socket
      .to(room)
      .emit("messageSentToRoom", {
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
