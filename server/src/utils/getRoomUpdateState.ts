export default function (players: number, playersMax: number, state: number) {
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
