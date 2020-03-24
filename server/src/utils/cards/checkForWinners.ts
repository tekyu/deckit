import distributeRandomCard from './distributeRandomCard';
import cloneDeep from 'clone-deep';

export default function(players, remainingCards) {
  const newPlayers = cloneDeep(players);
  return newPlayers.map(player => {
    while (player.cards.length < 6) {
      const randomCard = distributeRandomCard(player, remainingCards);
      if (randomCard) {
        player.cards.push(randomCard);
      }
    }
    console.log('player', player);
    return player;
  });
}
