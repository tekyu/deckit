import { emitter, listener } from "store/socket/socketActions";
import { removeListener } from "../socket/socketActions";

export const PICKED_CARD_TO_HINT = `PICKED_CARD_TO_HINT`;
export const SENT_HINT = "SENT_HINT";
export const SENT_HINT_CARD = "SENT_HINT_CARD";
export const CHOOSED_CARD_TO_MATCH_HINT = "CHOOSED_CARD_TO_MATCH_HINT";
export const UPDATE_MY_CARDS = "UPDATE_MY_CARDS";
export const SET_HINTER = "SET_HINTER";
export const UPDATE_GAME_OPTIONS = "UPDATE_GAME_OPTIONS";
export const SET_MY_PICKED_CARD = `SET_MY_PICKED_CARD`;

export const pickMyCard = ({ activeRoomId, card }) => {
  return dispatch => {
    dispatch(emitter(PICKED_CARD_TO_HINT, { activeRoomId, card }));
    dispatch({
      type: SET_MY_PICKED_CARD,
      payload: card
    });
  };
};

export const sendHintCard = ({ activeRoomId, card }) => {
  return dispatch => {
    dispatch(emitter(SENT_HINT_CARD, { activeRoomId, card }));
  };
};

export const sendHint = ({ activeRoomId, hint }) => {
  return dispatch => {
    dispatch(emitter(SENT_HINT, { activeRoomId, hint }));
  };
};

export const chooseHinterCard = ({ activeRoomId, card }) => {
  return dispatch => {
    dispatch(emitter(CHOOSED_CARD_TO_MATCH_HINT, { activeRoomId, card }));
  };
};

// export const setHinter = hinter => {
//   return dispatch => {
//     dispatch({
//       type: SET_HINTER,
//       hinter
//     });
//   };
// };

export const updateGameOptionsListener = () => {
  return dispatch => {
    dispatch(
      listener("GAME_UPDATED", ({ data }) => {
        console.log("UPDATE_GAME_OPTIONS", data);
        dispatch({
          type: UPDATE_GAME_OPTIONS,
          payload: data
        });
      })
    );
  };
};

export const removeGameOptionsListener = () => {
  return dispatch => {
    dispatch(removeListener("GAME_UPDATED"));
  };
};

export const updateMyCardsListener = () => {
  return dispatch => {
    dispatch(
      listener(UPDATE_MY_CARDS, ({ data }) => {
        console.log("UPDATE_MY_CARDS", data);
        dispatch({
          type: UPDATE_MY_CARDS,
          payload: data
        });
      })
    );
  };
};

export const removeUpdateMyCardsListener = () => {
  return dispatch => {
    dispatch(removeListener(UPDATE_MY_CARDS));
  };
};
