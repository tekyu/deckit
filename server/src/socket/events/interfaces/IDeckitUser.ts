export interface IDeckitUser {
  username: string;
  id: string;
  anonymous: boolean;
  color?: string;
  socketId: string;
  activeRoomId?: string;
}
