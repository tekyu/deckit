import randomColor from 'random-color';
import SocketIO from 'socket.io';
import { roomState, ROOM_MODE } from '../../classes/Room';
import getRoomObjectForUpdate from '../../utils/getRoomObjectForUpdate';
import getRoom from '../../utils/getRoom';
import { loggers } from '../../loaders/loggers';
import Deckit from '../../classes/Deckit';
import IO from '../../classes/IO';
import { IExtendedSocket } from '../socket';
import { PlayerState } from '../../classes/Player';
import updateListOfRooms, { ACTION_TYPE } from '../../utils/updateListOfRooms';
import SocketUtils from '../../classes/Utils';

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
  UPDATE_ROOM_MODE: 'MOOLIGHT-UPDATE_ROOM_MODE',
};

// TODO: Change types
// eslint-disable-next-line func-names
export const RoomEvents = function (socket: IExtendedSocket) {
  this.socket = socket;
  this.socketUtils = new SocketUtils(this.socket)
  socket.on(roomTopics.GET_FULL_LIST_OF_ROOMS, (params: any, callback: Function) => {
    const minimalInfoList = Object.values(IO.getInstance().io.gameRooms.public).map((room: any) => {
      const { minimalInfo, state } = room;
      if (state < roomState.started) {
        return minimalInfo;
      }
      return undefined;
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
  }

  socket.on(
    roomTopics.CREATE_ROOM,
    async (params: MOONLIGHTICreateRoomParams, callback: Function) => {
      const {
        userData: { username, anonymous, id: userId },
      } = params;
      this.socketUtils.setDeckitUserColor();
      const room = new Deckit(socket.deckitUser.id);
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
      this.socketUtils.setActiveRoomId(roomId);
      socket.join(roomId);

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

      updateListOfRooms(room, ACTION_TYPE.add);
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
      this.socketUtils.setActiveRoomId(roomId);

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

      const { disconnectedPlayer } = await room.MOONLIGHTkickPlayer(playerId);

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

      this.socketUtils.setActiveRoomId(undefined)

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

    await room.MOONLIGHTdisconnectPlayer(socket.deckitUser.id);

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

  socket.on('MOONLIGHT-FORCE_RESTART', () => {
    const room = getRoom(this.socketUtils.getActiveRoomId());
    if (!room || room.state !== roomState.paused) {
      return null;
    }

    const disconnectedPlayers = room.players.filter((player) => player.state === PlayerState.left);

    disconnectedPlayers.forEach(({ id }) => {
      room.MOONLIGHTdisconnectPlayer(id, true);
    });

    room.updateRoomState(roomState.started);
    room.emitUpdateRoom(['players', 'state']);
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

      this.socketUtils.setActiveRoomId(roomId);

      callback({
        roomDetails: room.basicInfo,
        gameDetails: {
          ...room.info,
          myCards: player.cards,
          pickedCardFromMyDeck: room.getCardIdFromDeckByPlayerId(playerId),
          pickedCardFromMyBoard: room.getCardIdFromBoardByPlayerId(playerId),
        },
      });

      room.emitUpdateRoom(['players', 'state']);
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
    room.emitUpdateRoom(['players', 'state']);
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

    await room.MOONLIGHTdisconnectPlayer(socket.deckitUser.id);

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
  socket.on(roomTopics.UPDATE_USER_STATE,
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
    });

  socket.on(roomTopics.UPDATE_NUMBER_OF_SEATS, ({ action }: { action: ACTION_TYPE }) => {
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
    if (room.mode === ROOM_MODE.public) {
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

  socket.on(roomTopics.KICK_DISCONNECTED_PLAYERS,
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
    });

  socket.on(roomTopics.UPDATE_ROOM_MODE,
    ({ mode }: { mode: ROOM_MODE }) => {
      const room = getRoom(this.socketUtils.getActiveRoomId());
      if (!room || !mode) {
        loggers.warn.warn('Could not get room id when updating room mode');
        return;
      }

      room.updateMode(mode)
      room.emitUpdateRoom(['mode'])
      loggers.info.info(`Room mode in room ${room?.id} updated to ${room?.mode}`)
    })
};
