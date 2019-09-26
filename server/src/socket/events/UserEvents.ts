import chalk from "chalk";

//TODO: Change types
const UserEvents = (socket: any, io: any) => {
  console.log("User events");
  socket.on("updateUsers", (params: any) => {
    socket.pswOptions = params;
    console.log(
      chalk.bgYellow.black(`[USer] User ${socket.id} updated with `),
      params
    );
    //emit to socket
    socket.emit("userUpdated", socket.pswOptions);
  });
};

export default UserEvents;
