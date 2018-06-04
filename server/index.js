const express = require("express");
const app = express();

const server = require("http").createServer();
const io = require("socket.io")(server);
const port = 5000;
server.listen(port, () => console.log(`Server listening on port ${port}`));

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
const addRoomToPool = data => {
  return new Promise((resolve, reject) => {
    try {
      if (data.private) {
        io.deckitRooms.private[data.id] = data;
        // io.deckitRooms.private.push(data);
        resolve({ changed: false, room: io.deckitRooms.private[data.id] });
      } else {
        io.deckitRooms.public[data.id] = data;
        // io.deckitRooms.public.push(data);
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
 * @param {String} id id of the room
 * @returns {Object} room object
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
 *
 * @param {String} room
 * @param {String} id
 * @returns {Object} room object
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
  const pushToWaitingRoom = player => {
    if (
      io.sockets.adapter.rooms[waitingRoom] &&
      !io.sockets.adapter.rooms[waitingRoom].playersConnected
    ) {
      io.sockets.adapter.rooms[waitingRoom].playersConnected = [];
    }
    io.sockets.adapter.rooms[waitingRoom].playersConnected.push({
      id: socket.id,
      uuid: socket.uuid,
      nickname: socket.nickname
    });
  };

  socket.on("createServer", data => {
    let _color = randomColor(0.3, 0.99).hexString();
    socket.color = _color;
    data.id = shortID.generate();
    data.playersConnected = [];
    data.playersConnected.push({
      id: socket.id,
      uuid: socket.uuid,
      nickname: socket.nickname,
      gameProperties: socket.gameProperties,
      status: false,
      color: _color
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

    socket.join(data.id);
    socket.deckitRooms.push(data.id);

    addRoomToPool(data).then(res => {
      if (res.changed) {
        io.in(waitingRoom).emit("updatedServers", res.rooms);
        console.log("[emiting] updatedServers 1", res.rooms);
      }
      socket.emit("roomCreated");
      console.log("[emiting] roomCreated");
      io.in(data.id).emit("updateRoom", res.room);
      console.log("[emiting] updateRoom", res.room);
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

  console.log(`Client connected with socket id ${socket.id}`);

  socket.on("readyToWait", () => {
    console.log("[receiving] readyToWait");
    socket.emit(
      "playersInWaitingRoom",
      io.sockets.adapter.rooms[waitingRoom].playersConnected
    );
    console.log(
      "[emitting] playersInWaitingRoom",
      io.sockets.adapter.rooms[waitingRoom].playersConnected
    );
    socket.emit("updatedServers", io.deckitRooms.public);
    console.log("[emiting] updatedServers 2", io.deckitRooms.public);
  });

  socket.on("getUUID", nickname => {
    console.log("[receiving] getUUID", nickname);
    socket.uuid = UUID();
    socket.nickname = nickname;
    socket.emit("playerConnected", {
      uuid: socket.uuid,
      nickname: socket.nickname,
      gameProperties: socket.gameProperties
    });
    console.log("[emitting] playerConnected", {
      uuid: socket.uuid,
      nickname: socket.nickname,
      gameProperties: socket.gameProperties
    });
    socket.join(waitingRoom);
    socket.deckitRooms.push(waitingRoom);
    // socket.to(waitingRoom).emit('newPlayer',{id:socket.id,nickname:nickname});
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
    console.log("[emitting] playersInWaitingRoom [on] getUUID", {
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
    console.log("[receiving] joinServer", id);
    let _color = randomColor(0.3, 0.99).hexString();
    socket.color = _color;
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
          color: _color
        });
        socket.emit("roomJoined", room);
        console.log("[emiting] roomJoined");
        io.in(id).emit("updateRoom", room);
        console.log("[emitting] updateRoom", room);
      } else {
        socket.emit("roomFull");
        console.log("[emiting] roomFull");
      }

      io.in(waitingRoom).emit("updatedServers", io.deckitRooms.public);
      console.log("[emiting] updatedServers 1", io.deckitRooms.public);
    });
  });

  /**
   * WAITING ROOM END
   */

  socket.on("leaveServer", id => {
    console.log("[receiving] leaveServer", id);
    if (id) {
      socket.leave(id);
      // socket.deckitRooms.push(data.id);
      socket.deckitRooms = socket.deckitRooms.filter(room => {
        room !== id;
      });
      // removeRoomFromPool(id).then(res => {
      //   socket.emit("updatedServers", res.public);
      //   console.log(
      //     "[emitting] updatedServers [from] removeRoomFromPool",
      //     res.public
      //   );
      // });
      leaveServer(id, socket.id);
    } else {
      removeFromRoom(null, socket.id).then(res => {
        io.in(waitingRoom).emit("playersInWaitingRoom", res.playersConnected);
        console.log("[emitting] playersInWaitingRoom", res.playersConnected);
        // io.sockets.adapter.rooms[waitingRoom].playersConnected
      });
    }
  });

  const leaveServer = (id, socketId) => {
    console.log("[leaveServer]", id);
    removeFromRoom(id, socketId)
      .then(res => {
        console.log("[leaveServer] then.removeFromRoom", res);
        io.in(id).emit("updateRoom", res);
        if (res.playersConnected.length === 0) {
          removeRoomFromPool(id).then(res2 => {
            console.log(
              "[emitting] updatedServers [from] then.removeRoomFromPool",
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
                "[emitting] updatedServers [from] removeRoomFromPool",
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
      "[receiving] changePlayerStatusInRoom",
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
            distributeCards(room);
            io.in(room.id).emit("updateRoom", room);
            console.log(
              "[emitting] updateRoom on setTimeout",
              room,
              io.deckitRooms.public[room.id]
            );
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
        "[emitting] updateRoom",
        res,
        io.deckitRooms.public[params.room]
      );
    });
  });

  distributeCards = room => {
    console.log("distributeCards()",room);
    // console.log('sendInitialCards',room);
        // for (client in clients_in_the_room.sockets) {
          room.playersConnected.forEach(player=>{
            console.log('for client in clients',player);
            let _deck = [];
            while (_deck.length < 5) {
              if (room.initialCards.length > 0) {
                var rand = Math.floor(Math.random() * room.initialCards.length);
                var t = room.initialCards[rand];
                var el = _deck.filter(function(el) {
                  return el.id === t.id;
                });
      
                if (!el.length) {
                  _deck.push(t);
                  room.initialCards.splice(rand, 1);
                }
              } else {
                console.log("no more cards");
                break;
              }
            }
            player.deck = _deck;
            console.log('client deck_______________',player);
      
            // try {
            //   // io.to(client).emit('deck', deck);
            // } catch (err) {
            //   console.log("error", err);
            // }
          });
          io.in(room.id).emit("updateRoom", room);
          console.log(
            "[emitting] updateRoom",
            room
          );

          console.log('DISTRIBUTE AFTER FOREACH',room.playersConnected);
    // var status = true;
    // var data = getPlayersInfo(socket.gameProperties.roomId);
    // var d = getPlayersInfo2(socket.gameProperties.roomId);

    // console.log('data new',data,'data old',d);
    // console.log('DATA KURWA',data,status);
    // io.in(socket.gameProperties.roomId).emit('startGame', status, data);

    // roundQueue(room, socket.gameProperties.round);
  };

  /**
   * CHAT
   */

  socket.on("messageSentFromClient", (room, msg) => {
    console.log("[receiving] messageSentFromClient", room, msg);
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
    console.log("[emitting] messageSentToRoom", {
      msg: msg,
      id: socket.id,
      nickname: socket.nickname,
      color: socket.color
    });
  });

  socket.on("disconnect", () => {
    console.log(
      "Socket disconnected with id",
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
