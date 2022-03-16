type updateStateType = 'add' | 'remove' | 'update';

export default ({
  players,
  playersMax,
  state,
}: { players: number, playersMax: number, state: number, force?: string }): updateStateType => {
  if (state >= 2) {
    return 'remove';
  }
  if (players === 0) {
    return 'add';
  }
  if (players === playersMax) {
    return 'remove';
  }

  return 'update';
}
