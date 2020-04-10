export const OPEN_SOCKET = `OPEN_SOCKET`;
export const SOCKET_LEAVE = `SOCKET_LEAVE`;
export const SOCKET_EMIT = `SOCKET_EMIT`;
export const SOCKET_LISTENER = `SOCKET_LISTENER`;
export const SOCKET_REMOVE_LISTENER = `SOCKET_REMOVE_LISTENER`;
export const SAVE_DATA = `SAVE_DATA`;
export const GET_ROOM_INFO = `GET_ROOM_INFO`;
export const JOIN_ROOM = `JOIN_ROOM`;

export const initializeSocket = socket => ({
  type: OPEN_SOCKET,
  payload: { socket }
});

export const emitter = (event, data, handler) => ({
  type: SOCKET_EMIT,
  payload: data,
  event,
  handler
});

export const listener = (event, handler) => ({
  type: SOCKET_LISTENER,
  handler,
  event
});

export const removeListener = (event, handler) => ({
  type: SOCKET_REMOVE_LISTENER,
  handler,
  event
});
