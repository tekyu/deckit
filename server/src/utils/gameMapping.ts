export const gameMapping = {
  d: 'Deckit',
  k: 'Państwa Miasta'
};

export const gameOptions = {
  d: {
    decks: [],
    stage: 0, // 0 - idle | 1 - initialGiveaway | 2 - pickHint | 3 - pickCard | 4 - chooseCards | 5 - awardPoints | 6 - checkGame | 7 - cardShuffle
    round: 0,
    initialCards: [],
    hint: '',
    hinter: null,
    hintCard: {},
    maxScore: 30,
    score: 0,
    playerModel: {
      id: null,
      nickname: '',
      ranking: 1200,
      avatar: null,
      cards: [],
      score: 0
    }
  },
  k: {
    fields: [],
    stage: 0,
    round: 0,
    letter: '',
    maxTime: 120,
    maxScore: 50
  }
};

export const listGameMapping = index => {
  if (typeof index !== 'undefined') {
    return Object.keys(gameMapping)[index];
  }
  return Object.values(gameMapping);
};

export const getGameMapping = gameCode => {
  if (!gameMapping[gameCode]) {
    // TODO: Change to error component
    throw Error(`Game ${gameCode} is not defined within mapping`);
  }
  return gameMapping[gameCode];
};

export const getGameOptions = gameCode => {
  if (!gameOptions[gameCode]) {
    throw Error(`Game ${gameCode} is not defined within mapping`);
  }
  return gameOptions[gameCode];
};
