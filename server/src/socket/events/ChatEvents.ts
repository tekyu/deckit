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
  socket.on(
    chatListeners.onSendMessage,
    async ({ message }: { message: String }) => {
      const {
        roomId,
        playerData: { userId, username }
      } = socket.pswOptions;
      const room = await Room.findOne({ roomId });
      if (!room || !message) {
        return;
      }
      const newMessage = {
        msgId: shortId(),
        message,
        authorId: userId,
        author: username,
        timeStamp: Date.now()
      };
      room.chat.push(newMessage);
      await room.save();
      io.in(roomId).emit(chatEmitters.newChatMessage, newMessage);
    }
  );
};
