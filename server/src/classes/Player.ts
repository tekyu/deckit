import { IDeckitUser } from '../socket/events/interfaces/IDeckitUser';

interface ICreatePlayer extends IDeckitUser {
  state?: number;
}

export interface IPlayerBasicInfo {
  username: string;
  anonymous: boolean;
  id: string;
  color: string;
  state: number;
}

export default class Player {
  username: string;

  anonymous: boolean;

  id: string;

  color: string;

  state: number;

  score: number;

  constructor({
    username,
    anonymous,
    id,
    color = '#000',
    state = 0,
  }: ICreatePlayer) {
    this.username = username;
    this.anonymous = anonymous;
    this.id = id;
    this.color = color;
    this.score = 0;
    this.state = state;
  }

  get basicInfo(): IPlayerBasicInfo {
    return {
      username: this.username,
      anonymous: this.anonymous,
      id: this.id,
      color: this.color,
      state: this.state,
    };
  }
}
