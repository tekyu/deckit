import { emitter, listener } from "store/socket/socketActions";
import { removeListener } from "../socket/socketActions";

export const PICKED_CARD_TO_HINT = `PICKED_CARD_TO_HINT`;
export const SENT_HINT = `SENT_HINT`;
export const SENT_HINT_CARD = `SENT_HINT_CARD`;
export const CHOSEN_CARD_TO_MATCH_HINT = `CHOSEN_CARD_TO_MATCH_HINT`;
export const UPDATE_MY_CARDS = `UPDATE_MY_CARDS`;
export const SET_HINTER = `SET_HINTER`;
export const UPDATE_GAME_OPTIONS = `UPDATE_GAME_OPTIONS`;
export const SET_MY_PICKED_CARD = `SET_MY_PICKED_CARD`;
export const SET_MY_CARD = `SET_MY_CARD`;
export const INITIAL_GAME_OPTIONS = `INITIAL_GAME_OPTIONS`;
export const RESET_FOR_NEXT_ROUND = `RESET_FOR_NEXT_ROUND`;
export const UNBLOCK_HAND = `UNBLOCK_HAND`;
export const BLOCK_HAND = `BLOCK_HAND`;
export const UNBLOCK_PICKINGAREA = `UNBLOCK_PICKINGAREA`;
export const BLOCK_PICKINGAREA = `BLOCK_PICKINGAREA`;
export const REMOVE_FROM_HAND = `REMOVE_FROM_HAND`;

export const blockHand = () => (dispatch) => {
  dispatch({
    type: BLOCK_HAND,
  });
};

export const unblockHand = () => (dispatch) => {
  dispatch({
    type: UNBLOCK_HAND,
  });
};

export const blockPickingArea = () => (dispatch) => {
  dispatch({
    type: BLOCK_PICKINGAREA,
  });
};

export const unblockPickingArea = () => (dispatch) => {
  dispatch({
    type: UNBLOCK_PICKINGAREA,
  });
};

export const pickMyCard = ({ activeRoomId, card }) => (dispatch) => {
  dispatch(emitter(PICKED_CARD_TO_HINT, { activeRoomId, card }));
  dispatch({
    type: SET_MY_PICKED_CARD,
    payload: card,
  });
  dispatch({
    type: REMOVE_FROM_HAND,
    payload: card,
  });
  dispatch(blockHand());
};

export const sendHintCard = ({ activeRoomId, card }) => (dispatch) => {
  dispatch(emitter(SENT_HINT_CARD, { activeRoomId, card }));
  dispatch({
    type: SET_MY_CARD,
    payload: card,
  });
  dispatch({
    type: REMOVE_FROM_HAND,
    payload: card,
  });
  dispatch(blockHand());
};

export const sendHint = ({ activeRoomId, hint }) => (dispatch) => {
  dispatch(emitter(SENT_HINT, { activeRoomId, hint }));
};

export const chooseHinterCard = ({ activeRoomId, card }) => (dispatch) => {
  dispatch(emitter(CHOSEN_CARD_TO_MATCH_HINT, { activeRoomId, card }));
  dispatch(blockPickingArea());
};

export const updateGameOptionsListener = () => (dispatch) => {
  dispatch(
    listener(`GAME_UPDATED`, ({ data }) => {
      dispatch({
        type: UPDATE_GAME_OPTIONS,
        payload: data,
      });
    }),
  );
};

export const removeGameOptionsListener = () => (dispatch) => {
  dispatch(removeListener(`GAME_UPDATED`));
};

export const updateMyCardsListener = () => (dispatch) => {
  dispatch(
    listener(UPDATE_MY_CARDS, ({ data }) => {
      dispatch({
        type: UPDATE_MY_CARDS,
        payload: data,
      });
    }),
  );
};

export const removeUpdateMyCardsListener = () => (dispatch) => {
  dispatch(removeListener(UPDATE_MY_CARDS));
};

export const setInitialGameOptions = () => (dispatch) => {
  dispatch({
    type: INITIAL_GAME_OPTIONS,
  });
};

export const resetOptionsForNextRound = () => (dispatch) => {
  dispatch({
    type: RESET_FOR_NEXT_ROUND,
  });
  dispatch(unblockHand());
  dispatch(unblockPickingArea());
};
