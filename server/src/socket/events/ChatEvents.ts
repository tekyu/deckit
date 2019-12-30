import shortId from "shortid";
// TODO:
const chatListeners = {
  onmessage: "sendingMessage",
  getHistory: "getChatHistory"
};
const chatEmitters = {
  broadcastMessage: "incomingMessage"
};

export const ChatEvents = (socket: any, io: any) => {
  console.log("Chat events");
  socket.on(chatListeners.getHistory, (params: any, callback: Function) => {
    // console.log(chatListeners.getHistory, params, io.gameRooms[params.roomId]);
    // callback(io.gameRooms[params.roomId].chat);
  });
  socket.on(chatListeners.onmessage, ({ roomId, message }) => {
    // {
    //   id: "123g4",
    //   ownerId: "543",
    //   ownerName: "blabla",
    //   timestamp: 1573382238916,
    //   color: "#FFAB87",
    //   avatar: "https://via.placeholder.com/40x40",
    //   message: "blabla"
    // },

    const room = io.gameRooms[roomId];
    const player = socket.pswOptions;
    console.log(chatListeners.onmessage, roomId, message, player);
    // console.log(chatListeners.onmessage, player);
    // console.log(`${chatListeners.onmessage} 2`, socket.pswOptions);
    const newMessage = {
      message,
      id: shortId(),
      timestamp: Date.now()
      //   ownerId: player.id,
      //   ownerName: player.username,
      //   color: player.color,
      //   avatar: player.avatar
    };
    console.log(`${chatListeners.onmessage} newMessage`, newMessage);
    room.chat.push(newMessage);
    io.in(roomId).emit(chatEmitters.broadcastMessage, newMessage);
  });
};
