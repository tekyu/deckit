export default function(randomCard: any, deck: any) {
  return deck.some(({ id }: any) => id === randomCard.id);
}
