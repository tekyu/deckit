// @ts-nocheck
import hri from 'human-readable-ids';
import cloneDeep from 'clone-deep';
// import { IPlayer } from '../../../client-moonlight/src/store/room/roomSlice';

import { gameOptions, getGameOptions } from '../utils/gameMapping';
import IRoom from '../interfaces/IRoom';
import Player, { IPlayerBasicInfo } from './Player';

interface CreateRoomOptions {
  mode: string;
  playersMax: number;
  gameCode: string;
  name?: string;
  username?: string;
  gameOptions?: Object;
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

  state: number; // 0 - waiting | 1 - ready | 2 - started | 3 - paused | 4 - ended

  players: Player[];

  winners: Array<String>;

  createdAt: number;

  gameOptions: any;

  chat: Array<Object>;

  scoreboard: Object;

  pingInterval: Function;

  // MOONLIGHTconnectPlayer: (userDetails: IConnectPlayer) => IConnectPlayerReturn

  constructor(
    {
      mode, playersMax, gameCode, gameOptions, name = '',
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
    this.state = 0;
    this.players = [];
    this.winners = [];
    this.createdAt = Date.now();
    this.scoreboard = {};
    this.gameOptions = getGameOptions(gameCode, gameOptions);
    this.chat = [];
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
      gameOptions,
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
      gameOptions: {
        hinter: gameOptions.hinter,
        hintCard: gameOptions.hintCard,
        hint: gameOptions.hint,
        initialCards: gameOptions.initialCards,
        maxScore: gameOptions.maxScore,
        pickedCardsToHint: gameOptions.pickedCardsToHint,
        playersChoosedCard: gameOptions.playersChoosedCard,
        playersPickedCard: gameOptions.playersPickedCard,
        remainingCards: gameOptions.remainingCards,
        round: gameOptions.round,
        stage: gameOptions.stage,
      },
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

  setState(newState) {
    this.state = newState;
  }

  setWinners() {
    this.winners = Object.entries(this.scoreboard).reduce(
      (winners, [id, score]) => {
        if (score >= this.gameOptions.maxScore) {
          winners.push(id);
        }
        return winners;
      },
      [],
    );
    return this.winners;
  }

  setCards(cards) {
    this.gameOptions.remainingCards = cards;
  }

  async connectPlayer(playerData: Object) {
    console.log('connectPlayer', playerData);
    const newPlayerData = { ...playerData };
    if (this.owner === playerData.id) {
      newPlayerData.state = 1;
    }
    this.players.push(newPlayerData);
    return this.players;
  }

  disconnectPlayer(id: string) {
    return (this.players = this.players.filter((player: any) => player.id !== id));
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
      return { newPlayerData: newPlayer.basicInfo, players: this.players };
    } catch (e) {
      throw Error(e);
    }
  }

  async MOONLIGHTdisconnectPlayer(playerId: string): IDisconnectPlayerReturn {
    const disconnectedPlayer = this.players.find(({ id }) => id === playerId);
    const newPlayers = this.players.filter(({ id }) => id !== playerId);
    this.players = newPlayers;
    return {
      players: newPlayers,
      disconnectedPlayer,
    };
  }

  async MOONLIGHTupdatePlayer({ playerId, playerData }: MOONLIGHTIUpdatePlayer) {
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
}
