import io from "socket.io-client";
import {
  SOCKET_EMIT,
  SOCKET_ADD_LISTENER,
  SOCKET_REMOVE_LISTENER
} from "store/socket/socketActions";

const SOCKET_ADDRESS = `localhost:3012`;

const socketMiddleware = () => {
  const socket = io(SOCKET_ADDRESS);
  return ({ dispatch }) => next => action => {
    if (typeof action === `function`) {
      return next(action);
    }
    const { event, type, handler, payload } = action;
    switch (type) {
      case SOCKET_EMIT:
        console.log(`%c SOCKET EMIT`, `background: aqua`, event, {
          ...payload
        });
        socket.emit(event, { ...payload });
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
