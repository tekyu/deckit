export interface IPlayerBubble {
  color: string;
  username: string;
  id: string;
  anonymous: boolean;
  ready: boolean;
  you: boolean;
  isOwner: boolean;
  adminPower?: boolean;
  kickHandler?: (id: string) => void
}
