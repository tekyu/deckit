import cloneDeep from 'clone-deep';

export default function(players: any) {
  return cloneDeep(players).map((player: any) => {
    player.myCard = null;
    player.choosedCard = null;
    return player;
  });
}
