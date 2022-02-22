import { loggers } from '../../loaders/loggers';
import getRoom from '../../utils/getRoom';
import { IExtendedSocket } from '../socket';
import { PlayerState } from '../../classes/Player';

export const userTopics = {
  UPDATE_ANON_USER: 'MOONLIGHT-UPDATE_ANON_USER',
  SYNC_BASIC_INFO: 'SYNC_BASIC_INFO',
  SYNC_BASIC_INFO_RETURN: 'SYNC_BASIC_INFO_RETURN',
};

// TODO: Change types
export const UserEvents = (socket: IExtendedSocket) => {
  // socket.on('updateUser', (params: any) => {
  //   console.log('updateUser', params);
  //   socket.pswOptions = { ...socket.pswOptions, ...params };
  //   console.log(chalk.bgYellow.black(`[User] User ${socket.id} updated with `));
  // });
  // socket.on('UPDATE_ANON_USER', (params: any, callback: Function) => {
  //   // TODO: TEMPORARY SOLUTION UNTIL SOCKET WILL CLOSE ON ROOM EXIT
  //   socket.pswOptions = { ...socket.pswOptions, ...params };
  //   if (!socket.pswOptions.id) {
  //     socket.pswOptions.id = socket.id;
  //     socket.pswOptions.anon = true;
  //   }
  //   console.log(chalk.bgYellow.black(`[USer] User ${socket.id} updated with `));
  //   callback(socket.pswOptions);
  //   // emit to socket
  //   socket.in(params.roomId).emit('userUpdated', socket.pswOptions);
  // });

  // 2.0
  interface IUpdateAnonUser {
    username: string;
    anonymous: boolean;
    id?: string
    activeRoomId?: string
  }

  setTimeout(() => {
    socket.emit(userTopics.SYNC_BASIC_INFO, { ok: true });
  }, 1000);

  socket.on(userTopics.UPDATE_ANON_USER, async (
    {
      username, anonymous, id, activeRoomId,
    }: IUpdateAnonUser,
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
      const room = getRoom(activeRoomId);
      await room?.MOONLIGHTupdatePlayer({
        playerId: socket.deckitUser.id,
        playerData: { username, anonymous, id },
      });
      // send updated room to all including sender
      if (room) {
        room.emitUpdateRoom({
          players: room.getPublicPlayers(),
        });
      }
    }

    loggers.event.received.verbose(userTopics.UPDATE_ANON_USER, socket.deckitUser);

    if (activeRoomId) {
      const room = getRoom(activeRoomId);
      const player = room?.getPlayer(id);
      if (player && player.state === PlayerState.left) {
        callback({
          id: socket.deckitUser.id,
          reconnectable: true,
        });
        return null;
      }
    }

    callback({ id: socket.deckitUser.id });
    return null;
  });
};
