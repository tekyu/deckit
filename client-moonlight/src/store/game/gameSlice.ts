import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'store/store';

export interface ICard {
  id: string;
  title: string;
  url: string;
}

export interface IHinter {
  username: string;
  id: string;
}

export interface IGameState {
  remainingCards: number;
  hinter: IHinter;
  stage: number;
  round: number;
  myCards: ICard[];
  maxScore: number;
  hintPickedByMe: string;
  hintCardPickedByMe: string;
  pickedCardFromMyDeck: string;
  pickedCardFromBoard: string;
  playersPickedCardFromDeck: string[];
  playersPickedCardFromBoard: string[];
  cardsForBoard: string[];
  hint: string;
}

export interface IInitializeGame {
  remainingCards: number;
  hinter: IHinter;
  stage: number;
  round: number;
  myCards: ICard[];
  maxScore: number;
}

export interface IUpdateMyCards {
  myCards: ICard[];
}

const initialState: IGameState = {
  remainingCards: 0,
  hinter: {
    id: '',
    username: '',
  },
  stage: 0,
  round: 0,
  myCards: [],
  maxScore: 60,
  hintPickedByMe: '',
  hintCardPickedByMe: '',
  pickedCardFromMyDeck: '',
  pickedCardFromBoard: '',
  cardsForBoard: [],
  playersPickedCardFromDeck: [],
  playersPickedCardFromBoard: [],
  hint: '',
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    initializeGame(state: IGameState, { payload }: { payload: IInitializeGame }) {
      state.remainingCards = payload.remainingCards;
      state.hinter = payload.hinter;
      state.stage = payload.stage;
      state.round = payload.round;
      state.maxScore = payload.maxScore;
    },
    updateMyCards(state: IGameState, { payload }: { payload: IUpdateMyCards }) {
      state.myCards = payload.myCards;
    },
    setHintPickedByMe(state: IGameState, { payload }: { payload: { hint: string } }) {
      state.hintPickedByMe = payload.hint;
    },
    setHintCardPickedByMe(state: IGameState, { payload }: { payload: { id: string } }) {
      state.hintCardPickedByMe = payload.id;
    },
    setPickedCardFromMyDeck(state: IGameState, { payload }: { payload: { id: string } }) {
      state.pickedCardFromMyDeck = payload.id;
    },
    setPickedCardFromBoard(state: IGameState, { payload }: { payload: { id: string } }) {
      state.pickedCardFromBoard = payload.id;
    },
    updateGame(state: IGameState, { payload }: { payload: Partial<IGameState> }) {
      Object.entries(payload as []).forEach(([key, value]) => {
        const typedKey = key as keyof IGameState;
        state[typedKey] = value;
      });
    },
    resetForNextRound(state: IGameState) {
      state.hintPickedByMe = '';
      state.hintCardPickedByMe = '';
      state.pickedCardFromMyDeck = '';
      state.pickedCardFromBoard = '';
      state.playersPickedCardFromDeck = [];
      state.playersPickedCardFromBoard = [];
      state.hint = '';
    },
  },
});

const { actions: gameActions, reducer: gameReducer } = gameSlice;

const gameSelectors = {
  game: (state: RootState): IGameState => state.game,
  remainingCards: (state: RootState): number => state.game.remainingCards,
  hinter: (state: RootState): IHinter => state.game.hinter,
  stage: (state: RootState): number => state.game.stage,
  round: (state: RootState): number => state.game.round,
  myCards: (state: RootState): ICard[] => state.game.myCards,
  maxScore: (state: RootState): number => state.game.maxScore,
  hintPickedByMe: (state: RootState): string => state.game.hintPickedByMe,
  hintCardPickedByMe: (state: RootState): string => state.game.hintCardPickedByMe,
  pickedCardFromMyDeck: (state: RootState): string => state.game.pickedCardFromMyDeck,
  pickedCardFromBoard: (state: RootState): string => state.game.pickedCardFromBoard,
  cardsForBoard: (state: RootState): string[] => state.game.cardsForBoard,
  playersPickedCardFromDeck: (state: RootState): string[] => state.game.playersPickedCardFromDeck,
  playersPickedCardFromBoard: (state: RootState): string[] => state.game.playersPickedCardFromBoard,

  hint: (state: RootState): string => state.game.hint,
};

export { gameActions, gameReducer, gameSelectors };
