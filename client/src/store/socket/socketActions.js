export const SOCKET_EMIT = `SOCKET_EMIT`;
export const SOCKET_ADD_LISTENER = `SOCKET_ADD_LISTENER`;
export const SOCKET_REMOVE_LISTENER = `SOCKET_REMOVE_LISTENER`;
export const SAVE_DATA = `SAVE_DATA`;
export const GET_ROOM_INFO = `GET_ROOM_INFO`;
export const JOIN_ROOM = `JOIN_ROOM`;

// export const addListener = ({ event, handler }) => ({
//   type: SOCKET_ADD_LISTENER,
//   event,
//   handler
// });

// export const removeListener = ({ event }) => ({
//   type: SOCKET_REMOVE_LISTENER,
//   event
// });

export const emitMessage = ({ event, data }) => ({
  type: SOCKET_EMIT,
  event,
  payload: data
});
// export const createRoom = options => {
//   // console.log("createRoom", options);
//   return {
//     type: SOCKET_EMIT,
//     payload: { options },
//     event: "createRoom"
//   };
// };

export const emitter = (event, data, handler) => {
  // console.log(`%c emitter`, `background:#93FFB7`, event, data);
  return {
    type: SOCKET_EMIT,
    payload: data,
    event,
    handler
  };
};

export const listener = (event, handler) => {
  // console.log(`listener`, event, SOCKET_LISTENER);
  return {
    type: SOCKET_ADD_LISTENER,
    handler,
    event
  };
};

export const removeListener = (event, handler) => {
  // console.log(`removeListener`, event, SOCKET_REMOVE_LISTENER);
  return {
    type: SOCKET_REMOVE_LISTENER,
    handler,
    event
  };
};
