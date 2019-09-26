import { gameOptions } from "./../utils/gameMapping";
import shortId from "shortid";
import IRoom from "../interfaces/IRoom";
import { getGameOptions } from "../utils/gameMapping";

interface CreateRoomOptions {
  isPublic: boolean;
  playersMax: number;
  gameCode: string;
  name?: string;
  nickname?: string;
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

  constructor(
    {
      isPublic,
      playersMax,
      gameCode,
      gameOptions,
      name = ""
    }: CreateRoomOptions,
    socketId: any
  ) {
    this.isPublic = isPublic;
    this.playersMax = playersMax || 10; // check for max players per game (adjustable in gameMapping)
    this.playersCurrent = 1;
    this.name = name;
    this.gameCode = gameCode;
    this.id = shortId();
    this.owner = socketId;
    this.admin = socketId;
    this.state = 0;
    this.players = [{ id: socketId }];
    this.winners = [];
    this.createdAt = Date.now();
    this.gameOptions = gameOptions
      ? Object.assign(gameOptions, getGameOptions(gameCode))
      : getGameOptions(gameCode);
  }

  get instance() {
    return this;
  }
  get roomOptions() {
    const {
      isPublic,
      playersMax,
      playersCurrent,
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
      isPublic,
      playersMax,
      playersCurrent,
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
    return {
      isPublic,
      playersMax,
      playersCurrent,
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

  connectPlayer(playerData: Object) {
    this.players.push(playerData);
  }

  disconnectPlayer(id: string) {
    this.players = this.players.filter((player: any) => {
      return player.id !== id;
    });
  }
}
