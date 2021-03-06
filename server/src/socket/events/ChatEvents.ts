// @ts-nocheck
import shortId from 'shortid';
import getRoom from '../../utils/getRoom';

//TODO:
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
      console.log('room.chat', room.chat);
      callback(room.chat);
    }
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
    console.log(`${chatListeners.onmessage} newMessage`, newMessage);
    // TODO: push chat in room class, based on activeRoomId eg. pushMessageToHistory(activeRoomId)
    room.chat.push(newMessage);
    console.log('room.chat.onmessage', room.chat);
    io.in(activeRoomId).emit(chatEmitters.broadcastMessage, newMessage);
  });
};
