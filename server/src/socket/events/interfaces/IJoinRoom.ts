export default interface IJoinRoomParams {
  roomId: string;
  userData: {
    rooms: Array<string>;
    socketId: string;
    state: number;
    username: string;
    id: string;
    anon: boolean;
  }
};
