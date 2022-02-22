import axios from '../../axios';
import { loggers } from '../loaders/loggers';
import { gameTopics } from '../socket/events/GameEvents';
import IO from './IO';
import Player, { PlayerState } from './Player';
import Room, { roomState } from './Room';

export interface ICard {
  id: string;
  title: string;
  url: string;
}

interface IHinter {
  username: string;
  id: string;
}
interface CreateRoomOptions {
  mode: 'public' | 'private' | 'fast';
  playersMax: number;
  gameCode: string;
  name?: string;
  username?: string;
  gameOptions?: Object;
  maxScore?: number;
}

export enum gameStage {
  idle = 0,
  initialGiveaway = 1,
  pickHint = 2,
  pickCardFromDeck = 3,
  chooseCardsFromBoard = 4,
  awardPoints = 5,
  checkGame = 6,
  cardShuffle = 7,
  ended = 8,
}

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
  GAME_STARTED: 'MOONLIGHT-GAME_STARTED',
};

export default class Deckit extends Room {
  initialDecks: IDeck[];

  decks: IDeck[];

  additionalDecks: IDeck[];

  stage: gameStage;

  round: number;

  remainingCards: ICard[];

  initialCards: ICard[];

  maxScore: number;

  hint: string;

  hinter: IHinter;

  hintCard: string;

  // Cards picked by non-hinter player that match hint the best
  cardsFromDeck: {
    [id: string]: {
      owner: string;
      id: string;
      pickedBy: string[]
    }
  };

  // Cards picked by non-hinter from pool of cards from previous stage
  // Points will be given based on this property
  cardsFromBoard: {
    [cardId: string]: string[]
  };

  playersPickedCardFromDeck: string[];

  playersPickedCardFromBoard: string[];

  // cardTracker: Object<Array>;

  constructor(props: CreateRoomOptions, ownerId: string) {
    super(props, ownerId);
    this.stage = gameStage.idle;
    this.round = 0;
    this.maxScore = props.maxScore || 60;
    this.initialDecks = initialDecks;
    // this.decks = uniqBy([...this.initialDecks, ...props.decks], 'name');
    this.decks = this.initialDecks;
    this.additionalDecks = [];
    this.remainingCards = [];
    this.initialCards = [];
    this.hint = '';
    this.hinter = { username: '', id: '' };
    this.hintCard = '';
    this.cardsFromDeck = {};
    this.cardsFromBoard = {};
    this.playersPickedCardFromDeck = [];
    this.playersPickedCardFromBoard = [];
    // this.cardTracker = {};
  }

  get info() {
    return {
      stage: this.stage,
      round: this.round,
      maxScore: this.maxScore,
      remainingCards: this.remainingCards.length,
      hint: this.hint,
      hinter: this.hinter,
      hintCard: this.hintCard,
      cardsFromDeck: this.cardsFromDeck,
      cardsFromBoard: this.cardsFromBoard,
      playersPickedCardFromDeck: this.playersPickedCardFromDeck,
      playersPickedCardFromBoard: this.playersPickedCardFromBoard,
    };
  }

  emitUpdateGame(data: { [key: string]: any }) {
    IO.getInstance().io.in(this.id).emit(gameTopics.UPDATE_GAME, data);
  }

  updateDecks(decks: IDeck[]) {
    this.decks = decks;
  }

