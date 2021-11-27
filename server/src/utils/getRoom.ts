import getRoomNamespaceFromList from './getRoomNamespaceFromList';
import IGameRooms from '../interfaces/IGameRooms';

export default function (id: string, gameRooms: IGameRooms) {
  const namespace = getRoomNamespaceFromList(id, gameRooms);
  if (!namespace) {
    return null;
  }
  return gameRooms[namespace][id] || null;
}
