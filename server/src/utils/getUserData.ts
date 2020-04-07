export const getUserData = (user: any) => {
  const {
    friends,
    activeGames,
    ranking,
    notifications,
    createdCards,
    createdDecks,
    achievements,
    createdAt,
    username,
    _id
  } = user;
  return {
    friends,
    activeGames,
    ranking,
    notifications,
    createdCards,
    createdDecks,
    achievements,
    createdAt,
    username,
    id: _id
  };
};
