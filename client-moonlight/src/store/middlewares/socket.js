import io from 'socket.io-client';

import { socketTypes } from 'store/socket/socket';

export default function socketMiddleware() {
  const socket = io(process.env.REACT_APP_SOCKET_ADDRESS);

  return ({ dispatch }) => (next) => (action) => {
    const {
      event, type, handler, payload, ...rest
    } = action;

    if (!event || !type) {
      return next(action);
    }
    switch (type) {
      case socketTypes.leave:
        socket.removeListener(event);
        break;
      case socketTypes.emit:
        if (handler) {
          socket.emit(event, { ...payload, ...rest }, handler);
        } else {
          socket.emit(event, { ...payload, ...rest });
        }
        break;
      case socketTypes.listener:
        socket.on(event, (data) => {
          if (data.error) {
            dispatch({ type: 'ERROR', payload: data.error });
            return;
          }
          handler(data);
        });

        break;
      case socketTypes.removeListener:
        socket.off(event);
        break;
      default:
        throw Error('No type defined');
    }

    return next(action);
  };
}
