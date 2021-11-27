import chalk from 'chalk';
import { loggers } from '../../loaders/loggers';
import { ExtendedSocket } from './interfaces/IExtendedSocket';

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

  socket.on(topics.UPDATE_ANON_USER, (
    { username, anonymous, id }: IUpdateAnonUser,
    callback: Function,
  ) => {
    socket.deckitUser = {
      username,
      anonymous,
      id: id || socket.id,
      socketId: socket.id,
    };

    loggers.event.received.verbose(topics.UPDATE_ANON_USER, { username, anonymous, id });
    callback({ id: socket.deckitUser.id });
  });
};
