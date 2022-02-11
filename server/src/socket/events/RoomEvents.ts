// @ts-ignore
import randomColor from 'random-color';
import chalk from 'chalk';
import SocketIO from 'socket.io';
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
import { ExtendedSocket } from './interfaces/IExtendedSocket';
import { IExtendedSocketServer } from './interfaces/IExtendedSocketServer';
import { loggers } from '../../loaders/loggers';
import Deckit from '../../classes/Deckit';
import IO from '../../classes/IO';
import { IExtendedSocket } from '../socket';
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

export const WAITING_ROOM = 'WAITING_ROOM';

export const roomTopics = {
  GET_FULL_LIST_OF_ROOMS: 'MOONLIGHT-GET_FULL_LIST_OF_ROOMS',
  CREATE_ROOM: 'MOONLIGHT-CREATE_ROOM',
  JOIN_ROOM: 'MOONLIGHT-JOIN_ROOM',
  LEAVE_ROOM: 'MOONLIGHT-LEAVE_ROOM',
  UPDATE_ROOM: 'MOONLIGHT-UPDATE_ROOM',
  UPDATE_LIST_OF_ROOMS: 'MOONLIGHT-UPDATE_LIST_OF_ROOMS',
  KICK_PLAYER: 'MOONLIGHT-KICK_PLAYER',
  KICKED_PLAYER: 'MOONLIGHT-KICKED_PLAYER',
  UPDATE_USER_STATE: 'MOONLIGHT-CHANGE-USER-STATE',
  UPDATE_NUMBER_OF_SEATS: 'MOONLIGHT-UPDATE_NUMBER_OF_SEATS',
  PLAY_AGAIN: 'MOONLIGHT-PLAY_AGAIN',
};

