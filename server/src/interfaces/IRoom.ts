export default interface IRoom {
  isPublic: boolean;
  playersMax: number;
  playersCurrent: number;
  name: string;
  id: string;
  owner: string;
  admin: string;
  gameCode: string;
  state: number; // 0 - waiting | 1 - ready | 2 - started | 3 - paused | 4 - ended
  players: Array<Object>;
  winners: Array<String>;
  createdAt: number;
  gameOptions: Object;
}
