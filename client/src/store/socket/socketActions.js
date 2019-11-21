export const OPEN_SOCKET = `OPEN_SOCKET`;
export const SOCKET_LEAVE = `SOCKET_LEAVE`;
export const SOCKET_EMIT = `SOCKET_EMIT`;
export const SOCKET_LISTENER = `SOCKET_LISTENER`;
export const SAVE_DATA = `SAVE_DATA`;
export const GET_ROOM_INFO = `GET_ROOM_INFO`;

export const initializeSocket = socket => {
  return {
    type: OPEN_SOCKET,
    payload: { socket }
  };
};

// export const createRoom = options => {
//   console.log("createRoom", options);
//   return {
//     type: SOCKET_EMIT,
//     payload: { options },
//     event: "createRoom"
//   };
// };

export const emitter = (event, data, handler) => {
  console.log(`%c emitter`, `background:#93FFB7`, event, data);
  return {
    type: SOCKET_EMIT,
    payload: data,
    event,
    handler
  };
};

export const listener = (event, handler) => {
  console.log(`listener`, event, SOCKET_LISTENER);
  return {
    type: SOCKET_LISTENER,
    handler,
    event
  };
};
