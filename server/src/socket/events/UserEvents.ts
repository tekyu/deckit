import chalk from 'chalk';

//TODO: Change types
export const UserEvents = (socket: any, io: any) => {
  socket.on('updateUser', (params: any) => {
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
    //emit to socket
    socket.in(params.roomId).emit('userUpdated', socket.pswOptions);
  });
};
