import Deckit from '../classes/Deckit';
import IO from '../classes/IO';
import { ROOM_MODE } from '../classes/Room';
import { roomTopics, WAITING_ROOM } from '../socket/events/RoomEvents';
import getRoomObjectForUpdate from './getRoomObjectForUpdate';
import getRoomUpdateState from './getRoomUpdateState';

export enum ACTION_TYPE {
  add = 'add',
  remove = 'remove',
  update = 'update'
}

const getForcedAction = (
  roomExist: boolean,
  forceAction?: ACTION_TYPE,
): ACTION_TYPE | undefined => {
  if (forceAction) {
    return forceAction;
  }
  if (!roomExist) {
    return ACTION_TYPE.remove;
  }
  return undefined;
}

export default (room: Deckit, forceAction?: ACTION_TYPE) => {
  if (room.mode === ROOM_MODE.public) {
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
