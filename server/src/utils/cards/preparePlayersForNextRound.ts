import cloneDeep from 'clone-deep';

export default function(players) {
  return cloneDeep(players).map(player => {
    player.myCard = null;
    player.choosedCard = null;
    return player;
  });
}
