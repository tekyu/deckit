// @ts-nocheck
import { gameOptions } from './../utils/gameMapping';
import IRoom from '../interfaces/IRoom';
import { getGameOptions } from '../utils/gameMapping';
import hri from 'human-readable-ids';
import cloneDeep from 'clone-deep';

interface CreateRoomOptions {
  mode: string;
  playersMax: number;
  gameCode: string;
  name?: string;
  username?: string;
  gameOptions?: Object;
}

/**
 * TODO:
 * DeckitRoom extends Room
 * Store instances of the rooms in io.deckitRoom
 * or not?
 * DeckitRoom could have methods only for particular game
 * easy scaling
 */
export default class Room implements IRoom {
  mode: string; // private | public | fast
  playersMax: number;
  name: string;
  id: string;
  owner: string;
  admin: string;
  gameCode: string;
  state: number; // 0 - waiting | 1 - ready | 2 - started | 3 - paused | 4 - ended
  players: Array<Object>;
  winners: Array<String>;
  createdAt: number;
  gameOptions: any;
  chat: Array<Object>;
  scoreboard: Object;
  pingInterval: Function;

  constructor(
    { mode, playersMax, gameCode, gameOptions, name = '' }: CreateRoomOptions,
    socketId: any
  ) {
    this.mode = mode;
    this.playersMax = playersMax || 10; // check for max players per game (adjustable in gameMapping)
    this.name = name;
    this.gameCode = gameCode;
    this.id = hri.hri.random().split('-').join('');
    this.owner = socketId;
    this.admin = socketId;
    this.state = 0;
    this.players = [];
    this.winners = [];
    this.createdAt = Date.now();
    this.scoreboard = {};
    this.gameOptions = getGameOptions(gameCode, gameOptions);
    this.chat = [];
    // this.pingInterval = () => {};
    console.log('[Room] constructor');
  }

  get instance() {
    console.log('[Room] get instance');
    return this;
  }
  get roomOptions() {
    console.log('[Room] get roomOptions');
    const {
      mode,
      playersMax,
      gameCode,
      name,
      id,
      owner,
      admin,
      state,
      scoreboard,
      players,
      winners,
      createdAt,
    } = this;
    return {
      mode,
      playersMax,
      gameCode,
      name,
      id,
      owner,
      admin,
      state,
      scoreboard,
      players,
      winners,
      createdAt,
    };
  }

  get roomView() {
    console.log('[Room] get roomView');
    const { mode, playersMax, gameCode, name, id, owner, state } = this;
    return {
      mode,
      playersMax,
      gameCode,
      name,
      id,
      owner,
      state,
    };
  }

  setState(newState) {
    console.log('[Room] setState');
    this.state = newState;
  }

  setWinners() {
    console.log('[Room] setWinners');
    this.winners = Object.entries(this.scoreboard).reduce(
      (winners, [id, score]) => {
        if (score >= this.gameOptions.maxScore) {
          winners.push(id);
        }
        return winners;
      },
      []
    );
    return this.winners;
  }

  setCards(cards) {
    console.log('[Room] setCards');
    this.gameOptions.remainingCards = cards;
  }

  async connectPlayer(playerData: Object) {
    console.log('[Room] connectPlayer');
    const newPlayerData = { ...playerData };
    if (this.owner === playerData.id) {
      newPlayerData.state = 1;
    }
    this.players.push(newPlayerData);
    return this.players;
  }

  disconnectPlayer(id: string) {
    console.log('[Room] disconnectPlayer');
    return (this.players = this.players.filter((player: any) => {
      return player.id !== id;
    }));
  }
}
