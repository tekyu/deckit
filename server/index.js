const express = require("express");
const app = express();

const server = require("http").createServer();
const io = require("socket.io")(server);
const port = 5000;
server.listen(port, () => console.log(`Server listening on port ${port}`));

const UUID = require("node-uuid");
const shortID = require("shortid");

// const memu = require('./src/utils/memory-usage');

//check cards url
const deck = require("./src/cards/cards");
const roomLimit = 10;
const waitingRoom = "wtngrm";

io.deckitRooms = [];

io.on("connection", socket => {
  // socket.uuid = uuid();
  socket.gameProperties = {};

  // socket.on('playersInWaitingRoom', () => {
  //   socket.emit('playersInWaitingRoom',io.sockets.adapter.rooms[waitingRoom].playersConnected);
  // });

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

  const removeFromWaitingRoom = id => {
    let waitingRoom = io.sockets.adapter.rooms[waitingRoom].playersConnected;

    waitingRoom = waitingRoom.filter(player => {
      return player.id !== id;
    });
  };

  socket.on("createServer", data => {
    data.id = shortID.generate();
    data.playersConnected = [];
    data.playersConnected.push({
      uuid: socket.uuid,
      nickname: socket.nickname,
      gameProperties: socket.gameProperties
    });

    socket.join(data.id);
    io.deckitRooms.push(data);

    if (!data.private) {
      io.in(waitingRoom).emit("updatedServers", io.deckitRooms);
    }
    console.log("[emiting] updatedServers", io.deckitRooms);
    // joinedToServer
    socket.emit('joinedToServer',data);
    console.log('[emiting] joinedToServer',data);

    socket
      .to(data.id)
      .emit(
        "updateRoomInfo",
        io.sockets.adapter.rooms[data.id].playersConnected
      );
    console.log("[emiting] waitingForPlayers", io.sockets.adapter.rooms[waitingRoom].playersConnected);
  });

  console.log(`Client connected with socket id ${socket.id}`);
  // console.log('all sockets',io.sockets.adapter.rooms[waitingRoom].playersConnected);
  // socket.emit('userConnected',socket.uuid);

  /**
   * establish data
   *
   */

  // socket.on('dataFromLocalStorage', (localStorage) =>{
  //   socket.uuid = localStorage.uuid?localStorage.uuid:socket.uuid;
  //   socket.gameProperties.nickname = localStorage.name?localStorage.name:socket.uuid;

  //   socket.roomsConnectedTo.forEach(room => {
  //     if (io.sockets.adapter.rooms[room] === undefined || io.sockets.adapter.rooms[room].length<roomLimit){
  //       socket.join(room);
  //       // update by current uuid
  //     } else {
  //       socket.emit('fullroom','Room does\'t exist or is full');
  //     }
  //   });
  // });


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
    socket.emit("updatedServers", io.deckitRooms);
    console.log("[emiting] updatedServers", io.deckitRooms);

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
   * CHAT
   */

   socket.on('messageReceived',(msg,room)=>{
    if (room==='waiting') {
      room = waitingRoom;      
    }
    socket.to(room).emit('messageSent',msg);
   });
});
