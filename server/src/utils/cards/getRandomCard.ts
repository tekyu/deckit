export default function(cards) {
  let randomIndex = Math.floor(Math.random() * cards.length);
  return { randomCard: cards[randomIndex], randomIndex };
}
