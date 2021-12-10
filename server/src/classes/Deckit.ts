import { uniqBy } from 'lodash';
import { gameTopics } from '../socket/events/GameEvents';
import axios from '../../axios';
import { loggers } from '../loaders/loggers';
import { IExtendedSocketServer } from '../socket/events/interfaces/IExtendedSocketServer';
import Player from './Player';
import Room from './Room';
import { roomTopics } from '../socket/events/RoomEvents';

export interface ICard {
  id: string;
  title: string;
  url: string;
}

interface CreateRoomOptions {
  mode: string;
  playersMax: number;
  gameCode: string;
  name?: string;
  username?: string;
  gameOptions?: Object;
  maxScore?: number;
}

interface IstageMap {
  idle: number;
  initialGiveaway: number;
  pickHint: number;
  pickCard: number;
  chooseCards: number;
  awardPoints: number;
  checkGame: number;
  cardShuffle: number;
  ended: number;
}

const stageMap: IstageMap = {
  idle: 0,
  initialGiveaway: 1,
  pickHint: 2,
  pickCard: 3,
  chooseCards: 4,
  awardPoints: 5,
  checkGame: 6,
  cardShuffle: 7,
  ended: 8,
};

type stageType = keyof IstageMap;

export const initialDecks = [
  { name: 'default', userCreated: false },
];

export interface IDeck {
  name: string;
  userCreated: boolean;
  userId?: string
}

export const deckitTopics = {
  GAME_UPDATED: 'MOONLIGHT-GAME_UPDATED',
};

export default class Deckit extends Room {
  initialDecks: IDeck[];

  decks: IDeck[];

  additionalDecks: IDeck[];

  stage: number;

  round: number;

  remainingCards: ICard[];

  initialCards: ICard[];

  maxScore: number;

  hint: string;

  hinter: Object;

  hintCard: Object;

  choosedCardsToMatchHint: Array<Object>;

  pickedCardsToHint: Array<Object>;

  playersPickedCard: Array<string>;

  playersChoosedCard: Array<string>;

  cardTracker: Object<Array>;

  constructor(props: CreateRoomOptions, ownerId: string, io: IExtendedSocketServer) {
    super(props, ownerId, io);
    this.stage = stageMap.idle;
    this.round = 0;
    this.maxScore = props.maxScore || 60;
    this.initialDecks = initialDecks;
    // this.decks = uniqBy([...this.initialDecks, ...props.decks], 'name');
    this.decks = this.initialDecks;
    this.additionalDecks = [];
    this.remainingCards = [];
    this.initialCards = [];
    this.hint = '';
    this.hinter = {};
    this.hintCard = {};
    this.choosedCardsToMatchHint = [];
    this.pickedCardsToHint = [];
    this.playersPickedCard = [];
    this.playersChoosedCard = [];
    this.scoreboard = {};
    this.cardTracker = {};
  }

  updateDecks(decks: IDeck[]) {
    this.decks = decks;
  }

  updateStage(stage: stageType) {
    if (stage) {
      this.stage = stageMap[stage];
    }
  }

  async loadCards() {
    try {
      const { data: cards } = await axios
        .get('/cards', {
          params: {
            decks: JSON.stringify(this.decks),
          },
        });
      this.initialCards = cards;
      this.remainingCards = cards;
    } catch (e) {
      loggers.event.received.verbose('Error on cards loading');
      this.initialCards = [];
      this.remainingCards = [];
      this.state = 0;
      this.resetPlayersState();
    }
  }

  initScoreboard() {
    this.scoreboard = this.players.reduce((scoreboard, { id }) => ({
      ...scoreboard,
      [id]: 0,
    }), {});
  }

  // DECK

  removeCardFromList(index: number) {
    this.remainingCards.splice(index, 1);
  }

  static checkForDuplicate(cards: ICard[], randomCardId: string) {
    return cards.some(({ id }: ICard) => id === randomCardId);
  }

  getRandomCard() {
    const randomIndex = Math.floor(Math.random() * this.remainingCards.length);
    return { randomCard: this.remainingCards[randomIndex], randomIndex };
  }

  distributeCard(cards: ICard[]) {
    if (!this.remainingCards.length) {
      return null;
    }
    const { randomCard, randomIndex } = this.getRandomCard();
    if (Deckit.checkForDuplicate(cards, randomCard.id)) {
      return null;
    }
    this.removeCardFromList(randomIndex);
    return randomCard;
  }

  distributeCardsToPlayers() {
    this.players = this.players.map((player: Player): Player => {
      const cards = [];
      while (cards.length < 6) {
        if (this.remainingCards.length === 0) {
          break;
        }
        const randomCard = this.distributeCard(cards);
        if (randomCard) {
          cards.push(randomCard);
        }
      }
      player.updateCards(cards);
      return player;
    });
  }

  async startGame() {
    if (!this.arePlayersReady()) {
      return null;
    }

    // cards loaded
    await this.loadCards();
    // distribute cards to players
    this.distributeCardsToPlayers();

    this.initScoreboard();
    // update card tracker
    // ??
    // gameOptions.updateCardTracker(id, cards, 'add');
    // emit updated cards to each player

    this.players.forEach(({ socketId, cards }) => {
      this.io.to(socketId).emit(gameTopics.UPDATE_MY_CARDS, cards);
    });

    this.updateRoomState('started');
    this.updateStage('pickHint');
    this.round = 1;
    this.hinter = {
      username: this.players[0].username,
      id: this.players[0].id,
    };

    this.io.in(this.id).emit(deckitTopics.GAME_UPDATED, {
      remainingCards: this.remainingCards,
      round: this.round,
      stage: this.stage,
      hinter: this.hinter,
      maxScore: this.maxScore,
    });
  }
}
