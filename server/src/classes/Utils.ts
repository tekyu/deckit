import { loggers } from '../loaders/loggers';
import { IExtendedSocket } from '../socket/socket';

export default class SocketUtils {
  socket: IExtendedSocket

  constructor(socket: IExtendedSocket) {
    this.socket = socket
  }

  setActiveRoomId(roomId: string) {
    if (this.socket.deckitUser) {
      this.socket.deckitUser.activeRoomId = roomId
      return;
    }
    loggers.warn.warn('User did not exist while setting activeRoomId');
    this.socket.deckitUser = {
      activeRoomId: roomId,
    }
  }

  getActiveRoomId(): string | undefined {
    if (this.socket.deckitUser?.activeRoomId) {
      return this.socket.deckitUser.activeRoomId
    }
    loggers.warn.warn('Could not get activeRoomId');
    return undefined
  }

  getDeckitUserId(): string | undefined {
    if (this.socket.deckitUser?.id) {
      return this.socket.deckitUser.id
    }
    loggers.warn.warn('Could not get id of deckit user');
    return undefined
  }
}
