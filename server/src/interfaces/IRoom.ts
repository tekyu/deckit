export default interface IRoom {
  id: string;
  mode?: string;
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
  players: Array<Object>;
  scoreboard: Object;
  roomOptions: Function;
  connectPlayer: Function;
  disconnectPlayer: Function;
  roomView: Function;
};
