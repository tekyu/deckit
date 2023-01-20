export enum ROOM_MODE {
  public = 'public',
  private = 'private',
  fast = 'fast'
}

export interface IScoreboard {
  [key: string]: number;
}
export interface IPlayer {
  color: string;
  username: string;
  id: string;
  anonymous: boolean;
  state: number;
  score: number;
}

export interface IRoomState {
  mode: ROOM_MODE;
  activeRoomId: string;
  playersMax: number;
  gameCode: string;
  name: string;
  id: string;
  owner: string;
  admin: string;
  players: IPlayer[];
  state: number;
  playerLimit: number;
  scoreboard: IScoreboard;
  winners: string[];
  playAgain: string[];
}

export interface IInitialRoomUpdate {
  mode: ROOM_MODE;
  playersMax: number;
  gameCode: string;
  name: string;
  id: string;
  owner: string;
  admin: string;
  players: IPlayer[];
  state: number;
}

export interface ISetInitialRoomDetailsProps {
  roomDetails: IInitialRoomDetails;
  userState: number;
}

export interface IInitialRoomDetails {
  mode: ROOM_MODE;
  playersMax: number;
  gameCode: string;
  name: string;
  id: string;
  owner: string;
  admin: string;
  players: IPlayer[];
  state: number;
  playerLimit: number;
}

export interface IInitialUserDetails {
  state: number;
  anonymous: boolean;
  id: string;
  username: string;
}

export interface IRoomCreateResponse {
  roomDetails: IInitialRoomDetails;
  userDetails: IInitialUserDetails;
  error?: string;
}

export interface IUserData {
  id: string;
  username: string;
  anonymous: boolean;
}

export interface ICreateRoom {
  userData: IUserData;
}

export interface IJoinRoom {
  roomId: string;
}

export interface IJoinRoomResponse {
  roomDetails?: IInitialRoomDetails;
  error?: string;
}

export interface IChangeState {
  state: number;
}

export interface IChangeStateResponse {
  players: IPlayer[];
  updatedState: number;
  error?: string;
}
