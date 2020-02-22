import { createSelector } from "reselect";

export default createSelector(
  state => state.app,
  ({ error }) => error
);
