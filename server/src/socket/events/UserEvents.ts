import chalk from "chalk";

//TODO: Change types
const UserEvents = (socket: any, io: any) => {
  console.log("User events");
  socket.on("updateUser", (params: any) => {
    socket.pswOptions = { ...socket.pswOptions, params };
    console.log(
      chalk.bgYellow.black(`[USer] User ${socket.id} updated with `),
      params
    );
    //emit to socket
    // socket.in(params.roomId).emit("userUpdated", socket.pswOptions);
  });
  socket.on("updateAnonymousUser", (params: any, callback: Function) => {
    socket.pswOptions = { ...socket.pswOptions, ...params };
    if (!socket.pswOptions.id) {
      socket.pswOptions.id = socket.id;
      socket.pswOptions.anon = true;
    }
    console.log(
      chalk.bgYellow.black(`[USer] User ${socket.id} updated with `),
      params,
      socket.id
    );
    callback(socket.pswOptions);
    //emit to socket
    // socket.in(params.roomId).emit("userUpdated", socket.pswOptions);
  });
};

export default UserEvents;
