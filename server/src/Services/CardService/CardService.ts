// @ts-nocheck
import fse from 'fs-extra';
import Service from 'moleculer';

const decksList = {
  default: 'default',
  cities: 'cities'
};

const readFile = async deck => {
  try {
    return fse.readJson(`./src/Services/CardService/cards/${deck}.json`);
  } catch (err) {
    console.error(err);
  }
};

const CardService = {
  getDecks: async (req, res) => {
    const { query: { decks = [] } = {} } = req;
    const decksToPull = decks.length > 0 ? decks : decksList;
    const deckPromiseArray = Object.values(decksToPull).map(deck => {
      return readFile(decksList[deck]);
    });
    return Promise.all(deckPromiseArray).then(deckArrays => {
      return [].concat.apply([], deckArrays);
    });
  },
  getSingleDeck: async (req, res) => {
    const {
      params: { deck }
    } = req;
    return readFile(decksList[deck]);
  }
};

export default CardService;
