export interface IScoreboardItem {
  isHinter: boolean;
  owner: string;
  id: string;
  username: string;
  position: number;
  score: number;
  picked?: boolean;
  state: number;
}
