import Room from '../../classes/Room';
import randomColor from 'random-color';
// import { Socket, socketIo } from "socket.io";
import chalk from 'chalk';
import { getUserData } from '../../utils/getUserData';
import { User } from '../../schemas/User';
import getRoomObjectForUpdate from '../../utils/getRoomObjectForUpdate';
import getRoomNamespaceFromList from '../../utils/getRoomNamespaceFromList';
import getRoom from '../../utils/getRoom';
//TODO: Move interfaces to other file
interface Iparams {
  id: string;
  username?: string;
  avatar?: string;
  ranking?: number;
}

// const gameShapedUser = getGameShapedUser(gameCode, userData)
// userModel = {
//   color: #fff,
//   progress: 0,
//   score: 0,
//   status: 'ready', // ready, not ready, disconnected
//   state: 'waiting', // waiting, hinting, choosing, guessing,
// }
// getInitialGameProps = (gameCode) => {
//   return gameMapping[gameCode].userModel;
// }
// getGameShapedUser = (gameCode, userData) => {
//   return {
//     ...getInitialGameProps(gameCode)
//     ...userData
//   }
// }

const CREATE_ROOM = 'CREATE_ROOM';
const JOIN_ROOM = 'JOIN_ROOM';
const WAITING_ROOM = 'WAITING_ROOM';

const updateListOfRooms = (rooms = [], action = null) => {
  if (!action) {
    throw Error('Action for updating list of rooms not specified');
  }
  const updatedRooms = rooms.map(room =>
    getRoomObjectForUpdate(room, room.players > 0 ? 'update' : 'remove')
  );
  this.io.in(WAITING_ROOM).emit('updateListOfRooms', updatedRooms);
};

const disconnectFromRoom = (socket, roomId) => {
  const room = getRoom(roomId);
  const userId = socket.pswOptions.id;
  room.disconnectPlayer(userId).then(({ roomOptions }) => {
    this.io.in(roomId).emit('ROOM_UPDATED', roomOptions);
    updateListOfRoomsInWaitingRoom(roomId);
  });
};

//TODO: Change types
export const RoomEvents = function(socket: any, io: any) {
  this.socket = socket;
  this.io = io;
  this.updateListOfRooms = updateListOfRooms.bind(this);

  console.log('Room events');

  socket.on(CREATE_ROOM, (params: any, callback: Function) => {
    const { roomOptions, id } = params;
    const room = new Room(roomOptions, id);
    console.log(
      chalk.bgYellow.black(`[Room] Room ${room.id} created with options `),
      room
    );
    io.gameRooms[room.mode][room.id] = room;
    callback({ created: true, roomId: room.id });
    if (room.mode === 'public') {
      const updatedRoomObject = [getRoomObjectForUpdate(room, 'add')];
      io.in(WAITING_ROOM).emit('updateListOfRooms', updatedRoomObject);
    }
  });

  socket.on(JOIN_ROOM, (params: Object, callback: Function) => {
    const panels = {
      score: { listener: `scoreUpdate` },
      chat: { listener: `incomingChatMessage` },
      log: { listener: `incomingLog` },
      settings: { listener: `roomSettings` }
    };
    const { roomId, userData } = params;

    socket.pswOptions.color = randomColor(0.3, 0.99).hexString();
    const room = getRoom(roomId, io.gameRooms);
    socket.pswOptions = { ...socket.pswOptions, ...userData };
    socket.pswOptions.rooms.push(roomId);
    socket.join(roomId);
    socket.leave(WAITING_ROOM);
    room
      .connectPlayer(socket.pswOptions)
      .then(({ roomOptions }) => {
        const updatedRoomObject = [getRoomObjectForUpdate(room, 'update')];
        io.in(roomId).emit('ROOM_UPDATED', roomOptions);
        if (room.mode === 'public') {
          io.in(WAITING_ROOM).emit('updateListOfRooms', updatedRoomObject);
        }
        callback(room.roomOptions);
      })
      .catch(error => {
        Error(
          `Cannot connect player ${userData.nickname} of id: ${socket.id} to room ${roomId} with error: ${error}`
        );
      });
  });

  socket.on('LEAVE_ROOM', ({ roomId }) => {
    console.log('LEAVE_ROOM', socket.pswOptions, roomId);
    socket.pswOptions.rooms = socket.pswOptions.rooms.filter(
      (id: String) => id !== roomId
    );
    const room = getRoom(roomId, io.gameRooms);
    if (!room) {
      console.log(chalk.bgRedBright(`Cannot fetch room of id ${roomId}`));
      return;
    }
    const { players } = room;
    room.disconnectPlayer(socket.pswOptions.id);
    if (!players.length) {
      const namespace = getRoomNamespaceFromList(roomId, io.gameRooms);
      delete io.gameRooms[namespace][roomId];
    }
    socket.join(WAITING_ROOM);
    if (room.mode === 'public') {
      const updatedRoomObject = [
        getRoomObjectForUpdate(room, players.length > 0 ? 'update' : 'remove')
      ];
      io.in(WAITING_ROOM).emit('updateListOfRooms', updatedRoomObject);
    }
  });

  socket.on('GET_ROOM_INFO', (params: Object, callback: Function) => {
    const room = getRoom(params.id, io.gameRooms);
    if (!room) {
      callback({});
      return;
    }
    console.log('getRoomInfo', room);
    const roomInfo = room.roomOptions;
    callback(roomInfo);
  });

  socket.on('getScoreData', ({ activeRoomId }, callback: Function) => {
    const room = getRoom(activeRoomId, io.gameRooms);
    // console.log('getScoreData', room.players, activeRoomId);
    callback(room.players);
  });
};
