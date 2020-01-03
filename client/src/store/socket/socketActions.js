export const SOCKET_EMIT = `SOCKET_EMIT`;
export const SOCKET_ADD_LISTENER = `SOCKET_ADD_LISTENER`;
export const SOCKET_REMOVE_LISTENER = `SOCKET_REMOVE_LISTENER`;

export const addListener = ({ event, handler }) => ({
  type: SOCKET_ADD_LISTENER,
  event,
  handler
});

export const removeListener = ({ event }) => ({
  type: SOCKET_REMOVE_LISTENER,
  event
});

export const emitMessage = ({ event, data }) => ({
  type: SOCKET_EMIT,
  event,
  payload: data
});
