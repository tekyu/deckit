import randomColor from "random-color";
import chalk from "chalk";

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

  socket.on("newConnectedPlayer", data => {
    const { roomId, ...playerData } = data;
    const room = getRoom(roomId);
    if (room) {
      playerData.color = randomColor(0.3, 0.99);
      room.connectPlayer(playerData);
      socket.pswOptions.rooms[roomId] = playerData;
      console.log("newConnectedPlayer", socket.pswOptions);
      socket.in(roomId).emit("roomUpdated", room.roomOptions);
    }
  });
};
