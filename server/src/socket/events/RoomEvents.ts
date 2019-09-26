import Room from "../../classes/Room";
// import { Socket, socketIo } from "socket.io";
import chalk from "chalk";
//TODO: Move interfaces to other file
interface Iparams {
  id: string;
  nickname?: string;
  avatar?: string;
  ranking?: number;
}

//TODO: Change types
const RoomEvents = (socket: any, io: any) => {
  console.log("Room events");
  socket.on("createRoom", (params: any, callback: Function) => {
    const { nickname, ...roomParams } = params;
    const room = new Room(roomParams, socket.id);
    socket.join(room.id);
    io.gameRooms[room.id] = room;
    console.log(
      chalk.bgYellow.black(`[Room] Room ${room.id} created with options `),
      room
    );
    console.log(
      chalk.bgYellow.gray(`[IO] List of rooms by id `),
      io.gameRooms,
      Object.keys(io.sockets.adapter.rooms)
    );
    console.log(
      chalk.bgYellow.red(`[IO] List of rooms by id `),
      // io.sockets.connected[socket.id],
      Object.keys(io.sockets.connected)
    );
    // socket.emit("createRoom", { created: true }, );
    callback({ created: true });
  });
};

export default RoomEvents;
