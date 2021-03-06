// @ts-ignore
import randomColor from 'random-color';
import chalk from 'chalk';
import logger from '../../loaders/logger';
import Room from '../../classes/Room';
import { User } from '../../schemas/User';
import getRoomObjectForUpdate from '../../utils/getRoomObjectForUpdate';
import getRoomNamespaceFromList from '../../utils/getRoomNamespaceFromList';
import getRoom from '../../utils/getRoom';
import { getGameOptions } from '../../utils/gameMapping';
import getRoomUpdateState from '../../utils/getRoomUpdateState';
import ICreateRoomParams from './interfaces/ICreateRoom';
import IJoinRoomParams from './interfaces/IJoinRoom';
// TODO: Move interfaces to other file
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

// TODO: Change types
export const RoomEvents = function (socket: any, io: any) {
  this.socket = socket;
  this.io = io;

  socket.on(CREATE_ROOM, (params: ICreateRoomParams, callback: Function) => {
    console.log('[RoomEvents] CREATE_ROOM');
    const { roomOptions, id } = params;
    const room = new Room(roomOptions, id);
    const { id: roomId, mode } = room;
    logger.info(`Room ${room.id} created with options`, room);
    io.gameRooms[mode][roomId] = room;
    callback({ created: true, roomId });
  });

  socket.on(JOIN_ROOM, (params: IJoinRoomParams, callback: Function) => {
    console.log('[RoomEvents] JOIN_ROOM', params);
    const { roomId, userData }: any = params;
    const room = getRoom(roomId, io.gameRooms);

    if (!room) {
      callback({ error: "Room doesn't exist" });
      return;
    }
    if (room.state >= 2) {
      callback({ error: 'Game has already started' });
      return;
    }
    if (room.players.length === room.playersMax) {
      callback({ error: `Sorry, room ${room.name} is full` });
      return;
    }
    // @ts-ignore
    // const gameOptions = getGameOptions(room.gameCode).playerModel;
    const panels = {
      score: { listener: 'scoreUpdate' },
      chat: { listener: 'incomingChatMessage' },
      log: { listener: 'incomingLog' },
      settings: { listener: 'roomSettings' },
    };

    socket.pswOptions.color = randomColor(0.3, 0.99).hexString();
    socket.pswOptions = {
      ...room.gameOptions.player,
      ...socket.pswOptions,
      ...userData,
    };
    socket.pswOptions.rooms = socket.pswOptions.rooms.filter(
      (id: string) => id !== WAITING_ROOM,
    );
    socket.leave(WAITING_ROOM);
    socket.pswOptions.rooms.push(roomId);
    socket.join(roomId);
    socket.emit('UPDATE_PLAYER', { rooms: socket.pswOptions.rooms });
    // @ts-ignore
    room
      .connectPlayer(socket.pswOptions)
      .then((players: any) => {
        const updatedRoomObject = [
          getRoomObjectForUpdate(
            room,
            getRoomUpdateState(players.length, room.playersMax, room.state),
          ),
        ];
        // @ts-ignore
        callback(room.roomOptions);
        socket
          .to(roomId)
          // @ts-ignore
          .emit('ROOM_UPDATED', { players: room.roomOptions.players });
        if (room.mode === 'public') {
          io.in(WAITING_ROOM).emit('updateListOfRooms', updatedRoomObject);
        }
      })
      .catch((error: any) => {
        callback({
          error: `Cannot connect player ${userData.nickname} of id: ${socket.id} to room ${roomId} with error: ${error}`,
        });
        Error(
          `Cannot connect player ${userData.nickname} of id: ${socket.id} to room ${roomId} with error: ${error}`,
        );
      });
  });

  socket.on('disconnect', () => {
    console.log('[RoomEvents] disconnect');
    socket.pswOptions.rooms.forEach((roomId: string) => {
      const room = getRoom(roomId, io.gameRooms);
      if (!room) {
        console.log(chalk.bgRedBright(`Cannot fetch room of id ${roomId}`));
        return;
      }
      const { players } = room;
      room.disconnectPlayer(socket.pswOptions.id);
      if (!players || !players.length) {
        const namespace = getRoomNamespaceFromList(roomId, io.gameRooms);
        // @ts-ignore
        delete io.gameRooms[namespace][roomId];
      }
      if (room.state < 2 && room.mode === 'public') {
        const updatedRoomObject = [
          getRoomObjectForUpdate(
            room,
            getRoomUpdateState(players.length, room.playersMax, room.state),
          ),
        ];
        io.in(WAITING_ROOM).emit('updateListOfRooms', updatedRoomObject);
      }

      if (room.state >= 2) {
        room.gameOptions.updateCards(io);
        room.gameOptions.prepareRoomForNextRound(room.players);
      }
    });
  });

  socket.on('LEAVE_ROOM', ({ roomId }: { roomId: string }) => {
    console.log('[RoomEvents] LEAVE_ROOM');
    socket.pswOptions.rooms = socket.pswOptions.rooms.filter(
      (id: String) => id !== roomId,
    );
    const room = getRoom(roomId, io.gameRooms);
    if (!room) {
      console.log(chalk.bgRedBright(`Cannot fetch room of id ${roomId}`));
      return;
    }
    const { players } = room;
    room.disconnectPlayer(socket.pswOptions.id);
    if (!players || !players.length) {
      const namespace = getRoomNamespaceFromList(roomId, io.gameRooms);
      // @ts-ignore
      delete io.gameRooms[namespace][roomId];
    }
    socket.pswOptions.rooms.push(WAITING_ROOM);
    if (room.state < 2 && room.mode === 'public') {
      const updatedRoomObject = [
        getRoomObjectForUpdate(
          room,
          getRoomUpdateState(players.length, room.playersMax, room.state),
        ),
      ];
      io.in(WAITING_ROOM).emit('updateListOfRooms', updatedRoomObject);
    }

    if (room.state >= 2) {
      room.gameOptions.updateCards(io);
      room.gameOptions.prepareRoomForNextRound(room.players);
    }

    if (room.owner === socket.pswOptions.id && room.players.length > 1) {
      const newOwner = room.players[0];
      // @ts-ignore
      room.owner = newOwner.id;
    }

    if (room.admin === socket.pswOptions.id && room.players.length > 1) {
      const newOwner = room.players[0];
      // @ts-ignore
      room.owner = newOwner.id;
      // @ts-ignore
      room.admin = newOwner.id;
    }

    io.in(roomId).emit('ROOM_UPDATED', {
      players: room.players,
      owner: room.owner,
      admin: room.admin,
    });

    const {
      hinter,
      hint,
      remainingCards,
      playersPickedCard,
      playersChoosedCard,
      round,
      stage,
    } = room.gameOptions;
    io.in(roomId).emit('GAME_UPDATED', {
      hinter,
      hint,
      playersPickedCard,
      playersChoosedCard,
      round,
      stage,
      remainingCards: remainingCards.length,
    });
    // @ts-ignore
    // io.in(roomId).emit('GAME_UPDATED', {
    //   hinter: room.gameOptions.hinter,
    //   stage: room.gameOptions.stage,
    // });

    socket.emit('UPDATE_PLAYER', { rooms: socket.pswOptions.rooms });
    socket.join(WAITING_ROOM);
  });

  socket.on('CHECK_FOR_ROOM', ({ id }: { id: string }, callback: Function) => {
    console.log('[RoomEvents] CHECK_FOR_ROOM');
    const room = getRoom(id, io.gameRooms);

    callback(!!room);
  });

  // deprecated
  socket.on('GET_ROOM_INFO', (params: any, callback: Function) => {
    const room = getRoom(params.id, io.gameRooms);
    if (!room) {
      callback({});
      return;
    }
    const roomInfo = room.roomOptions;
    callback(roomInfo);
  });

  socket.on('getScoreData', ({ activeRoomId }: { activeRoomId: string }, callback: Function) => {
    const room = getRoom(activeRoomId, io.gameRooms);
    callback((room && room.scoreboard) || {});
  });

  socket.on('UPDATE_PLAYER', ({ data, activeRoomId, playerId }: { data: Object, activeRoomId: string, playerId: string }) => {
    const room = getRoom(activeRoomId, io.gameRooms);
    // @ts-ignore
    room.players = room.players.map((player: any) => {
      if (player.id === playerId) {
        return { ...player, ...data };
      }
      return { ...player };
    });

    // @ts-ignore
    const arePlayersReady = room.players.some(({ state }) => state === 1);
    // @ts-ignore
    room.setState(arePlayersReady ? 1 : 0);
    io.in(activeRoomId).emit('ROOM_UPDATED', {
      // @ts-ignore
      players: room.players,
      // @ts-ignore
      state: room.state,
    });
  });

  socket.on('KICK_PLAYER', ({ userId, activeRoomId }: { userId: string, activeRoomId: string }) => {
    const room = getRoom(activeRoomId, io.gameRooms);
    if (!room) return null;
    const player = room.players.find(({ id }: any) => id === userId);
    room.players = room.players.filter(({ id }: any) => id !== userId);
    io.in(activeRoomId).emit('ROOM_UPDATED', { players: room.players });
    // @ts-ignore
    io.to(player.socketId).emit('KICKED', { activeRoomId });
    io.in(WAITING_ROOM).emit('updateListOfRooms', [
      getRoomObjectForUpdate(room, 'update'),
    ]);
  });

  socket.on('CHANGE_ROOM_MODE', ({ activeRoomId }: { activeRoomId: string }) => {
    const room = getRoom(activeRoomId, io.gameRooms);
    if (!room) {
      return null;
    }
    if (room.mode === 'public') {
      room.mode = 'private';
    } else {
      room.mode = 'public';
    }
    io.in(activeRoomId).emit('ROOM_UPDATED', { mode: room.mode });
    io.in(WAITING_ROOM).emit('updateListOfRooms', [
      getRoomObjectForUpdate(
        room,
        room.mode === 'public' ? 'update' : 'remove',
      ),
    ]);
  });

  socket.on('ADD_SEAT', ({ activeRoomId }: { activeRoomId: string }) => {
    console.log('[RoomEvents] ADD_SEAT');
    const room = getRoom(activeRoomId, io.gameRooms);
    if (!room) return null;
    room.playersMax += 1;
    io.in(activeRoomId).emit('ROOM_UPDATED', { playersMax: room.playersMax });
    io.in(WAITING_ROOM).emit('updateListOfRooms', [
      getRoomObjectForUpdate(room, 'update'),
    ]);
  });

  socket.on('REMOVE_SEAT', ({ activeRoomId }: { activeRoomId: string }) => {
    console.log('[RoomEvents] REMOVE_SEAT');
    const room = getRoom(activeRoomId, io.gameRooms);
    if (!room) return null;
    room.playersMax -= 1;
    io.in(activeRoomId).emit('ROOM_UPDATED', { playersMax: room.playersMax });
    io.in(WAITING_ROOM).emit('updateListOfRooms', [
      getRoomObjectForUpdate(room, 'update'),
    ]);
  });
};
