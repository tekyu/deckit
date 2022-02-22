export interface IReconnectScreen {
  children?: React.ReactNode;
  roomId: string;
  closeHandler?: () => void
}
