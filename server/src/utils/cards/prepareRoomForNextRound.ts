import cloneDeep from 'clone-deep';

export default function(room: any) {
  const { gameOptions, players } = room;
  let newGameOptions = cloneDeep(gameOptions);
  const { round } = newGameOptions;
  // make next person a hinter
  newGameOptions.hinter = players[round % players.length];

  newGameOptions.hint = null;
  newGameOptions.hint = null;
  newGameOptions.hintCard = null;
  newGameOptions.choosedCardsToMatchHint = [];
  newGameOptions.pickedCardsToHint = [];
  newGameOptions.playersPickedCard = [];
  newGameOptions.playersChoosedCard = [];
  newGameOptions.round += 1;
  newGameOptions.stage = 2;
  return newGameOptions;
}
