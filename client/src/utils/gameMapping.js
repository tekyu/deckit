export const gameMapping = {
  d: "Deckit",
  k: "Karcianka"
};

export const listGameMapping = index => {
  return index;
};

export const getGames = index => {
  if (typeof index !== "undefined") {
    return Object.keys(gameMapping)[index];
  }
  return Object.values(gameMapping);
};

export const getGameMapping = game => {
  if (!gameMapping[game]) {
    throw Error(`Game ${game} is not defined within mapping`);
  }
  return gameMapping[game];
};
