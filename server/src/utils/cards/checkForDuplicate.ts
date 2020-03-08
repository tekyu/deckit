export default function(randomCard, deck) {
  return deck.some(({ id }) => id === randomCard.id);
}
