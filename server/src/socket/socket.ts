import http from 'http';
import socketIo from 'socket.io';
import {
  RoomEvents, GameEvents, UserEvents, ChatEvents,
} from './events';
import getRoomObjectForUpdate from '../utils/getRoomObjectForUpdate';
import getRoom from '../utils/getRoom';
import logger from '../loaders/logger';

const WAITING_ROOM = 'WAITING_ROOM';
// TODO: Change types
const ioEvents = (io: any) => {
  io.on('connection', (socket: any) => {
    logger.info(`Connection with socket established for ${socket.id}`);
    socket.pswOptions = {
      rooms: [],
      socketId: socket.id,
      state: 0, // 0 - waiting | 1 - ready | 3 - paused | 4 - disconnected
    };
    socket.on('getRooms', (data: any, callback: any) => {
      socket.join(WAITING_ROOM);
      socket.pswOptions.rooms.push(WAITING_ROOM);
      const filteredRooms = Object.entries(io.gameRooms.public).reduce(
        (newRooms, [id, room]) => {
          // @ts-ignore
          if (room.state < 2) {
            newRooms[id] = room;
          }
          return newRooms;
        },
        {},
      );
      // TODO: REFACTOR THIS ON BACKEND, SENDING TOO MUCH INFO
      // CREATE A FUNCTION WHICH RETURNS ROOM OBJECT THAT
      // SHOULD BE VISIBLE FOR PUBLIC EYES
      // WITHOUT BACKEND SPECIFIC PROPS
      callback(filteredRooms);
    });

    RoomEvents(socket, io);
    GameEvents(socket, io);
    UserEvents(socket, io);
    ChatEvents(socket, io);

    socket.on('disconnect', () => {
      logger.info(`${socket.id} disconnected from the server`);
      socket.leave(WAITING_ROOM);
      socket.pswOptions.rooms = socket.pswOptions.rooms.filter(
        (id: String) => id !== WAITING_ROOM,
      );
      const updatedRooms = socket.pswOptions.rooms.map((id: String) => {
        const room = getRoom(id, io.gameRooms);
        // @ts-ignore
        const { players } = room;
        // @ts-ignore
        room.disconnectPlayer(socket.pswOptions.id);
        io.in(id).emit('ROOM_UPDATED', { players });
        return getRoomObjectForUpdate(room, players > 0 ? 'update' : 'remove');
      });
      if (updatedRooms.length) {
        io.in(WAITING_ROOM).emit('updateListOfRooms', updatedRooms);
      }
    });
  });
};

const SocketIo = (App: any) => {
  const port = process.env.SOCKET_PORT || 3012;
  const server = http.createServer();
  const io = socketIo(server);

  // @ts-ignore
  io.eio.pingTimeout = 300000; // 5 minutes
  // @ts-ignore
  io.eio.pingInterval = 5000; // 5 seconds

  // @ts-ignore
  io.gameRooms = { public: {}, private: {}, fast: {} };

  ioEvents(io);
  server.listen(port, () => logger.info(`Socket server listening on port ${port}`));
};

export default SocketIo;
