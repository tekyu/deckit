import { createSelector } from "reselect";

export const error = createSelector(
  state => state.app,
  ({ error }) => error
);

export const modalType = createSelector(
  state => state.app,
  ({ modalType }) => modalType
);
