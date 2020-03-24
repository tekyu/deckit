import { gameOptions } from './../utils/gameMapping';
import shortId from 'shortid';
import IRoom from '../interfaces/IRoom';
import { getGameOptions } from '../utils/gameMapping';
import mockRooms from '../mocks/Rooms';
import hri from 'human-readable-ids';
const mockChat = [];

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
  gameOptions: Object;
  chat: Array<Object>;
  scoreboard: Object;

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
    this.scoreboard = {};
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
      scoreboard,
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
      scoreboard,
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

  setWinners() {
    this.winners = Object.entries(this.scoreboard).filter(([id, score]) => {
      if (score >= this.gameOptions.maxScore) {
        return id;
      }
    });
    return this.winners.length;
  }

  async connectPlayer(playerData: Object) {
    const newPlayerData = { ...playerData };
    if (this.owner === playerData.id) {
      newPlayerData.state = 1;
    }
    console.log('connectPlayer', playerData);
    return this.players.push(newPlayerData);
  }

  disconnectPlayer(id: string) {
    return (this.players = this.players.filter((player: any) => {
      return player.id !== id;
    }));
  }
}
