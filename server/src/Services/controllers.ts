// @ts-nocheck
import CardService from './CardService/CardService';

const controllers = {
  getDecks(req, res) {
    CardService.getDecks(req, res)
      .then((cards) => {
        res.status(200).send(cards);
      })
      .catch((err) => {
        res.json(err);
      });
  },
  getSingleDeck(req, res) {
    CardService.getSingleDeck(req, res)
      .then((cards) => {
        res.status(200).send(cards);
      })
      .catch((err) => {
        res.json(err);
      });
  },
};

export default controllers;
