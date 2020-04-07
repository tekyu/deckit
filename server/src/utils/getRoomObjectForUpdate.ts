export default (room: any = {}, action = '') => {
  const { id } = room;
  if (!id || !action) {
    throw Error(
      `Cannot create room object without room instance (${id}) or action (${action})`
    );
  }
  return {
    id,
    room,
    action
  };
};
