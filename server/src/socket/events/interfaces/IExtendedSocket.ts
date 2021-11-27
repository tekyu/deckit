import { Socket } from 'socket.io';
import { IDeckitUser } from './IDeckitUser';

export interface ExtendedSocket extends Socket {
  deckitUser: IDeckitUser;
}
