import { createSelector } from "reselect";

export default createSelector(
  state => state.room,
  ({ activeRoom }) => {
    return activeRoom;
  },
  ({ players = [] }) => {
    return players;
  }
);
