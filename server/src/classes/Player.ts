import { IDeckitUser } from '../socket/events/interfaces/IDeckitUser';
import { ICard } from './Deckit';

interface ICreatePlayer extends IDeckitUser {
  state?: number;
}

export interface IPlayerBasicInfo {
  username: string;
  anonymous: boolean;
  id: string;
  color: string;
  state: number;
  socketId: string;
}

export enum PlayerState {
  connected = 0,
  ready = 1,
  playing = 2,
  left = 3
}

export default class Player {
  username: string;

  anonymous: boolean;

  id: string;

  color: string;

  state: PlayerState;

  score: number;

  socketId: string;

  cards: ICard[];

  constructor({
    username,
    anonymous,
    id,
    color = '#000',
    state = 0,
    socketId,
  }: ICreatePlayer) {
    this.username = username;
    this.anonymous = anonymous;
    this.id = id;
    this.color = color;
    this.score = 0;
    this.state = state;
    this.socketId = socketId;
    this.cards = [];
  }

  get basicInfo(): IPlayerBasicInfo {
    return {
      username: this.username,
      anonymous: this.anonymous,
      id: this.id,
      color: this.color,
      state: this.state,
      socketId: this.socketId,
    };
  }

  updateState(state: PlayerState) {
    this.state = state;
  }

  updateCards(cards: ICard[]) {
    this.cards = cards;
  }

  update(playerData: Partial<Player>): Player {
    Object.entries(playerData).forEach(([key, value]) => {
      if (key !== 'socketId') {
        this[key] = value;
      }
    });
    return this;
  }

  getPublicInfo() {
    return this.basicInfo;
  }
}
