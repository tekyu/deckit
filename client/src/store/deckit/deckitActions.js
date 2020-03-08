import { emitter, listener } from "store/socket/socketActions";

export const PICKED_CARD_TO_HINT = `PICKED_CARD_TO_HINT`;
export const SENT_HINT = "SENT_HINT";
export const SENT_HINT_CARD = "SENT_HINT_CARD";
export const CHOOSED_CARD_TO_MATCH_HINT = "CHOOSED_CARD_TO_MATCH_HINT";

// export const setActiveRoomId = activeRoomId => {
//   return (dispatch, oldState) => {
//     console.log("SETACTIVEROOMID", oldState, activeRoomId);
//     dispatch({
//       type: SET_ACTIVE_ROOM_ID,
//       activeRoomId
//     });
//   };
// };

export const pickMyCard = ({ activeRoomId, card }) => {
  return dispatch => {
    dispatch(emitter(PICKED_CARD_TO_HINT, { activeRoomId, card }));
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
