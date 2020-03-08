import getRandomCard from './getRandomCard';
import checkForDuplicate from './checkForDuplicate';
import removeCardFromList from './removeCardFromList';

export default function(player: Object, initialCards: Array) {
  if (!initialCards.length > 0) {
    return null;
  }
  let { randomCard, randomIndex } = getRandomCard(initialCards);
  if (checkForDuplicate(randomCard, player.cards)) {
    return null;
  }
  removeCardFromList(randomIndex, initialCards);
  return randomCard;
}
