export default function(index: number, remainingCards: any) {
  // remainingCards hold reference to room initial cards
  remainingCards.splice(index, 1);
}
