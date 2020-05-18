import cloneDeep from 'clone-deep';
import DeckitOptions from '../classes/DeckitOptions';

export const gameMapping = {
  d: 'Deckit',
  k: 'Państwa Miasta',
};

export const gameOptions = {
  d: {
    decks: ['default'],
    stage: 0, // 0 - idle | 1 - initialGiveaway | 2 - pickHint | 3 - pickCard | 4 - chooseCards | 5 - awardPoints | 6 - checkGame | 7 - cardShuffle | 8 - ended
    round: 0,
    remainingCards: [],
    hint: '',
    hinter: null,
    hintCard: {},
    maxScore: 30,
    choosedCardsToMatchHint: [],
    pickedCardsToHint: [],
    playersPickedCard: [],
    playersChoosedCard: [],
    scoreboard: {},
    cardTracker: {},
    playerModel: {
      id: null,
      nickname: '',
      ranking: 1200,
      avatar: null,
      cards: [],
      score: 0,
    },
  },
  k: {
    fields: [],
    stage: 0,
    round: 0,
    letter: '',
    maxTime: 120,
    maxScore: 50,
  },
};

export const listGameMapping = (index: any) => {
  if (typeof index !== 'undefined') {
    return Object.keys(gameMapping)[index];
  }
  return Object.values(gameMapping);
};

export const getGameMapping = (gameCode: string) => {
  if (!gameMapping[gameCode]) {
    //TODO: Change to error component
    throw Error(`Game ${gameCode} is not defined within mapping`);
  }
  return gameMapping[gameCode];
};

export const getGameOptions = (gameCode: string, gameOptions: Object) => {
  switch (gameCode) {
    case 'd':
      return new DeckitOptions(gameOptions);
    default:
      throw Error(`Gamecode of ${gameCode} not recognized`);
  }
};
