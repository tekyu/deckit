import shortId from "shortid";
import { gameOptions, getGameOptions } from "../utils/gameMapping";
import IRoom from "../interfaces/IRoom";

import mockRooms from "../mocks/Rooms";

const mockChat = [
  {
    id: "12qw34",
    ownerId: "5qw43",
    ownerName: "blabla",
    timestamp: 1573382208916,
    color: "#FFAB87",
    avatar: "https://via.placeholder.com/40x40",
    message: "blabla"
  },
  {
    id: "12q34",
    ownerId: "543qwe",
    ownerName: "blabla",
    timestamp: 1573382218917,
    color: "#FFAB87",
    avatar: "https://via.placeholder.com/40x40",
    message: "blabla"
  },
  {
    id: "12d34",
    ownerId: "543",
    ownerName: "blabla",
    timestamp: 1573382228918,
    color: "#FFAB87",
    avatar: "https://via.placeholder.com/40x40",
    message: "blabla"
  },
  {
    id: "123g4",
    ownerId: "543",
    ownerName: "blabla",
    timestamp: 1573382238916,
    color: "#FFAB87",
    avatar: "https://via.placeholder.com/40x40",
    message: "blabla"
  },
  {
    id: "123h4",
    ownerId: "543",
    ownerName: "blabla",
    timestamp: 1573382248916,
    color: "#FFAB87",
    avatar: "https://via.placeholder.com/40x40",
    message: "blabla"
  },
  {
    id: "123cc4",
    ownerId: "5qqe43",
    ownerName: "blabla",
    timestamp: 1573382258916,
    color: "#FFAB87",
    avatar: "https://via.placeholder.com/40x40",
    message: "blabla"
  },
  {
    id: "12ss34",
    ownerId: "543",
    ownerName: "blabla",
    timestamp: 1573382268916,
    color: "#FFAB87",
    avatar: "https://via.placeholder.com/40x40",
    message: "blabla"
  },
  {
    id: "123sa4",
    ownerId: "5423",
    ownerName: "blabla1",
    timestamp: 1573382278916,
    color: "#FFAB87",
    avatar: "https://via.placeholder.com/40x40",
    message: "blabla"
  },
  {
    id: "123gdf4",
    ownerId: "567543",
    ownerName: "blabla2",
    timestamp: 1573382288916,
    color: "#FFAB87",
    avatar: "https://via.placeholder.com/40x40",
    message: "blabla"
  },
  {
    id: "123ytht4",
    ownerId: "234543", // ownerId should be an object, returned from server; reduce computing on front side
    ownerName: "blabla3",
    timestamp: 1573382298916,
    color: "#FFAB87",
    avatar: "https://via.placeholder.com/40x40",
    message: "blablanbvdesr dfdgdgdfdfd fdsfdsfdsfdf sfsdfsdfsdfs"
  }
];

interface CreateRoomOptions {
  isPublic: boolean;
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

  chat: Array<Object>;

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
    this.chat = mockChat;
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
    const {
      isPublic,
      playersMax,
      playersCurrent,
      gameCode,
      name,
      id,
      owner,
      state
    } = this;
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
    this.players = this.players.filter((player: any) => player.id !== id);
  }
}
