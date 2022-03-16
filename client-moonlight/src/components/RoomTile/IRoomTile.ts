export interface IRoomTile {
  id: string;
  name: string;
  players: number;
  playersMax: number;
  owner: string;
  onJoin: (id: string) => void
}
