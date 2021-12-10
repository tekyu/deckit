// @ts-nocheck
import fse from 'fs-extra';
import { flatten } from 'lodash';

const readFile = async (deck) => {
  try {
    return fse.readJson(`./cards/${deck}.json`);
  } catch (err) {
    console.error(err);
  }
};

const getDecksObject = (decks) => {
  console.log('[getDecksObject]', decks);
  return decks.reduce((acc, { name, userCreated, userId }) => {
    if (userCreated) {
      acc.userCreatedDecks.push({ name, userId });
    } else {
      acc.defaultDecks.push(name);
    }
    return acc;
  }, { defaultDecks: [], userCreatedDecks: [] });
};

const CardService = {
  getDecks: async (req, res) => {
    const { query: { decks = [] } = {} } = req;
    const { defaultDecks, userCreatedDecks } = getDecksObject(JSON.parse(decks));
    const deckPromiseArray = defaultDecks.map((deck) => readFile(deck));
    try {
      const defaultCards = await Promise.all(deckPromiseArray);
      return flatten(defaultCards);
    } catch (e) {
      console.log('error?', e);
      return e;
    }
    // then mongo call to get all cards from user collection with userCreatedDecks
  },
  getSingleDeck: async (req, res) => {
    const {
      params: { deck },
    } = req;
    return readFile(decksList[deck]);
  },
};

export default CardService;
