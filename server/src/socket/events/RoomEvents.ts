import Room from "../../classes/Room";
import randomColor from "random-color";
// import { Socket, socketIo } from "socket.io";
import chalk from "chalk";
//TODO: Move interfaces to other file
interface Iparams {
  id: string;
  username?: string;
  avatar?: string;
  ranking?: number;
}

//TODO: Change types
export const RoomEvents = (socket: any, io: any) => {
  const getRoom = (id: string) => {
    const room = io.gameRooms[id];
    if (!room) {
      console.log(chalk.bgRedBright(`Room with id of ${id} doesn't exist`));
      // throw Error(`Room with id of ${id} doesn't exist`);
      return null;
    }
    return room;
  };

  console.log("Room events");
  socket.on("createRoom", (params: any, callback: Function) => {
    const { username, ...roomParams } = params;
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
    callback({ created: true, roomId: room.id });
  });

  socket.on("getRoomInfo", (params: Object, callback: Function) => {
    const room = getRoom(params.id);
    if (!room) {
      callback({});
      return;
    }
    const roomInfo = room.roomOptions;
    console.log("getRoomInfo", roomInfo);
    callback(roomInfo);
  });

  socket.on("newConnectedPlayer", data => {
    const { roomId, ...playerData } = data;
    const room = getRoom(roomId);
    playerData.color = randomColor(0.3, 0.99);
    room.connectPlayer(playerData);
    socket.pswOptions.rooms[roomId] = playerData;
    console.log("newConnectedPlayer", socket.pswOptions);
    socket.in(roomId).emit("roomUpdated", room.roomOptions);
  });
};
