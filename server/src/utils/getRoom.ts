import getRoomNamespaceFromList from './getRoomNamespaceFromList';

export default function(id: String, gameRooms: Object) {
  const namespace = getRoomNamespaceFromList(id, gameRooms);
  return gameRooms[namespace][id];
}
