// @ts-ignore
import randomColor from 'random-color';
import SocketIO from 'socket.io';
import { roomState } from '../../classes/Room';
import getRoomObjectForUpdate from '../../utils/getRoomObjectForUpdate';
import getRoom from '../../utils/getRoom';
import getRoomUpdateState from '../../utils/getRoomUpdateState';
import { loggers } from '../../loaders/loggers';
import Deckit from '../../classes/Deckit';
import IO from '../../classes/IO';
import { IExtendedSocket } from '../socket';
import { PlayerState } from '../../classes/Player';
import updateListOfRooms from '../../utils/updateListOfRooms';
// TODO: Move interfaces to other file
// interface Iparams {
//   id: string;
//   username?: string;
//   avatar?: string;
//   ranking?: number;
// }

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
  KICK_DISCONNECTED_PLAYERS: 'MOOLIGHT-KICK_DISCONNECTED_PLAYERS',
  RECONNECT: 'MOONLIGHT-RECONNECT',
  DENY_RECONNECTING: 'MOOLIGHT-DENY_RECONNECTING',
};

// TODO: Change types
// eslint-disable-next-line func-names
export const RoomEvents = function (socket: IExtendedSocket) {
  this.socket = socket;

  socket.on(roomTopics.GET_FULL_LIST_OF_ROOMS, (params: any, callback: Function) => {
    const minimalInfoList = Object.values(IO.getInstance().io.gameRooms.public).map((room: any) => {
      const { minimalInfo, state } = room;
      if (state < roomState.started) {
        return minimalInfo;
      }
    }).filter((room) => room);
    callback(minimalInfoList);
  });

  // 2.0 start
  interface MOONLIGHTICreateRoomParams {
    userData: {
      username: string;
      id: string;
      anonymous: boolean;
    }
    mode: 'public' | 'private' | 'fast';
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
      if (!socket?.deckitUser?.color) {
        socket.deckitUser.color = randomColor(0.3, 0.99).hexString();
      }
      const room = new Deckit(roomOptions, socket.deckitUser.id);
      const { id: roomId, mode } = room;
      loggers.event.received.verbose(roomTopics.CREATE_ROOM, params);
      IO.getInstance().addRoom({
        room,
        roomId,
        mode,
      });

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

      updateListOfRooms(room, 'add');

      // if (room.mode === 'public') {
      //   IO.getInstance().io.in(WAITING_ROOM).emit(roomTopics.UPDATE_LIST_OF_ROOMS, getRoomObjectForUpdate(room, 'add'));
      // }
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
      const { error } = await room.MOONLIGHTconnectPlayer(socket.deckitUser);
      if (error) {
        callback({ error: 'blacklisted' });
        return;
      }

      // leave waiting room to not receive info about newly created rooms
      socket.leave(WAITING_ROOM);

      socket.join(roomId);
      socket.deckitUser.activeRoomId = roomId;

      // if room is public, push update of the room info to Browse route
      updateListOfRooms(room);

      loggers.event.received.verbose(roomTopics.JOIN_ROOM, room.basicInfo);

      // send basicView of room to sender
      callback({ roomDetails: room.basicInfo });

      const publicPlayers = await room.getPublicPlayers();

      // send updated room to all except sender
      socket.to(roomId).emit(roomTopics.UPDATE_ROOM, { players: publicPlayers });
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

      if (!disconnectedPlayer) {
        callback({ error: 'Something went wrong' });
        return;
      }

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
      updateListOfRooms(room);

      loggers.info.info(`Player ${disconnectedPlayer.username} with socketId of ${disconnectedPlayer.socketId} kicked from room ${roomId}`);

      const publicPlayers = await room.getPublicPlayers();

      // send updated room to all except sender
      IO.getInstance().io.in(roomId).emit(roomTopics.UPDATE_ROOM, { players: publicPlayers });
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

    const room = getRoom(activeRoomId);
    if (!room) {
      return;
    }
    const {
      players,
    } = await room.MOONLIGHTdisconnectPlayer(socket.deckitUser.id);

    // if room is public, push update of the room info to Browse route
    updateListOfRooms(room);

    const publicPlayers = await room.getPublicPlayers();

    // send updated room to all including sender
    IO.getInstance().io.in(activeRoomId).emit(
      roomTopics.UPDATE_ROOM,
      {
        players: publicPlayers,
        state: room.state,
      },
    );
  });

  // socket.on('CHECK_FOR_ROOM', (
  //   { roomId, userId }: { roomId: string, userId?: string },
  //   callback: Function) => {
  //   console.log('CHECK_FOR_ROOM', socket.deckitUser);
  //   const room = getRoom(roomId);
  //   const player = room?.getPlayer(userId);
  //   callback({
  //     doesExist: !!room,
  //     reconnecting: player && player.state === 3,
  //   });
  // });

  socket.on('MOONLIGHT-FORCE_RESTART', () => {
    const { deckitUser: { activeRoomId } = {} } = socket;
    if (!activeRoomId) {
      return null;
    }
    const room = getRoom(activeRoomId);
    if (!room || room.state !== roomState.paused) {
      return null;
    }

    const disconnectedPlayers = room.players.filter((player) => player.state === PlayerState.left);

    disconnectedPlayers.forEach(({ id }) => {
      room.MOONLIGHTdisconnectPlayer(id, true);
    });

    room.updateRoomState(roomState.started);
    room.emitUpdateRoom({
      players: room.players,
      state: room.state,
    });
    return null;
  });

  interface IReconnect {
    playerId: string;
    roomId: string;
  }

  socket.on(roomTopics.RECONNECT,
    ({
      playerId,
      roomId,
    }: IReconnect, callback: Function) => {
      const room = getRoom(roomId);
      if (!room || room.state === roomState.ended) {
        callback({ error: 'noroom' });
        return null;
      }
      const player = room.getPlayer(playerId);
      if (!player) {
        callback({ error: 'noroom' });
        return null;
      }

      room.MOONLIGHTupdatePlayer({ playerId, playerData: { state: PlayerState.playing } });

      if (room.arePlayersReady()) {
        room.updateRoomState(roomState.started);
      }

      if (socket.deckitUser) {
        socket.deckitUser.activeRoomId = roomId;
      }

      callback({
        roomDetails: room.basicInfo,
        gameDetails: {
          ...room.info,
          myCards: player.cards,
          pickedCardFromMyDeck: room.getCardIdFromDeckByPlayerId(playerId),
          pickedCardFromMyBoard: room.getCardIdFromBoardByPlayerId(playerId),
        },
      });

      room.emitUpdateRoom({
        state: room.state,
        players: room.players,
      });
      return null;
    });

  socket.on(roomTopics.DENY_RECONNECTING, async ({ roomId }: { roomId: string }) => {
    const room = getRoom(roomId);
    if (!room) {
      return;
    }

    if (!socket.deckitUser?.id) {
      return;
    }

    room.MOONLIGHTdisconnectPlayer(socket.deckitUser?.id, true);
    room.updateRoomState(roomState.started);
    room.emitUpdateRoom({
      players: room.players,
      state: room.state,
    });
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
    if (!room) {
      return;
    }
    const {
      players,
    } = await room.MOONLIGHTdisconnectPlayer(socket.deckitUser.id);

    if (room && room.players.length === 0) {
      IO.getInstance().removeRoom({ mode: room.mode, roomId: room.id });
      // TODO:
      // if players === 1, get players and force them leave
    }

    socket.deckitUser.activeRoomId = undefined;

    // if room is public, push update of the room info to Browse route
    updateListOfRooms(room);

    const publicPlayers = await room.getPublicPlayers();

    // send updated room to all except sender
    IO.getInstance().io.in(activeRoomId).emit(roomTopics.UPDATE_ROOM, {
      state: room.state,
      players: publicPlayers,
    });
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
      await room.MOONLIGHTupdatePlayer({
        playerId, playerData: { state },
      });
      const updatedState = room.updateRoomState();
      const publicPlayers = await room.getPublicPlayers();
      callback({ players: publicPlayers, updatedState });

      // send updated room to all including sender
      socket.to(room.id).emit(roomTopics.UPDATE_ROOM,
        { players: publicPlayers, state: updatedState });
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

  socket.on(
    roomTopics.KICK_DISCONNECTED_PLAYERS,
    async ({ roomId }: { roomId: string },
      callback: Function) => {
      const room = getRoom(roomId);
      if (!room) {
        callback('noroom');
        return;
      }
      if (!socket.deckitUser?.id) {
        callback('undefined');
        return;
      }
      if (socket.deckitUser.id !== room.admin) {
        callback('notAdmin');
        return;
      }

      room.kickDisconnectedPlayers();
    },
  );
};
