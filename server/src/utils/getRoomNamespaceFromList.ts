import IO from '../classes/IO';
import { loggers } from '../loaders/loggers';

export default function (id: string) {
  if (IO.getInstance().io.gameRooms.public[id]) {
    return 'public';
  } if (IO.getInstance().io.gameRooms.private[id]) {
    return 'private';
  } if (IO.getInstance().io.gameRooms.fast[id]) {
    return 'fast';
  }
  loggers.warn.warn(`Room with id of ${id} doesn't exist`);
  return '';
}