  updateStage(stage: gameStage) {
    if (stage) {
      this.stage = stage;
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
      IO.getInstance().io.to(player.socketId).emit(gameTopics.UPDATE_MY_CARDS, cards);
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

    // this.players.forEach(({ socketId, cards }) => {
    //   IO.getInstance().io.to(socketId).emit(gameTopics.UPDATE_MY_CARDS, cards);
    // });

    this.updateRoomState(roomState.started);
    this.getPlayersReady();
    this.emitUpdateRoom({
      players: this.players,
    });
    this.updateStage(gameStage.pickHint);
    this.round = 1;
    this.hinter = {
      username: this.players[0].username,
      id: this.players[0].id,
    };
    IO.getInstance().io.in(this.id).emit(deckitTopics.GAME_STARTED, {
      remainingCards: this.remainingCards.length,
      round: this.round,
      stage: this.stage,
      hinter: this.hinter,
      maxScore: this.maxScore,
    });
    return true;
  }

  setHint({ hint, cardId, userId }: { hint: string, cardId: string, userId: string }) {
    this.hint = hint;
    this.hintCard = cardId;
    this.cardsFromDeck[cardId] = {
      id: cardId,
      owner: userId,
      pickedBy: [],
    };

    this.playersPickedCardFromDeck.push(userId);
    this.playersPickedCardFromBoard.push(userId);
  }

  addCardsFromDeck({ cardId, userId }: { cardId: string; userId: string }) {
    this.cardsFromDeck[cardId] = {
      id: cardId,
      owner: userId,
      pickedBy: [],
    };
    if (!this.playersPickedCardFromDeck.some((pid) => pid === userId)) {
      this.playersPickedCardFromDeck.push(userId);
    }
  }

  addCardsFromBoard({ cardId, userId }: { cardId: string; userId: string }) {
    if (this.cardsFromDeck[cardId].pickedBy.some((id) => id === userId)) {
      return;
    }
    this.cardsFromDeck[cardId].pickedBy.push(userId);
    if (!this.playersPickedCardFromBoard.some((pid) => pid === userId)) {
      this.playersPickedCardFromBoard.push(userId);
    }
  }

  getCardsForBoard() {
    return Object.keys(this.cardsFromDeck);
  }

  getCardIdFromDeckByPlayerId(playerId: string): string {
    return Object.values(this.cardsFromDeck).find(({ owner }) => owner === playerId)?.id || '';
  }

  getCardIdFromBoardByPlayerId(playerId: string): string {
    return Object.values(this.cardsFromDeck).find(({ pickedBy }) => pickedBy.some((pid) => pid === playerId))?.id || '';
  }

  calculateRoundPoints() {
    /**
   * RULES
   * If all players found the hinter card
   * * hinter: 0pts, others: 2pts
   * If no players found the hinter card
   * * hinter: 0pts, others: 2pts + bonus per vote
   * If at least one player, but not all have found the hinter card
   * * hinter: 3pts, players who found: 3pts, + bonus per vote
   */

    // If all players found the hinter card
    const hintCardPickedBy = this.cardsFromDeck[this.hintCard].pickedBy;
    if (hintCardPickedBy.length === this.players.length - 1) {
      hintCardPickedBy.forEach((id) => {
        this.scoreboard[id] += 2;
      });

      // If no players found the hinter card
    } else if (hintCardPickedBy.length === 0) {
      Object.values(this.cardsFromDeck).forEach(({ owner, pickedBy }) => {
        if (owner !== this.hinter.id) {
          // 2 base pts + 1 pts per guess
          this.scoreboard[owner] += 2 + pickedBy.length;
        }
      });
      // If at least one player, but not all have found the hinter card
    } else {
      Object.values(this.cardsFromDeck).forEach(({ owner, pickedBy }) => {
        if (owner !== this.hinter.id) {
          // 2 base pts + 1 pts per guess
          this.scoreboard[owner] += 3;
        } else {
          this.scoreboard[owner] += 3 + pickedBy.length;
        }
      });
    }
  }

  setWinners() {
    this.winners = Object.entries(this.scoreboard).reduce(
      (winners: string[], [id, score]) => {
        if (score >= this.maxScore) {
          return [...winners, id];
        }
        return winners;
      },
      [],
    );
  }

  setNextHinter() {
    const playerIndex = this.players.findIndex(({ id }) => id === this.hinter.id);
    const nextHinterIndex = playerIndex + 1 >= this.players.length ? 0 : playerIndex + 1;
    const { id, username } = this.players[nextHinterIndex];
    this.hinter = {
      username,
      id,
    };
    this.hint = '';
    this.hintCard = '';
  }

  resetPickedCards() {
    this.cardsFromDeck = {};
    this.cardsFromBoard = {};
    this.playersPickedCardFromDeck = [];
    this.playersPickedCardFromBoard = [];
  }

  nextRound() {
    this.updateStage(gameStage.awardPoints);
    this.emitUpdateGame({ stage: this.stage });

    this.calculateRoundPoints();
    this.emitUpdateRoom({ scoreboard: this.scoreboard });
    this.setWinners();

    if (this.winners.length > 0) {
      this.endGame();
    } else {
      this.distributeCardsToPlayers();
      this.round += 1;
      this.resetPickedCards();
      this.setNextHinter();
      this.updateStage(gameStage.pickHint);
      this.emitUpdateGame({
        round: this.round,
        stage: this.stage,
        remainingCards: this.remainingCards.length,
        cardsFromDeck: this.cardsFromDeck,
        cardsForBoard: this.cardsFromBoard,
        playersPickedCardFromDeck: this.playersPickedCardFromDeck,
        hintCard: this.hintCard,
        hint: this.hint,
        hinter: this.hinter,
      });
      IO.getInstance().io.in(this.id).emit(gameTopics.NEXT_ROUND, {});
    }
  }

  endGame() {
    this.updateRoomState(roomState.ended);
    this.updateStage(gameStage.ended);
    this.emitUpdateRoom({
      winners: this.winners,
      state: this.state,
    });
    this.emitUpdateGame({
      stage: this.stage,
    });
    IO.getInstance().io.in(this.id).emit(gameTopics.END_GAME, {});
  }

  resetGame() {
    this.stage = gameStage.idle;
    this.round = 0;
    this.decks = this.initialDecks;
    this.additionalDecks = [];
    this.remainingCards = [];
    this.initialCards = [];
    this.hint = '';
    this.hinter = { username: '', id: '' };
    this.hintCard = '';
    this.cardsFromDeck = {};
    this.cardsFromBoard = {};
    this.playersPickedCardFromDeck = [];
    this.playersPickedCardFromBoard = [];
    this.scoreboard = {};
    // this.cardTracker = {};
    this.loadCards();
    this.initScoreboard();
    this.resetRoom();
  }

  async kickDisconnectedPlayers() {
    const disconnectedPlayers = this.players
      .filter(({ state }) => state === PlayerState.left);

    await disconnectedPlayers.forEach(async ({ id: disconnectedId }) => {
      if (disconnectedId === this.hinter.id) {
        this.setNextHinter();
      }
      await this.MOONLIGHTkickPlayer(disconnectedId, false);
    });
    this.distributeCardsToPlayers();
    this.resetPickedCards();
    this.updateRoomState(roomState.started);
    this.emitUpdateRoom({
      players: this.players,
      state: this.state,
    });
    this.emitUpdateGame({
      hinter: this.hinter,
      hint: this.hint,
      hintCard: this.hintCard,
      cardsFromDeck: this.cardsFromDeck,
      cardsFromBoard: this.cardsFromBoard,
      playersPickedCardFromDeck: this.playersPickedCardFromDeck,
      playersPickedCardFromBoard: this.playersPickedCardFromBoard,
    });
    IO.getInstance().io.in(this.id).emit(gameTopics.RESET_ROUND, {});
  }
}
