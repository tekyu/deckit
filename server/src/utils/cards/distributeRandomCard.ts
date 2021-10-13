import getRandomCard from './getRandomCard';
import checkForDuplicate from './checkForDuplicate';
import removeCardFromList from './removeCardFromList';

export default function ({ cards }: any, remainingCards: any, amount = 1) {
  if (!remainingCards.length) {
    return null;
  }
  let { randomCard, randomIndex } = getRandomCard(remainingCards);
  if (checkForDuplicate(randomCard, cards)) {
    return null;
  }
  removeCardFromList(randomIndex, remainingCards);
  return randomCard;
}
