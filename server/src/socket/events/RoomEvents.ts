import Room from '../../classes/Room';
import randomColor from 'random-color';
// import { Socket, socketIo } from "socket.io";
import chalk from 'chalk';
import { getUserData } from '../../utils/getUserData';
import { User } from '../../schemas/User';
import getRoomObjectForUpdate from '../../utils/getRoomObjectForUpdate';
import getRoomNamespaceFromList from '../../utils/getRoomNamespaceFromList';
import getRoom from '../../utils/getRoom';
import { getGameOptions } from '../../utils/gameMapping';
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

//TODO: Change types
export const RoomEvents = function(socket: any, io: any) {
  this.socket = socket;
  this.io = io;

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
    // if (room.mode === 'public') {
    //   const updatedRoomObject = [getRoomObjectForUpdate(room, 'add')];
    //   io.in(WAITING_ROOM).emit('updateListOfRooms', updatedRoomObject);
    // }
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
    const gameOptions = getGameOptions(room.gameCode).playerModel;
    socket.pswOptions = { ...gameOptions, ...socket.pswOptions, ...userData };
    socket.pswOptions.rooms = socket.pswOptions.rooms.filter(
      id => id !== WAITING_ROOM
    );
    socket.leave(WAITING_ROOM);
    socket.pswOptions.rooms.push(roomId);
    socket.join(roomId);
    socket.emit('UPDATE_PLAYER', { rooms: socket.pswOptions.rooms });
    room
      .connectPlayer(socket.pswOptions)
      .then(({ players }) => {
        const updatedRoomObject = [
          getRoomObjectForUpdate(room, players > 0 ? 'update' : 'add')
        ];
        console.log('ROOM_UPDATED', room.roomOptions);
        // socket.emit('ROOM_UPDATED', { ...room });
        callback(room.roomOptions);
        socket.to(roomId).emit('ROOM_UPDATED', { players });
        if (room.mode === 'public') {
          io.in(WAITING_ROOM).emit('updateListOfRooms', updatedRoomObject);
        }
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
    room.disconnectPlayer(socket.pswOptions.id);
    const { players } = room;
    if (!players.length) {
      const namespace = getRoomNamespaceFromList(roomId, io.gameRooms);
      delete io.gameRooms[namespace][roomId];
    }
    socket.pswOptions.rooms.push(WAITING_ROOM);
    if (room.mode === 'public') {
      const updatedRoomObject = [
        getRoomObjectForUpdate(room, players.length > 0 ? 'update' : 'remove')
      ];
      io.in(WAITING_ROOM).emit('updateListOfRooms', updatedRoomObject);
    }
    socket.emit('UPDATE_PLAYER', { rooms: socket.pswOptions.rooms });
    socket.join(WAITING_ROOM);

    io.in(roomId).emit('ROOM_UPDATED', { players: room.players });
  });

  socket.on('CHECK_FOR_ROOM', ({ id }, callback: Function) => {
    const room = getRoom(id, io.gameRooms);
    console.log('CHECK_FOR_ROOM', id, room);

    callback(room ? true : false);
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
    callback(room.scoreboard);
  });

  socket.on('UPDATE_PLAYER', ({ data, activeRoomId, playerId }) => {
    const room = getRoom(activeRoomId, io.gameRooms);
    room.players = room.players.map(player => {
      if (player.id === playerId) {
        return { ...player, ...data };
      }
      return { ...player };
    });

    const arePlayersReady = room.players.some(({ state }) => state === 1);
    room.state = arePlayersReady ? 1 : 0;
    console.log('UPDATE_PLAYER', data, activeRoomId, playerId, room.players);
    io.in(activeRoomId).emit('ROOM_UPDATED', {
      players: room.players,
      state: room.state
    });
  });

  socket.on('KICK_PLAYER', ({ userId, activeRoomId, adminId }) => {
    const room = getRoom(activeRoomId, io.gameRooms);
    const player = room.players.find(({ id }) => id === userId);
    room.players = room.players.filter(({ id }) => id !== userId);
    io.in(activeRoomId).emit('ROOM_UPDATED', { players: room.players });
    io.to(player.socketId).emit('KICKED', { activeRoomId });
    io.in(WAITING_ROOM).emit('updateListOfRooms', [
      getRoomObjectForUpdate(room, 'update')
    ]);
  });

  socket.on('CHANGE_ROOM_MODE', ({ activeRoomId }) => {
    const room = getRoom(activeRoomId, io.gameRooms);
    if (room.mode === 'public') {
      room.mode = 'private';
    } else {
      room.mode = 'public';
    }
    io.in(activeRoomId).emit('ROOM_UPDATED', { mode: room.mode });
    io.in(WAITING_ROOM).emit('updateListOfRooms', [
      getRoomObjectForUpdate(room, room.mode === 'public' ? 'update' : 'remove')
    ]);
  });

  socket.on('ADD_SEAT', ({ activeRoomId }) => {
    const room = getRoom(activeRoomId, io.gameRooms);
    room.playersMax += 1;
    io.in(activeRoomId).emit('ROOM_UPDATED', { playersMax: room.playersMax });
    io.in(WAITING_ROOM).emit('updateListOfRooms', [
      getRoomObjectForUpdate(room, 'update')
    ]);
  });

  socket.on('REMOVE_SEAT', ({ activeRoomId }) => {
    const room = getRoom(activeRoomId, io.gameRooms);
    room.playersMax -= 1;
    io.in(activeRoomId).emit('ROOM_UPDATED', { playersMax: room.playersMax });
    io.in(WAITING_ROOM).emit('updateListOfRooms', [
      getRoomObjectForUpdate(room, 'update')
    ]);
  });
};
