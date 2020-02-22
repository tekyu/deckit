import { createSelector } from "reselect";

export default createSelector(
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
