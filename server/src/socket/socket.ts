import socketIo from 'socket.io';

import {
  RoomEvents, GameEvents, UserEvents,
} from './events';
import logger from '../loaders/logger';
import IO from '../classes/IO';

export interface IExtendedSocket extends socketIo.Socket {
  deckitUser?: any
}

export const WAITING_ROOM = 'WAITING_ROOM';

const ioEvents = () => {
  IO.getInstance().io.on('connection', (socket: IExtendedSocket) => {
    socket.join(WAITING_ROOM);
    logger.info(`Connection with socket established for ${socket.id}`);
    // setTimeout(() => {
    //   socket.emit('SYNC_BASIC_INFO', { ok: true });
    //   io.to(socket.id).emit('SYNC_BASIC_INFO2', { ok: true });
    // }, 500);
    UserEvents(socket);
    RoomEvents(socket);
    GameEvents(socket);
  });
};

const SocketIo = () => {
  IO.getInstance();

  ioEvents();

  IO.getInstance().server.listen(IO.getInstance().port, () => logger.info(`Socket server listening on port ${IO.getInstance().port}`));
};

export default SocketIo;
