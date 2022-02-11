import http from 'http';
import socketIo from 'socket.io';

export interface IGameRooms {
  public: any;
  private: any;
  fast: any;
}

export interface IExtendedIo extends socketIo.Server {
  gameRooms: IGameRooms;
}

class IO {
  static instance: IO;

  port: string | number;

  server: http.Server;

  pingTimeout: number;

  pingInterval: number;

  io: IExtendedIo;

  private constructor() {
    this.port = process.env.SOCKET_PORT || 3012;
    this.server = http.createServer();
    this.pingTimeout = 300000; // 5 minutes
    this.pingInterval = 5000; // 5 seconds

    this.io = <IExtendedIo>socketIo(this.server, {
      pingTimeout: this.pingTimeout,
      pingInterval: this.pingInterval,
    });
    this.io.gameRooms = {
      public: {},
      private: {},
      fast: {},
    };
  }

  static getInstance(): IO {
    if (!IO.instance) {
      IO.instance = new IO();
    }
    return IO.instance;
  }
}

export default IO;
