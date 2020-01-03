import randomColor from "random-color";
import shortId from "shortid";
import { Room } from "../../models";

// TODO: Change types
export const RoomEvents = (socket: any) => {
  console.log("Room events");
  socket.on("playerJoinRoom", async data => {
    const { roomId, userId, username } = data;
    const room = await Room.findOne({ roomId });
    if (!room) return;
    socket.join(roomId);
    const newMessage = {
      msgId: shortId(),
      message: `User ${username} joined the room`,
      timeStamp: Date.now()
    };
    room.chat.push(newMessage);
    socket.pswOptions = {
      playerData: {
        color: randomColor(0.3, 0.99),
        userId: userId || shortId(),
        username
      },
      roomId
    };
    await room.save();
    socket.in(roomId).emit("newChatMessage", newMessage);
  });
  socket.on("disconnect", async () => {
    const {
      pswOptions: {
        roomId,
        playerData: { username }
      }
    } = socket;
    if (roomId) {
      const room = await Room.findOne({ roomId });
      if (!room) return;
      const newMessage = {
        msgId: shortId(),
        message: `User ${username} left the room`,
        timeStamp: Date.now()
      };
      room.chat.push(newMessage);
      await room.save();
      socket.in(roomId).emit("newChatMessage", newMessage);
    }
  });
};
