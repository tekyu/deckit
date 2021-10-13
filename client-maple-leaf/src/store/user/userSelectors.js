import { createSelector } from 'reselect';

export const selectAuth = createSelector(
  (state) => state.user,
  ({ auth }) => auth,
);

export const user = createSelector(
  (state) => state.user,
  ({ user }) => user,
);

export const userId = createSelector(
  (state) => state.user,
  ({ user: { id } }) => id,
);

export const userForRoom = createSelector(
  (state) => state.user,
  ({
    user: {
      id, username, avatar, ranking,
    },
  }) => ({
    id,
    username,
    avatar,
    ranking,
  }),
);

export const selectUser = createSelector(
  (state) => state.user,
  ({ user }) => user,
);
