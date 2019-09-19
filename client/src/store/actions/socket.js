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

export const emitter = (event, data) => {
  console.log("emitter", event, data);
  return {
    type: SOCKET_EMIT,
    payload: data,
    event: event
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
