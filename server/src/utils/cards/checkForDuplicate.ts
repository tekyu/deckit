export default function (randomCardId: any, deck: any) {
  // change for indexOf
  return deck.some((id: string) => id === randomCardId);
}
