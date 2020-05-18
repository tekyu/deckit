// @ts-nocheck
import { gameOptions } from '../utils/gameMapping';
import IRoom from '../interfaces/IRoom';
import { getGameOptions } from '../utils/gameMapping';
import hri from 'human-readable-ids';
import cloneDeep from 'clone-deep';
import checkForDuplicate from '../utils/cards/checkForDuplicate';

interface ICreateDeckitOptions {
  gameCode: string;
}

/**
 * TODO:
 * DeckitRoom extends Room
 * Store instances of the rooms in io.deckitRoom
 * or not?
 * DeckitRoom could have methods only for particular game
 * easy scaling
 */
export default class DeckitOptions {
  decks: Array;
  stage: number;
  round: number;
  remainingCards: Array<Object>;
  initialCards: Array<Object>;
  hint: string;
  hinter: Object;
  hintCard: Object;
  maxScore: number;
  choosedCardsToMatchHint: Array<Object>;
  pickedCardsToHint: Array<Object>;
  playersPickedCard: Array<string>;
  playersChoosedCard: Array<string>;
  scoreboard: Object;
  cardTracker: Object<Array>;
  playerModel: Object;

  constructor(gameOptions: Object) {
    this.decks = ['default'];
    this.stage = 0; // 0 - idle | 1 - initialGiveaway | 2 - pickHint | 3 - pickCard | 4 - chooseCards | 5 - awardPoints | 6 - checkGame | 7 - cardShuffle | 8 - ended

    this.round = 0;
    this.remainingCards = [];
    this.hint = '';
    this.hinter = null;
    this.hintCard = {};
    this.maxScore = 30;
    this.choosedCardsToMatchHint = [];
    this.pickedCardsToHint = [];
    this.playersPickedCard = [];
    this.playersChoosedCard = [];
    this.scoreboard = {};
    this.cardTracker = {};
    this.playerModel = {
      id: null,
      nickname: '',
      ranking: 1200,
      avatar: null,
      cards: [],
      score: 0,
    };
    Object.entries(gameOptions).forEach(([key, value]) => {
      this[key] = value;
    });
    this.initialCards = cloneDeep(this.remainingCards);
    console.log('[DeckitOptions] constructor');
  }

  get instance() {
    console.log('[DeckitOptions] get instance');
    return this;
  }

  get view() {
    console.log('[DeckitOptions] get view');
    return {
      decks: this.decks,
      stage: this.stage, // 0 - idle | 1 - initialGiveaway | 2 - pickHint | 3 - pickCard | 4 - chooseCards | 5 - awardPoints | 6 - checkGame | 7 - cardShuffle | 8 - ended
      round: this.round,
      remainingCards: this.remainingCards,
      hint: this.hint,
      hinter: this.hinter,
      maxScore: this.maxScore,
      playersPickedCard: this.playersPickedCard,
      playersChoosedCard: this.playersChoosedCard,
      scoreboard: this.scoreboard,
    };
  }

  get player() {
    console.log('[DeckitOptions] get player');
    return this.playerModel;
  }

  setCards(cards) {
    console.log('[DeckitOptions] setCards');
    this.remainingCards = cards;
  }

  updateCardTracker(playerId = '', cards = [], action = null) {
    console.log('[DeckitOptions] updateCardTracker');
    const flatList = cards.map(({ id }) => id);
    switch (action) {
      case 'add':
        if (!this.cardTracker[playerId]) {
          this.cardTracker[playerId] = [];
        }
        this.cardTracker[playerId] = [
          ...this.cardTracker[playerId],
          ...flatList,
        ];
        break;
      case 'remove':
        flatList.forEach((cardId) => {
          const cardIndex = this.cardTracker[playerId].indexOf(cardId);
          if (cardIndex !== -1) {
            this.cardTracker[playerId].splice(cardIndex, 1);
          }
        });
        break;
      default:
        console.log(`Action of ${action} not found`);
        break;
    }
  }

  removeCardFromList(index: number) {
    console.log('[DeckitOptions] removeCardFromList');
    this.remainingCards.splice(index, 1);
  }

  getRandomCard() {
    console.log('[DeckitOptions] getRandomCard');
    let randomIndex = Math.floor(Math.random() * this.remainingCards.length);
    return { randomCard: this.remainingCards[randomIndex], randomIndex };
  }

  distributeRandomCard(playerId: string) {
    console.log('[DeckitOptions] distributeRandomCard');
    if (!this.remainingCards.length) {
      return null;
    }
    let { randomCard, randomIndex } = this.getRandomCard();
    if (checkForDuplicate(randomCard.id, this.cardTracker[playerId])) {
      return null;
    }
    this.removeCardFromList(randomIndex);
    return randomCard;
  }

  getCardTrackerDifferences() {
    console.log('[DeckitOptions] getCardTrackerDifferences');
    return Object.entries(this.cardTracker).reduce((acc, [id, cards]) => {
      // 6 - hand size
      const diff = 6 - cards.length;
      if (diff !== 0) {
        acc[id] = diff;
      }
      return acc;
    }, {});
  }

  emitUpdatedCards(playerId, cards, io) {
    console.log(
      '[DeckitOptions] emitUpdatedCards',
      playerId,
      cards.length,
      cards
    );
    io.to(playerId).emit('UPDATE_MY_CARDS', cards);
  }

  updateSingleCard(playerId, io) {
    console.log('[DeckitOptions] updateSingleCard');
    const randomCard = this.distributeRandomCard(playerId);
    if (randomCard) {
      this.emitUpdatedCards(playerId, [randomCard], io);
      this.updateCardTracker(playerId, [randomCard], 'add');
      return randomCard;
    }
    return null;
  }

  updateCards(io) {
    console.log('[DeckitOptions] updateCards');
    const cardDifferences = this.getCardTrackerDifferences();
    Object.entries(cardDifferences).forEach(([playerId, diff]: Array<any>) => {
      if (diff > 0) {
        for (let i = 0; i < diff; i++) {
          this.updateSingleCard(playerId.io);
        }
      }
    });
  }

  prepareRoomForNextRound(players) {
    console.log('[DeckitOptions] prepareRoomForNextRound');
    this.hinter = players[this.round % players.length];
    this.hint = null;
    this.hintCard = null;
    this.choosedCardsToMatchHint = [];
    this.pickedCardsToHint = [];
    this.playersPickedCard = [];
    this.playersChoosedCard = [];
    this.round += 1;
    this.stage = 2;
  }
}
