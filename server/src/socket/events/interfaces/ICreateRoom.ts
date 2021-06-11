export default interface ICreateRoomParams {
  roomOptions: {
    mode: string;
    playersMax: number;
    name: string;
    gameCode: string;
    userName: string;
    gameOptions: {
      maxScore: number;
    }
  }
  id: string;
}
