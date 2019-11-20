import {
  OPEN_SOCKET,
  SOCKET_EMIT,
  SOCKET_LISTENER
} from "store/actions/actionCreators";

export const initializeSocket = socket => {
  console.log("initializeSocket", socket);
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
  console.log("%c emitter", "background:#93FFB7", event, data);
  return {
    type: SOCKET_EMIT,
    payload: data,
    event,
    handler
  };
};

export const listener = (event, handler) => {
  console.log("listener", event, SOCKET_LISTENER);
  return {
    type: SOCKET_LISTENER,
    handler,
    event
  };
};
