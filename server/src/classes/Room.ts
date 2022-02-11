// @ts-nocheck
import hri from 'human-readable-ids';

import IRoom from '../interfaces/IRoom';
import Player, { IPlayerBasicInfo } from './Player';
import { roomTopics } from '../socket/events/RoomEvents';
import IO from './IO';

interface IScoreboard {
  [key: string]: number;
}

export enum roomState {
  waiting = 0,
  ready = 1,
  started = 2,
  paused = 3,
  ended = 4
}

interface CreateRoomOptions {
  mode: string;
  playersMax: number;
  gameCode: string;
  name?: string;
  username?: string;
  maxScore?: number;
}

interface IConnectPlayer {
  username: string;
  id: string;
  anonymous: boolean;
  color?: string;
  socketId: string;
}

interface IConnectPlayerReturn {
  players: Player[];
  newPlayerData: IPlayerBasicInfo;
  error?: 'blacklisted' | 'undefined' | 'noroom' | 'started' | 'full';
}

interface IDisconnectPlayerReturn {
  players: Player[];
  disconnectedPlayer: IPlayerBasicInfo;
}

interface MOONLIGHTIUpdatePlayer {
  playerId: string;
  playerData: Partial<Player>
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

  state: roomState; // 0 - waiting | 1 - ready | 2 - started | 3 - paused | 4 - ended

  players: Player[];

  winners: Array<String>;

  createdAt: number;

  chat: Array<Object>;

  scoreboard: IScoreboard;

  pingInterval: Function;

  playerLimit: number;

  blacklistedPlayers: string[];

  playAgain: string[];

  // MOONLIGHTconnectPlayer: (userDetails: IConnectPlayer) => IConnectPlayerReturn

  constructor(
    {
      mode, playersMax, gameCode, name = '',
    }: CreateRoomOptions,
    ownerId: string,
  ) {
    this.mode = mode;
    this.playersMax = playersMax || 10; // check for max players per game(adjustable in gameMapping)
    this.name = name;
    this.gameCode = gameCode;
    this.id = hri.hri.random().split('-').join('');
    this.owner = ownerId;
    this.admin = ownerId;
    this.state = roomState.waiting;
    this.players = [];
    this.winners = [];
    this.createdAt = Date.now();
    this.scoreboard = {};
    this.chat = [];
    this.playerLimit = 10;
    this.blacklistedPlayers = [];
    this.playAgain = [];
  }

  get instance() {
    return this;
  }

  get basicInfo() {
    const {
      mode,
      playersMax,
      gameCode,
      name,
      id,
      owner,
      admin,
      players,
      state,
      playerLimit,
    } = this;
    return {
      mode,
      playersMax,
      gameCode,
      name,
      id,
      owner,
      admin,
      players,
      state,
      playerLimit,
    };
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
    const {
      admin,
      chat,
      createdAt,
      gameCode,
      id,
      mode,
      name,
      owner,
      players,
      playersMax,
      scoreboard,
      state,
      winners,
    } = this;
    return {
      admin,
      chat,
      createdAt,
      gameCode,
      id,
      mode,
      name,
      owner,
      players,
      playersMax,
      scoreboard,
      state,
      winners,
    };
  }

  emitUpdateRoom(data: { [key: string]: any }) {
    IO.getInstance().io.in(this.id).emit(roomTopics.UPDATE_ROOM, data);
  }

  setState(newState) {
    this.state = newState;
  }

  setCards(cards) {
    this.remainingCards = cards;
  }

  updateNumberOfSeats(action: 'add' | 'remove') {
    if (action === 'add' && this.playersMax < this.playerLimit) {
      this.playersMax += 1;
    }
    if (action === 'remove' && this.playersMax > 0) {
      this.playersMax -= 1;
    }
  }

  // 2.0
  //
  //
  //
  //
  //
  //

  async MOONLIGHTconnectPlayer({
    username,
    id,
    anonymous,
    color,
    socketId,
  }: IConnectPlayer): IConnectPlayerReturn {
    if (this.blacklistedPlayers.some((playerId) => playerId === id)) {
      return { error: 'blacklisted' };
    }
    try {
      const newPlayer = new Player({
        username,
        id,
        anonymous,
        color,
        state: this.owner === id ? 1 : 0,
        socketId,
      });
      this.players.push(newPlayer);
      return { newPlayerData: newPlayer, players: this.players };
    } catch (e) {
      throw Error(e);
    }
  }

  async MOONLIGHTdisconnectPlayer(
    playerId: string,
  ): IDisconnectPlayerReturn {
    const disconnectedPlayer = this.players.find(({ id }) => id === playerId);
    const newPlayers = this.players.filter(({ id }) => id !== playerId);
    this.players = newPlayers;
    return {
      players: newPlayers,
      disconnectedPlayer,
    };
  }

  async MOONLIGHTkickPlayer(playerId: string) {
    this.blacklistedPlayers.push(playerId);
    return this.MOONLIGHTdisconnectPlayer(playerId);
  }

  async MOONLIGHTupdatePlayer({ playerId, playerData }: MOONLIGHTIUpdatePlayer): Player[] {
    const playerToUpdate = this.players.find(({ id }) => id === playerId);
    const updatedPlayer = playerToUpdate.update(playerData);
    this.players.map((player) => {
      if (player.id === playerId) {
        return updatedPlayer;
      }
      return player;
    });
    return this.players;
  }

  arePlayersReady(): boolean {
    return !this.players.some(({ state }) => state !== 1);
  }

  updateRoomState(state?: roomState): number {
    if (state) {
      this.state = state;
      return this.state;
    }
    if (this.state <= 1) {
      this.state = this.arePlayersReady() ? roomState.ready : roomState.waiting;
      return this.state;
    }
    return this.state;
  }

  resetPlayersState() {
    this.players = this.players.map((player) => ({ ...player, state: 0 }));
  }

  updatePlayAgain(playerId: string) {
    const playerIndex = this.playAgain.indexOf(playerId);
    if (playerIndex === -1) {
      this.playAgain = [...this.playAgain, playerId];
    } else {
      this.playAgain = this.playAgain.filter((pid) => pid !== playerId);
    }
  }

  resetRoom() {
    this.state = roomState.waiting;
    this.playAgain = [];
    this.resetPlayersState();
  }
}
