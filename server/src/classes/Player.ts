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

export default class Player {
  username: string;

  anonymous: boolean;

  id: string;

  color: string;

  state: number;

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

  updateCards(cards: ICard[]) {
    this.cards = cards;
    console.log('[Player][updateCards]', this.cards);
  }

  update(playerData: Partial<typeof Player>): IPlayerBasicInfo {
    Object.entries(playerData).forEach(([key, value]) => {
      if (key !== 'socketId') {
        this[key] = value;
      }
    });
    return this.basicInfo;
  }
}
