import { createSelector } from "reselect";

export default createSelector(
  state => state.room,
  ({ activeRoom }) => activeRoom
);
