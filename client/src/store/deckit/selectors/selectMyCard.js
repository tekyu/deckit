import { createSelector } from "reselect";

export default createSelector(
  state => state.deckit,
  ({ myCard = null }) => myCard
);
