// @ts-nocheck
import { gameOptions } from './../utils/gameMapping';
import IRoom from '../interfaces/IRoom';
import { getGameOptions } from '../utils/gameMapping';
import hri from 'human-readable-ids';

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
export default class Player implements IRoom {
  username: string;
  id: string;
  state: number; // 0 - waiting | 1 - ready | 2 - paused | 3 - hinter | 4 - chooser
  createdAt: number;

  constructor(
    { mode, playersMax, gameCode, gameOptions, name = '' }: CreateRoomOptions,
    socketId: any
  ) {
    this.mode = mode;
    this.playersMax = playersMax || 10; // check for max players per game (adjustable in gameMapping)
    this.name = name;
    this.gameCode = gameCode;
    this.id = hri.hri
      .random()
      .split('-')
      .join('');
    this.owner = socketId;
    this.admin = socketId;
    this.state = 0;
    this.players = [];
    this.winners = [];
    this.createdAt = Date.now();
    this.gameOptions = gameOptions
      ? Object.assign(gameOptions, getGameOptions(gameCode))
      : getGameOptions(gameCode);
    this.chat = [];
  }

  get instance() {
    return this;
  }
  get roomOptions() {
    const {
      mode,
      playersMax,
      gameCode,
      name,
      id,
      owner,
      admin,
      state,
      players,
      winners,
      createdAt
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
      players,
      winners,
      createdAt
    };
  }

  get roomView() {
    const { mode, playersMax, gameCode, name, id, owner, state } = this;
    return {
      mode,
      playersMax,
      gameCode,
      name,
      id,
      owner,
      state
    };
  }

  setWinners(id: string) {
    this.winners.push(id);
  }

  async connectPlayer(playerData: Object) {
    const newPlayerData = { ...playerData };
    if (this.owner === playerData.id) {
      newPlayerData.state = 1;
    }
    return this.players.push(newPlayerData);
  }

  disconnectPlayer(id: string) {
    return (this.players = this.players.filter((player: any) => {
      return player.id !== id;
    }));
  }
}
