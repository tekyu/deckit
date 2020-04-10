import { createSelector } from "reselect";

export const auth = createSelector(
  state => state.user,
  ({ auth }) => auth
);

export const user = createSelector(
  state => state.user,
  ({ user }) => user
);

export const userId = createSelector(
  state => state.user,
  ({ user: { id } }) => id
);

export const userForRoom = createSelector(
  state => state.user,
  ({ user: { id, username, avatar, ranking } }) => {
    return {
      id,
      username,
      avatar,
      ranking
    };
  }
);
