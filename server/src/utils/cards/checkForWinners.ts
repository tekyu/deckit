import distributeRandomCard from './distributeRandomCard';
import cloneDeep from 'clone-deep';

export default function(players: any, remainingCards: any) {
  const newPlayers = cloneDeep(players);
  return newPlayers.map((player: any) => {
    while (player.cards.length < 6) {
      const randomCard = distributeRandomCard(player, remainingCards);
      if (randomCard) {
        player.cards.push(randomCard);
      }
    }
    return player;
  });
}
