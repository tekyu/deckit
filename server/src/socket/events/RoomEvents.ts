import randomColor from "random-color";
import chalk from "chalk";
import shortId from "shortid";
import { Room } from "../../models";

// TODO: Change types
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

  socket.on("playerJoinRoom", async data => {
    console.log("player joins");
    const { roomId, userId } = data;
    const room = await Room.findOne({ roomId });
    if (!room) return;
    socket.join(roomId);
    const newMessage = {
      msgId: shortId(),
      message: `User ${userId} joined the room`,
      timeStamp: Date.now()
    };
    console.log(newMessage);
    room.chat.push(newMessage);
    // await room.save();
    socket.in(roomId).emit("newChatMessage", newMessage);
    // if (room) {
    //   playerData.color = randomColor(0.3, 0.99);
    //   room.connectPlayer(playerData);
    //   socket.pswOptions.rooms[roomId] = playerData;
    //   console.log("newConnectedPlayer", socket.pswOptions);
    //   socket.in(roomId).emit("roomUpdated", room.roomOptions);
    // }
  });
};
