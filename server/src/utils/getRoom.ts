import getRoomNamespaceFromList from './getRoomNamespaceFromList';

export default function(id: String, gameRooms: Object) {
  const namespace = getRoomNamespaceFromList(id, gameRooms);
  if (!namespace) {
    return null;
  }
  return gameRooms[namespace][id] || null;
}
