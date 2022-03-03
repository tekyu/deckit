import hri from 'human-readable-ids';

import Player, { IPlayerBasicInfo, PlayerState } from './Player';
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

type ModeType = 'public' | 'private' | 'fast';

interface CreateRoomOptions {
  mode: ModeType;
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
  players?: Player[];
  newPlayerData?: IPlayerBasicInfo;
  error?: 'blacklisted' | 'undefined' | 'noroom' | 'started' | 'full';
}

interface IDisconnectPlayerReturn {
  players: Player[];
  disconnectedPlayer?: IPlayerBasicInfo;
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
export default class Room {
  mode: ModeType;

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
      scoreboard,
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
      scoreboard,
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

  setState(newState: roomState) {
    this.state = newState;
  }

  // setCards(cards: ) {
  //   this.remainingCards = cards;
  // }

  isOwner(playerId: string) {
    return this.owner === playerId;
  }

  changeOwnership(playerId?: string) {
    if (playerId) {
      this.owner = playerId;
      this.admin = playerId;
    }
    const eligiblePlayers = this.players
      .filter(({ state }) => state !== PlayerState.left);

    if (eligiblePlayers.length > 0) {
      this.owner = eligiblePlayers[0].id;
      this.admin = eligiblePlayers[0].id;
    }
  }

  updateNumberOfSeats(action: 'add' | 'remove') {
    if (action === 'add' && this.playersMax < this.playerLimit) {
      this.playersMax += 1;
    }
    if (action === 'remove' && this.playersMax > 0) {
      this.playersMax -= 1;
    }
  }

  async MOONLIGHTconnectPlayer({
    username,
    id,
    anonymous,
    color,
    socketId,
  }: IConnectPlayer): Promise<IConnectPlayerReturn> {
    if (this.blacklistedPlayers.some((playerId) => playerId === id)) {
      return { error: 'blacklisted' };
    }
    try {
      const newPlayer = new Player({
        username,
        id,
        anonymous,
        color,
        state: this.owner === id ? PlayerState.ready : PlayerState.connected,
        socketId,
      });
      this.players.push(newPlayer);
      return { newPlayerData: newPlayer, players: this.players };
    } catch (error) {
      // @ts-ignore
      throw Error(error || 'Something went wrong');
    }
  }

  async MOONLIGHTdisconnectPlayer(
    playerId: string,
    forceKick: boolean = false,
  ): Promise<IDisconnectPlayerReturn> {
    const disconnectedPlayer = this.players.find(({ id }) => id === playerId);

    if (!disconnectedPlayer) {
      return {
        players: this.players,
      };
    }
    disconnectedPlayer.updateState(PlayerState.left);

    const kickImmediately = this.state === roomState.waiting
      || this.state === roomState.ready;

    if (this.isOwner(disconnectedPlayer.id)) {
      this.changeOwnership();
    }

    // remove player from room
    if (forceKick || kickImmediately) {
      const newPlayers = this.players.filter(({ id }) => id !== playerId);
      this.players = newPlayers;
      return {
        players: newPlayers,
        disconnectedPlayer,
      };
    }

    // change player state to left and wait for action
    // actions:
    // 1. player reconnects
    // 2. owner is kicking the player
    this.players = this.players.map(
      (singlePlayer) => (singlePlayer.id === disconnectedPlayer.id
        ? disconnectedPlayer
        : singlePlayer),
    );

    if (this.state === roomState.started) {
      this.updateRoomState(roomState.paused);
    }

    return {
      players: this.players,
      disconnectedPlayer,
    };
  }

  async MOONLIGHTkickPlayer(playerId: string, blacklist: boolean = true) {
    if (blacklist) {
      this.blacklistedPlayers.push(playerId);
    }
    return this.MOONLIGHTdisconnectPlayer(playerId, true);
  }

  async MOONLIGHTupdatePlayer({ playerId, playerData }: MOONLIGHTIUpdatePlayer): Promise<Player[]> {
    const playerToUpdate = this.players.find(({ id }) => id === playerId);
    if (!playerToUpdate) {
      return this.players;
    }

    const updatedPlayer = playerToUpdate.update(playerData);
    this.players.map((player) => {
      if (player.id === playerId) {
        return updatedPlayer;
      }
      return player;
    });

    return this.players;
  }

  getPlayer(playerId?: string): Player | undefined {
    if (!playerId) {
      return undefined;
    }
    return this.players.find(({ id }) => id === playerId);
  }

  async getPublicPlayers() {
    return this.players.map((player) => player.getPublicInfo());
  }

  arePlayersReady(): boolean {
    return !this.players.some(
      ({ state }) => state === PlayerState.connected || state === PlayerState.left,
    );
  }

  getPlayersReady() {
    this.players.map((player) => {
      player.updateState(PlayerState.playing);
      return player;
    });
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
    this.players.forEach((player) => {
      player.updateState(PlayerState.connected);
    });
  }

  updatePlayAgain(playerId: string) {
    const playerIndex = this.playAgain.indexOf(playerId);
    if (playerIndex === -1) {
      this.playAgain.push(playerId);
    }
  }

  resetRoom() {
    this.state = roomState.waiting;
    this.playAgain = [];
    this.resetPlayersState();
    this.emitUpdateRoom(this.basicInfo);
  }
}
