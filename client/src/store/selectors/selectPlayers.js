import { createSelector } from "reselect";
import selectActiveRoom from "./selectActiveRoom";

export default createSelector(
  [selectActiveRoom],
  ({ players }) => {
    return players;
  }
);
