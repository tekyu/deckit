const gameMapping = {
  d: 'Deckit',
  k: 'Karcianka'
};

const getGameMapping = game => {
  if (!gameMapping[game]) {
    throw Error(`Game ${game} is not defined within mapping`);
  }
  return gameMapping[game];
};
export default getGameMapping;
