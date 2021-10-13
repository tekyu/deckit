export default function ({
  players,
  playersMax,
  state,
  force,
}: { players: number, playersMax: number, state: number, force: string }) {
  if (force) {
    return force;
  }

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