// TODO: Change types
export const RoomEvents = function (socket: IExtendedSocket) {
  this.socket = socket;

  socket.on(roomTopics.GET_FULL_LIST_OF_ROOMS, (params: any, callback: Function) => {
    const basicInfoList = Object.values(IO.getInstance().io.gameRooms.public).map((room: any) => {
      const { basicInfo } = room;
      return {
        ...basicInfo,
        players: basicInfo.players.length || 0,
      };
    });
    callback(basicInfoList);
  });

  // 2.0 start
  interface MOONLIGHTICreateRoomParams {
    userData: {
      username: string;
      id: string;
      anonymous: boolean;
    }
    mode: string;
    playersMax: number;
    name: string;
    gameCode: string;
    maxScore: number;
  }

  socket.on(
    roomTopics.CREATE_ROOM,
    async (params: MOONLIGHTICreateRoomParams, callback: Function) => {
      const {
        userData: { username, anonymous, id: userId }, ...roomOptions
      } = params;
      console.log('test', socket.deckitUser);
      if (!socket?.deckitUser?.color) {
        socket.deckitUser.color = randomColor(0.3, 0.99).hexString();
      }
      const room = new Deckit(roomOptions, socket.deckitUser.id);
      const { id: roomId, mode } = room;
      loggers.event.received.verbose(roomTopics.CREATE_ROOM, params);
      IO.getInstance().io.gameRooms[mode][roomId] = room;

      // leave waiting room to not receive info about newly created rooms
      socket.leave(WAITING_ROOM);

      // join player to the room
      socket.join(roomId);
      socket.deckitUser.activeRoomId = roomId;

      const {
        newPlayerData: userDetails,
      } = await room.MOONLIGHTconnectPlayer({
        // change this to socket.deckitUser
        color: socket.deckitUser.color, username, anonymous, id: userId, socketId: socket.id,
      });
      // push out roomData
      callback({
        roomDetails: room.basicInfo, userDetails,
      });

      if (room.mode === 'public') {
        IO.getInstance().io.in(WAITING_ROOM).emit(roomTopics.UPDATE_LIST_OF_ROOMS, [getRoomObjectForUpdate(room, 'add')]);
      }
    },
  );

  interface MOONLIGHTIJoinRoomParams {
    roomId: string;
  }

  socket.on(roomTopics.JOIN_ROOM, async ({
    roomId,
  }: MOONLIGHTIJoinRoomParams, callback: Function) => {
    const room = getRoom(roomId);
    if (!room) {
      callback({ error: 'noroom' });
      return;
    }
    if (room.state > 1) {
      callback({ error: 'started' });
      return;
    }
    if (room.players.length === room.playersMax) {
      callback({ error: 'full' });
      return;
    }

    if (!socket.deckitUser.color) {
      socket.deckitUser.color = randomColor(0.3, 0.99).hexString();
    }

    try {
      const { players, error } = await room.MOONLIGHTconnectPlayer(socket.deckitUser);
      if (error) {
        callback({ error: 'blacklisted' });
        return;
      }
      // get list of rooms needed to be updated in waiting room
      const updatedRoomObject = [
        getRoomObjectForUpdate(
          room,
          getRoomUpdateState({
            players: players.length,
            playersMax: room.playersMax,
            state: room.state,
          }),
        ),
      ];

      // leave waiting room to not receive info about newly created rooms
      socket.leave(WAITING_ROOM);

      socket.join(roomId);
      socket.deckitUser.activeRoomId = roomId;

      // if room is public, push update of the room info to Browse route
      if (room.mode === 'public') {
        IO.getInstance().io.in(WAITING_ROOM)
          .emit(roomTopics.UPDATE_LIST_OF_ROOMS, updatedRoomObject);
      }
      loggers.event.received.verbose(roomTopics.JOIN_ROOM, room.basicInfo);

      // send basicView of room to sender
      callback({ roomDetails: room.basicInfo });

      // send updated room to all except sender
      socket.to(roomId).emit(roomTopics.UPDATE_ROOM, { players: room.players });
    } catch (error) {
      callback({ error: 'undefined' });
    }
  });

  interface MOONLIGHTIKickPlayerParams {
    roomId: string;
    playerId: string
  }

  socket.on(roomTopics.KICK_PLAYER,
    async ({ roomId, playerId }: MOONLIGHTIKickPlayerParams, callback: Function) => {
      const room = getRoom(roomId);
      if (!room) {
        callback({ error: "Room doesn't exist" });
        return;
      }
      if (room.state > 1) {
        callback({ error: 'Game has already started' });
        return;
      }
      if ((room.owner !== socket.deckitUser.id || room.admin !== socket.deckitUser.id)) {
        callback({ error: 'You are not the owner or admin of the room' });
      }

      if (!room) {
        return;
      }

      const { players, disconnectedPlayer } = await room.MOONLIGHTkickPlayer(playerId);

      // get list of rooms needed to be updated in waiting room
      const updatedRoomObject = [
        getRoomObjectForUpdate(
          room,
          getRoomUpdateState({
            players: players.length,
            playersMax: room.playersMax,
            state: room.state,
          }),
        ),
      ];

      // send info to kicked player
      IO.getInstance().io.to(disconnectedPlayer.socketId)
        .emit(roomTopics.KICKED_PLAYER, { roomId });

      // socket leave from this room
      const disconnectedSocket: SocketIO.Socket = IO.getInstance().io
        .sockets.connected[disconnectedPlayer.socketId];
      disconnectedSocket.leave(roomId);
      // @ts-ignore
      disconnectedSocket.deckitUser.activeRoomId = undefined;

      // if room is public, push update of the room info to Browse route
      if (room.mode === 'public') {
        IO.getInstance().io.in(WAITING_ROOM)
          .emit(roomTopics.UPDATE_LIST_OF_ROOMS, updatedRoomObject);
      }
      loggers.info.info(`Player ${disconnectedPlayer.username} with socketId of ${disconnectedPlayer.socketId} kicked from room ${roomId}`);

      // send updated room to all except sender
      IO.getInstance().io.in(roomId).emit(roomTopics.UPDATE_ROOM, { players: room.players });
      callback({});
    });

  socket.on('disconnect', async () => {
    loggers.info.info(`Player ${socket.deckitUser
      ? socket.deckitUser.username
      : socket.id} disconnected`);
    const { deckitUser: { activeRoomId } = {} } = socket;
    socket.leave(WAITING_ROOM);
    if (!activeRoomId) {
      return;
    }
    socket.leave(activeRoomId);
    socket.deckitUser.activeRoomId = undefined;

    const room: Room = getRoom(activeRoomId);
    const {
      players,
    } = await room.MOONLIGHTdisconnectPlayer(socket.deckitUser.id);

    // get list of rooms needed to be updated in waiting room
    const updatedRoomObject = [
      getRoomObjectForUpdate(
        room,
        getRoomUpdateState({
          players: players.length,
          playersMax: room.playersMax,
          state: room.state,
        }),
      ),
    ];
    // if room is public, push update of the room info to Browse route
    if (room.mode === 'public') {
      IO.getInstance().io.in(WAITING_ROOM).emit(roomTopics.UPDATE_LIST_OF_ROOMS, updatedRoomObject);
    }
    // send updated room to all including sender
    IO.getInstance().io.in(activeRoomId).emit(roomTopics.UPDATE_ROOM, { players: room.players });
  });

  socket.on(roomTopics.LEAVE_ROOM, async () => {
    if (!socket.deckitUser) {
      return;
    }
    loggers.info.info(`Player ${socket.deckitUser.username} left the room ${socket.deckitUser.activeRoomId}`);
    const { deckitUser: { activeRoomId } = {} } = socket;
    socket.leave(WAITING_ROOM);
    if (!activeRoomId) {
      return;
    }

    socket.leave(activeRoomId);
    socket.deckitUser.activeRoomId = undefined;

    const room = getRoom(activeRoomId);
    const {
      players,
    } = await room.MOONLIGHTdisconnectPlayer(socket.deckitUser.id);

    if (room && room.players.length === 0) {
      delete IO.getInstance().io.gameRooms[room.mode][activeRoomId];
      // TODO:
      // if players === 1, get players and force them leave
    }

    console.log('IO.getInstance().io.gameRooms', IO.getInstance().io.gameRooms);
    socket.deckitUser.activeRoomId = undefined;

    // get list of rooms needed to be updated in waiting room
    const updatedRoomObject = [
      getRoomObjectForUpdate(
        room,
        IO.getInstance().io.gameRooms[room.mode][activeRoomId] ? getRoomUpdateState({
          players: players.length,
          playersMax: room.playersMax,
          state: room.state,
        }) : 'remove',
      ),
    ];
    // if room is public, push update of the room info to Browse route
    if (room.mode === 'public') {
      IO.getInstance().io.in(WAITING_ROOM).emit(roomTopics.UPDATE_LIST_OF_ROOMS, updatedRoomObject);
    }
    // send updated room to all except sender
    IO.getInstance().io.in(activeRoomId).emit(roomTopics.UPDATE_ROOM, { players: room.players });
  });

  interface IChangeUserState {
    state: number;
  }
  socket.on(
    roomTopics.UPDATE_USER_STATE,
    async ({ state }: IChangeUserState, callback: Function) => {
      loggers.event.received.verbose(roomTopics.UPDATE_USER_STATE, state);

      if (!socket.deckitUser) {
        callback({ error: 'Something went wrong, sorry!' });
        return;
      }
      const { deckitUser: { activeRoomId = '', id: playerId } } = socket;
      if (!activeRoomId) {
        callback({ error: 'You are not part of any room' });
        return;
      }

      const room = getRoom(activeRoomId);
      if (!room) {
        callback({ error: 'Room does not exist' });
        return;
      }
      const updatedPlayers = await room.MOONLIGHTupdatePlayer({
        playerId, playerData: { state },
      });
      const updatedState = room.updateRoomState();

      callback({ players: updatedPlayers, updatedState });

      // send updated room to all including sender
      socket.to(room.id).emit(roomTopics.UPDATE_ROOM,
        { players: updatedPlayers, state: updatedState });
    },
  );

  socket.on(roomTopics.UPDATE_NUMBER_OF_SEATS, ({ action }: { action: 'add' | 'remove' }) => {
    if (!socket.deckitUser?.activeRoomId) {
      return null;
    }

    if (!action) {
      return null;
    }

    const room = getRoom(socket.deckitUser.activeRoomId);

    if (!room) return null;

    room.updateNumberOfSeats(action);

    // if room is public, push update of the room info to Browse route
    if (room.mode === 'public') {
      IO.getInstance().io.in(WAITING_ROOM).emit(roomTopics.UPDATE_LIST_OF_ROOMS, [
        getRoomObjectForUpdate(room, 'update'),
      ]);
    }
    // send updated room to all including sender
    IO.getInstance().io.in(room.id).emit(roomTopics.UPDATE_ROOM, { playersMax: room.playersMax });

    return null;
  });

  socket.on(roomTopics.PLAY_AGAIN, async ({ playerId }: { playerId: string }) => {
    if (!socket.deckitUser?.activeRoomId) {
      return;
    }
    const room = getRoom(socket.deckitUser.activeRoomId);
    if (!room) {
      return;
    }
    room.updatePlayAgain(playerId);
    IO.getInstance().io.in(socket.deckitUser.activeRoomId)
      .emit(
        roomTopics.UPDATE_ROOM,
        { playAgain: room.playAgain },
      );

    if (room.playAgain.length / room.players.length > 0.5) {
      room.resetRoom();
    }
  });
};
