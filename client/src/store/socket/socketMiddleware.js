import io from "socket.io-client";
import {
  SOCKET_INIT_REQUEST,
  SOCKET_INIT_SUCCESS,
  SOCKET_CLOSE,
  SOCKET_EMIT,
  SOCKET_ADD_LISTENER,
  SOCKET_REMOVE_LISTENER
} from "store/socket/socketActions";

const SOCKET_ADDRESS = `localhost:3012`;

const socketMiddleware = () => {
  let socket;
  return ({ dispatch, getState }) => next => action => {
    if (typeof action === `function`) {
      return next(action);
    }
    const { event, type, handler, payload } = action;
    const {
      room: { roomId },
      user: { userId, username }
    } = getState();
    const defaultPayload = { roomId, userId, username };
    switch (type) {
      case SOCKET_INIT_REQUEST:
        console.log(`%c SOCKET OPENED `, `background: green`);
        socket = io(SOCKET_ADDRESS);
        dispatch({ type: SOCKET_INIT_SUCCESS });
        break;
      case SOCKET_CLOSE:
        console.log(`%c SOCKET CLOSED `, `background: red`);
        socket.disconnect();
        break;
      case SOCKET_EMIT:
        console.log(`%c SOCKET EMIT`, `background: aqua`, event, {
          ...payload
        });
        socket.emit(event, { ...defaultPayload, ...payload });
        break;
      case SOCKET_ADD_LISTENER:
        console.log(`%c ADDED SOCKET LISTENER `, `background: olive`, event);
        socket.on(event, data => {
          if (data.error) {
            dispatch({ type: `ERROR`, payload: data.error });
            return;
          }
          console.log(`%c SOCKET LISTENER`, `background:#C1FFAB`, event, data);
          handler(data);
        });
        break;
      case SOCKET_REMOVE_LISTENER:
        console.log(`%c REMOVED SOCKET LISTENER `, event, `background: coral`);
        socket.removeListener(event);
        break;
      default:
        return next(action);
    }
    return next(action);
  };
};

export default socketMiddleware;
