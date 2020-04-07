export default function(cards: any) {
  let randomIndex = Math.floor(Math.random() * cards.length);
  return { randomCard: cards[randomIndex], randomIndex };
}
