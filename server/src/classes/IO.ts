import http from 'http';
import socketIo from 'socket.io';
import Deckit from './Deckit';
import { ROOM_MODE } from './Room';

interface IGameRoom {
  [key: string]: Deckit;
}

export interface IGameRooms {
  public: IGameRoom;
  private: IGameRoom;
  fast: IGameRoom;
}

export interface IExtendedIo extends socketIo.Server {
  gameRooms: IGameRooms;
}

interface IAddRoom {
  room: Deckit;
  mode: ROOM_MODE,
  roomId: string;
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

  addRoom({ room, mode, roomId }: IAddRoom): boolean {
    try {
      this.io.gameRooms[mode][roomId] = room;
      return true;
    } catch {
      return false;
    }
  }

  removeRoom({
    mode,
    roomId,
  }: {
    mode: ROOM_MODE;
    roomId: string;
  }): boolean {
    try {
      delete this.io.gameRooms[mode][roomId];
      return true;
    } catch {
      return false;
    }
  }

  checkIfRoomExist(roomId: string): boolean {
    return !!((this.io.gameRooms.fast[roomId]
      || this.io.gameRooms.private[roomId]
      || this.io.gameRooms.public[roomId]));
  }
}

export default IO;
