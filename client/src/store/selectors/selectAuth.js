import { createSelector } from "reselect";

export default createSelector(
  state => state.user,
  ({ auth }) => auth
);
