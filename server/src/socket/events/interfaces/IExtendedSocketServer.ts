import SocketIO from 'socket.io';

export interface IExtendedSocketServer extends SocketIO.Server {
  gameRooms: {
    public: any,
    private: any,
    fast: any
  }
}
