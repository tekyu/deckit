/* eslint-disable no-param-reassign */
import produce from "immer";
import {
  UPDATE_MY_CARDS,
  UPDATE_GAME_OPTIONS,
  SET_MY_PICKED_CARD,
  SET_MY_CARD,
  INITIAL_GAMEOPTIONS,
  RESET_FOR_NEXT_ROUND
} from "./deckitActions";

export const initialState = {
  myCard: null,
  pickedCard: null,
  score: 0,
  cards: [],
  hinter: {},
  gameOptions: {}
};

export const deckitReducer = produce(
  (draft = initialState, { type, payload }) => {
    switch (type) {
      case UPDATE_MY_CARDS:
        draft.cards = payload;
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
      case INITIAL_GAMEOPTIONS:
        draft = initialState;
        return draft;
      case RESET_FOR_NEXT_ROUND:
        draft.myCard = null;
        draft.pickedCard = null;
        draft.hintCard = null;
        return draft;
      default:
        return draft;
    }
  }
);

export default deckitReducer;
