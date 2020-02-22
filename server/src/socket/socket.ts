import http from 'http';
import socketIo from 'socket.io';
import chalk from 'chalk';
import mockRooms from '../mocks/Rooms';
import { RoomEvents, GameEvents, UserEvents, ChatEvents } from './events';
import getRoomObjectForUpdate from '../utils/getRoomObjectForUpdate';
import getRoom from '../utils/getRoom';

const WAITING_ROOM = 'WAITING_ROOM';
//TODO: Change types
const ioEvents = (io: any) => {
  io.on('connection', (socket: any) => {
    console.log(
      chalk.black.bgBlue(`Connection with socket established for ${socket.id}`)
    );
    socket.pswOptions = {
      rooms: [],
      state: 0 // 0 - waiting | 1 - ready | 3 - paused | 4 - disconnected
    };
    socket.on('getRooms', (data, callback) => {
      socket.join(WAITING_ROOM);
      console.log('getRooms', socket.pswOptions);
      socket.pswOptions.rooms.push(WAITING_ROOM);
      callback(io.gameRooms.public);
    });

    RoomEvents(socket, io);
    GameEvents(socket, io);
    UserEvents(socket, io);
    ChatEvents(socket, io);

    socket.on('disconnect', () => {
      console.log(
        chalk.black.red(
          `${socket.id} disconnected from the server`,
          JSON.stringify(socket.pswOptions.rooms)
        )
      );
      socket.leave(WAITING_ROOM);
      socket.pswOptions.rooms = socket.pswOptions.rooms.filter(
        (id: String) => id !== WAITING_ROOM
      );
      const updatedRooms = socket.pswOptions.rooms.map((id: String) => {
        const room = getRoom(id, io.gameRooms);
        const { players } = room;
        room.disconnectPlayer(socket.pswOptions.id);
        return getRoomObjectForUpdate(room, players > 0 ? 'update' : 'remove');
      });
      if (updatedRooms.length) {
        io.in(WAITING_ROOM).emit('updateListOfRooms', updatedRooms);
      }
    });
  });
};

const SocketIo = App => {
  const port = process.env.SOCKET_PORT || 3012;
  const server = http.createServer();
  const io = socketIo(server);

  io.gameRooms = { public: { ...mockRooms }, private: {}, fast: {} };
  // App.get('/rooms', function(req, res) {
  //   console.log('getrooms', io.gameRooms);
  //   res.render('ShowRooms.ejs', { rooms: io.gameRooms });
  // });

  ioEvents(io);
  server.listen(port, () =>
    console.log(chalk.black.bgGreen(`Socket server listening on port ${port}`))
  );
};

export default SocketIo;
