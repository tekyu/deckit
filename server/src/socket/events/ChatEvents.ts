import shortId from "shortid";
import { Room } from "../../models";

// TODO:
const chatListeners = {
  onSendMessage: "sendingMessage",
  getHistory: "getChatHistory"
};
const chatEmitters = {
  newChatMessage: "newChatMessage"
};

export const ChatEvents = (socket: any, io: any) => {
  console.log("Chat events");
  socket.on(chatListeners.getHistory, (params: any, callback: Function) => {
    // console.log(chatListeners.getHistory, params, io.gameRooms[params.roomId]);
    // callback(io.gameRooms[params.roomId].chat);
  });
  socket.on(
    chatListeners.onSendMessage,
    async ({ message, roomId, userId, username }) => {
      const room = await Room.findOne({ roomId });
      if (!room) {
        return;
      }
      const newMessage = {
        msgId: shortId(),
        message,
        author: userId,
        timestamp: Date.now()
      };
      const player = socket.pswOptions;
      console.log(`${chatListeners.onSendMessage} newMessage`, newMessage);
      await room.chat.push(newMessage);
      io.in(roomId).emit(chatEmitters.newChatMessage, newMessage);
    }
  );
};
