import { createSelector } from "reselect";

export const activeRoom = createSelector(
  state => state.room,
  ({ activeRoom }) => activeRoom
);

export const activeRoomId = createSelector(
  state => state.room,
  ({ activeRoomId }) => activeRoomId
);

export const gameCode = createSelector(
  [activeRoom],
  ({ gameCode }) => {
    return gameCode;
  }
);

export const players = createSelector(
  [activeRoom],
  ({ players }) => {
    return players;
  }
);
