/* eslint-disable no-param-reassign */
import produce from "immer";
import {
  UPDATE_MY_CARDS,
  UPDATE_GAME_OPTIONS,
  SET_MY_PICKED_CARD,
  SET_MY_CARD,
  INITIAL_GAME_OPTIONS,
  RESET_FOR_NEXT_ROUND,
  BLOCK_HAND,
  UNBLOCK_HAND,
  BLOCK_PICKINGAREA,
  UNBLOCK_PICKINGAREA,
  REMOVE_FROM_HAND,
} from "./deckitActions";

export const initialState = {
  myCard: null,
  pickedCard: null,
  score: 0,
  cards: [],
  hinter: {},
  gameOptions: {},
  blockHand: false,
  blockPickingArea: false,
};

export const deckitReducer = produce(
  (draft = initialState, { type, payload }) => {
    switch (type) {
      case UPDATE_MY_CARDS:
        draft.cards = [...draft.cards, ...payload];
        return draft;
      case SET_MY_PICKED_CARD:
        draft.pickedCard = payload;
        return draft;
      case SET_MY_CARD:
        draft.myCard = payload;
        return draft;
      case UPDATE_GAME_OPTIONS:
        Object.assign(draft, payload);
        return draft;
      case INITIAL_GAME_OPTIONS:
        draft = initialState;
        return draft;
      case RESET_FOR_NEXT_ROUND:
        draft.myCard = null;
        draft.pickedCard = null;
        draft.hintCard = null;
        return draft;
      case BLOCK_HAND:
        draft.blockHand = true;
        return draft;
      case UNBLOCK_HAND:
        draft.blockHand = false;
        return draft;
      case BLOCK_PICKINGAREA:
        draft.blockPickingArea = true;
        return draft;
      case UNBLOCK_PICKINGAREA:
        draft.blockPickingArea = false;
        return draft;
      case REMOVE_FROM_HAND:
        draft.cards = draft.cards.filter((card) => card.id !== payload.id);
        return draft;
      default:
        return draft;
    }
  },
);

export default deckitReducer;
