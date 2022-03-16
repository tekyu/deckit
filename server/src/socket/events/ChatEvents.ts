// @ts-nocheck
import shortId from 'shortid';
import getRoom from '../../utils/getRoom';

// TODO:
const chatListeners = {
  onmessage: 'sendingMessage',
  getHistory: 'getChatHistory',
};
const chatEmitters = {
  broadcastMessage: 'incomingChatMessage',
};

export const ChatEvents = (socket: any, io: any) => {
  socket.on(
    chatListeners.getHistory,
    ({ activeRoomId }: any, callback: Function) => {
      const room = getRoom(activeRoomId, io.gameRooms);
      callback(room.chat);
    },
  );

  socket.on(chatListeners.onmessage, ({ activeRoomId, message }) => {
    const room = getRoom(activeRoomId, io.gameRooms);
    const player = socket.pswOptions;
    const newMessage = {
      message,
      id: shortId(),
      timestamp: Date.now(),
      ownerId: player.id,
      ownerName: player.username,
      color: player.color,
      avatar: player.avatar,
    };
    // TODO: push chat in room class, based on activeRoomId eg. pushMessageToHistory(activeRoomId)
    room.chat.push(newMessage);
    io.in(activeRoomId).emit(chatEmitters.broadcastMessage, newMessage);
  });
};
