// @ts-nocheck
import CardService from './CardService/CardService';

const controllers = {
  getDecks: function(req, res) {
    CardService.getDecks(req, res)
      .then(cards => {
        res.status(200).send(cards);
      })
      .catch(err => {
        res.json(err);
      });
  },
  getSingleDeck: function(req, res) {
    CardService.getSingleDeck(req, res)
      .then(cards => {
        res.status(200).send(cards);
      })
      .catch(err => {
        res.json(err);
      });
  }
};

export default controllers;
