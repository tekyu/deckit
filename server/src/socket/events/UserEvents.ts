import { loggers } from '../../loaders/loggers';
import getRoom from '../../utils/getRoom';
import { IExtendedSocket } from '../socket';
import { PlayerState } from '../../classes/Player';

export const userTopics = {
  UPDATE_ANON_USER: 'MOONLIGHT-UPDATE_ANON_USER',
  SYNC_BASIC_INFO: 'SYNC_BASIC_INFO',
  SYNC_BASIC_INFO_RETURN: 'SYNC_BASIC_INFO_RETURN',
};

export const UserEvents = (socket: IExtendedSocket) => {
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
        const playersInfo = await room.getPublicPlayers()
        room.emitUpdateRoom({
          players: playersInfo,
        });
      }
    }

    loggers.event.received.verbose(userTopics.UPDATE_ANON_USER, socket.deckitUser);

    if (!activeRoomId) {
      callback({ id: socket.deckitUser.id, reconnectable: false });
      return null;
    }

    const room = getRoom(activeRoomId);
    const player = room?.getPlayer(id);
    if (player && player.state === PlayerState.left) {
      callback({ id: socket.deckitUser.id, reconnectable: true });
    }
  });
};
