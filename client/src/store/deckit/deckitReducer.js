/* eslint-disable no-param-reassign */
import produce from "immer";
import {
  UPDATE_MY_CARDS,
  SET_HINTER,
  UPDATE_GAME_OPTIONS,
  SET_MY_PICKED_CARD
} from "./deckitActions";
// import {
//   SET_ACTIVE_ROOM_ID,
//   SET_ACTIVE_ROOM,
//   UPDATE_ACTIVE_ROOM,
//   UPDATE_ROOMS
// } from "./deckitActions";

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
    console.log("deckitReducer", type, payload);
    switch (type) {
      case UPDATE_MY_CARDS:
        draft.cards = payload;
        return draft;
      case SET_MY_PICKED_CARD:
        draft.pickedCard = payload;
        return draft;
      case UPDATE_GAME_OPTIONS:
        Object.assign(draft, payload);
        return draft;
      default:
        return draft;
    }
  }
);

export default deckitReducer;
