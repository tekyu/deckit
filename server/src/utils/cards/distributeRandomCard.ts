import getRandomCard from './getRandomCard';
import checkForDuplicate from './checkForDuplicate';
import removeCardFromList from './removeCardFromList';

export default function({ cards }: Array, remainingCards: Array) {
  if (!remainingCards.length > 0) {
    return null;
  }
  let { randomCard, randomIndex } = getRandomCard(remainingCards);
  if (checkForDuplicate(randomCard, cards)) {
    return null;
  }
  removeCardFromList(randomIndex, remainingCards);
  return randomCard;
}
