import distributeRandomCard from './distributeRandomCard';

export default function(players, initialCards) {
  return players.map(player => {
    while (player.cards.length < 6) {
      const randomCard = distributeRandomCard(player, initialCards);
      if (randomCard) {
        player.cards.push(randomCard);
      }
    }
    console.log('player', player);
    return player;
  });
}
