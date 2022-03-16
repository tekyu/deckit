import Deckit from '../classes/Deckit';
import IO from '../classes/IO';
import { roomTopics, WAITING_ROOM } from '../socket/events/RoomEvents';
import getRoomObjectForUpdate from './getRoomObjectForUpdate';
import getRoomUpdateState from './getRoomUpdateState';

export type actionType = 'add' | 'remove' | 'update';

const getForcedAction = (roomExist: boolean, forceAction?: actionType): actionType | undefined => {
  if (forceAction) {
    return forceAction;
  }
  if (!roomExist) {
    return 'remove';
  }
  return undefined;
}

export default (room: Deckit, forceAction?: actionType) => {
  if (room.mode === 'public') {
    const roomExist = IO.getInstance().checkIfRoomExist(room.id);
    const action = getForcedAction(roomExist, forceAction) || getRoomUpdateState({
      players: room.players.length,
      playersMax: room.playersMax,
      state: room.state,
    })
    const updatedRoomObject = getRoomObjectForUpdate(
      room,
      action,
    );

    IO.getInstance().io.in(WAITING_ROOM)
      .emit(roomTopics.UPDATE_LIST_OF_ROOMS, updatedRoomObject);
  }
}
