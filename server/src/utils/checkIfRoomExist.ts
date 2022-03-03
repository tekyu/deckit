import IGameRooms from '../interfaces/IGameRooms';
import { loggers } from '../loaders/loggers';

// eslint-disable-next-line func-names
export default function (id: string, gameRooms: IGameRooms) {
  if (gameRooms.public[id]) {
    return 'public';
  } if (gameRooms.private[id]) {
    return 'private';
  } if (gameRooms.fast[id]) {
    return 'fast';
  }
  loggers.warn.warn(`Room with id of ${id} doesn't exist`);
  return '';
}
