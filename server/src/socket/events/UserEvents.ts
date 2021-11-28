import { activeRoomId } from 'store/room/roomSelectors';
import chalk from 'chalk';
import Room from '../../classes/Room';
import { loggers } from '../../loaders/loggers';
import getRoom from '../../utils/getRoom';
import { ExtendedSocket } from './interfaces/IExtendedSocket';
import { roomTopics } from './RoomEvents';

// 2.0
export const topics = {
  UPDATE_ANON_USER: 'MOONLIGHT-UPDATE_ANON_USER',
};

// 2.0 end

// TODO: Change types
export const UserEvents = (socket: ExtendedSocket, io: any) => {
  socket.on('updateUser', (params: any) => {
    console.log('updateUser', params);
    socket.pswOptions = { ...socket.pswOptions, ...params };
    console.log(chalk.bgYellow.black(`[User] User ${socket.id} updated with `));
  });
  socket.on('UPDATE_ANON_USER', (params: any, callback: Function) => {
    // TODO: TEMPORARY SOLUTION UNTIL SOCKET WILL CLOSE ON ROOM EXIT
    socket.pswOptions = { ...socket.pswOptions, ...params };
    if (!socket.pswOptions.id) {
      socket.pswOptions.id = socket.id;
      socket.pswOptions.anon = true;
    }
    console.log(chalk.bgYellow.black(`[USer] User ${socket.id} updated with `));
    callback(socket.pswOptions);
    // emit to socket
    socket.in(params.roomId).emit('userUpdated', socket.pswOptions);
  });

  // 2.0
  interface IUpdateAnonUser {
    username: string;
    anonymous: boolean;
    id?: string
  }

  socket.on(topics.UPDATE_ANON_USER, async (
    { username, anonymous, id }: IUpdateAnonUser,
    callback: Function,
  ) => {
    const hasNameChanged = !(socket.deckitUser?.username === username);

    if (!socket.deckitUser) {
      socket.deckitUser = {
        username,
        anonymous,
        id: id || socket.id,
        socketId: socket.id,
      };
    }
    socket.deckitUser.username = username;
    socket.deckitUser.anonymous = anonymous;

    if (hasNameChanged && socket.deckitUser?.activeRoomId) {
      const { deckitUser: { activeRoomId } } = socket;
      const room: Room = getRoom(activeRoomId, io.gameRooms);
      const players = await room.MOONLIGHTupdatePlayer({
        playerId: socket.deckitUser.id,
        playerData: { username, anonymous, id },
      });
      // send updated room to all including sender
      io.in(activeRoomId).emit(roomTopics.UPDATE_ROOM, { players });
    }

    loggers.event.received.verbose(topics.UPDATE_ANON_USER, socket.deckitUser);
    callback({ id: socket.deckitUser.id });
  });
};
