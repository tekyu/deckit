import { ROOM_MODE } from '../../../classes/Room';

export default interface ICreateRoomParams {
  roomOptions: {
    mode: ROOM_MODE;
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
