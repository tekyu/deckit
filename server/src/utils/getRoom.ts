import getRoomNamespaceFromList from './getRoomNamespaceFromList';
import IO from '../classes/IO';
import Deckit from '../classes/Deckit';

export default function (id: string): Deckit | null {
  if (!IO.getInstance().io.gameRooms) {
    return null;
  }
  const namespace = getRoomNamespaceFromList(id);
  if (!namespace) {
    return null;
  }
  return IO.getInstance().io.gameRooms[namespace][id] || null;
}
