import Player from '../classes/Player';
import { ROOM_MODE } from '../classes/Room';
import { IDeckitUser } from '../socket/events/interfaces/IDeckitUser';

export default interface IRoom {
  id: string;
  mode?: ROOM_MODE;
  playersMax: number;
  playersCurrent?: number;
  name?: string;
  owner?: string;
  admin?: string;
  gameCode?: string;
  state: number; // 0 - waiting | 1 - ready | 2 - started | 3 - paused | 4 - ended
  winners?: Array<String>;
  createdAt?: number;
  gameOptions: any;
  chat?: Array<Object>;
  players: Player[];
  scoreboard: Object;
  roomOptions: Function;
  connectPlayer: Function;
  disconnectPlayer: Function;
  roomView: Function;
  MOONLIGHTconnectPlayer: (user: IDeckitUser) => void;
}
