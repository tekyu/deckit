import io from "socket.io-client";
import {
	SOCKET_LEAVE,
	SOCKET_EMIT,
	SOCKET_LISTENER
} from "store/actions/actionCreators";
const SOCKET_ADDRESS = "localhost:3012";

export default function socketMiddleware() {
	const socket = io(SOCKET_ADDRESS);

	return ({ dispatch }) => next => action => {
		if (typeof action === "function") {
			return next(action);
		}
		const { event, type, handle, payload, ...rest } = action;

		console.log("SOCKET MIDDLEWARE", action);
		if (!event) {
			return next(action);
		}

		if (type === SOCKET_LEAVE) {
			console.log("SOCKET LEAVE", type);
			socket.removeListener(event);
		}

		if (type === SOCKET_EMIT) {
			console.log("SOCKET EMIT", event, { ...payload, ...rest });
			socket.emit(event, { ...payload, ...rest });
		}

		if (type === SOCKET_LISTENER) {
			console.log("SOCKET LISTENER", type);
			socket.on(event, payload => {
				if (payload.error) {
					dispatch({ type: "ERROR", payload: payload.error });
					return;
				}
				dispatch({ type: "SAVE_DATA", payload });
			});
		}

		return next(action);
	};
}
