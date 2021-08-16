import { createSelector } from 'reselect';

export const activeRoom = createSelector(
  (state) => state.room,
  ({ activeRoom }) => activeRoom,
);

export const activeRoomId = createSelector(
  (state) => state.room,
  ({ activeRoomId }) => activeRoomId,
);

export const gameCode = createSelector(
  [activeRoom],
  ({ gameCode }) => gameCode,
);

export const players = createSelector(
  [activeRoom],
  ({ players }) => players,
);

export const scoreboard = createSelector(
  [activeRoom],
  ({ scoreboard }) => scoreboard,
);

export const winners = createSelector(
  [activeRoom],
  ({ winners }) => winners,
);

export const selectActiveRoomId = createSelector(
  (state) => state.room,
  ({ activeRoomId }) => activeRoomId,
);
