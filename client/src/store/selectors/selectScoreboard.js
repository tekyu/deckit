import { createSelector } from "reselect";
import selectActiveRoom from "./selectActiveRoom";

export default createSelector(
  [selectActiveRoom],
  ({ scoreboard = {} }) => {
    return scoreboard;
  }
);
