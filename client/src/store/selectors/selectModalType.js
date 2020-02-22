import { createSelector } from "reselect";

export default createSelector(
  state => state.app,
  ({ modalType }) => modalType
);
