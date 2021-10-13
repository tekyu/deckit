import { createSelector } from 'reselect';

export const selectError = createSelector(
  (state) => state.app,
  ({ error }) => error,
);

export const selectModalType = createSelector(
  (state) => state.app,
  ({ modalType }) => modalType,
);
