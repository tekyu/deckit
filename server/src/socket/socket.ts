import http from "http";
import socketIo from "socket.io";
import chalk from "chalk";
import mockRooms from "../mocks/Rooms";
import roomEvents from "./events/RoomEvents";
import gameEvents from "./events/Game";
//TODO: Change types
const ioEvents = (io: any) => {
  io.on("connection", (socket: any) => {
    console.log(
      chalk.black.bgBlue(`Connection with socket established for ${socket.id}`)
    );
    socket.pswOptions = {};
    socket.on("getRooms", (data, callback) => {
      callback(Object.values(io.gameRooms));
    });
    roomEvents(socket, io);
    gameEvents(socket, io);
  });
};

const SocketIo = () => {
  const port = process.env.SOCKET_PORT || 3012;
  const server = http.createServer();
  const io = socketIo(server);

  io.gameRooms = {};
  io.gameRooms = mockRooms;
  console.log("getRooms", Object.values(io.gameRooms));
  // console.log("gamerooms", mockRooms);
  ioEvents(io);
  server.listen(port, () =>
    console.log(chalk.black.bgGreen(`Socket server listening on port ${port}`))
  );
};

export default SocketIo;
