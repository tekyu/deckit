export const SOCKET_INIT_REQUEST = `SOCKET_INIT_REQUEST`;
export const SOCKET_INIT_SUCCESS = `SOCKET_INIT_SUCCESS`;
export const SOCKET_CLOSE = `SOCKET_CLOSE`;
export const SOCKET_EMIT = `SOCKET_EMIT`;
export const SOCKET_ADD_LISTENER = `SOCKET_ADD_LISTENER`;
export const SOCKET_REMOVE_LISTENER = `SOCKET_REMOVE_LISTENER`;

export const openSocket = () => ({ type: SOCKET_INIT_REQUEST });
export const closeSocket = () => ({ type: SOCKET_CLOSE });

export const addListener = (event, handler) => ({
  type: SOCKET_ADD_LISTENER,
  event,
  handler
});

export const removeListener = event => ({
  type: SOCKET_REMOVE_LISTENER,
  event
});

export const emitMessage = (event, data) => ({
  type: SOCKET_EMIT,
  event,
  payload: data
});
