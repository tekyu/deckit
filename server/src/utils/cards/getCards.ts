import axios from '../../../axios';

const getCards = async (room: any, decks = []) => {
  return axios
    .get('/cards/all')
    .then(res => {
      room.gameOptions.remainingCards = res.data;
    })
    .catch(err => err);
};

export default getCards;
